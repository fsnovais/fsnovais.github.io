/*
  Descobre o id da lista e o id do modelo de dupla confirmação na Brevo.

  Existe porque esses dois números são o que o Worker precisa, e a interface da
  Brevo esconde eles em lugares que mudam de lugar a cada redesenho. Perguntar
  para a API é o caminho que não depende de onde o botão está hoje.

  Uso:
    BREVO_API_KEY=xkeysib-... node scripts/brevo-ids.mjs

  A chave vem por variável de ambiente, e não como argumento, de propósito:
  argumento fica no histórico do shell e aparece na lista de processos.
*/

const chave = process.env.BREVO_API_KEY;

if (!chave) {
  console.error('Falta BREVO_API_KEY. Rode assim:');
  console.error('  BREVO_API_KEY=xkeysib-... node scripts/brevo-ids.mjs');
  process.exit(1);
}

// a chave da API v3 começa com xkeysib-. A chave SMTP é outra coisa, serve para
// enviar por SMTP e não fala com esta API: trocar as duas é o erro mais comum
if (!chave.startsWith('xkeysib-')) {
  console.error('Essa chave não parece a da API v3 (elas começam com "xkeysib-").');
  console.error('Se você copiou a chave SMTP, volte em SMTP & API e pegue a de API.');
  process.exit(1);
}

async function buscar(caminho) {
  const r = await fetch(`https://api.brevo.com/v3${caminho}`, {
    headers: { 'api-key': chave, accept: 'application/json' },
  });
  if (!r.ok) {
    // a mensagem da Brevo é boa e às vezes traz um link: vale inteira, não cortada
    const corpo = await r.text().catch(() => '');
    const erro = new Error(`${caminho} respondeu ${r.status}`);
    erro.status = r.status;
    erro.corpo = corpo;
    throw erro;
  }
  return r.json();
}

try {
  const [listas, modelos] = await Promise.all([
    buscar('/contacts/lists?limit=50'),
    buscar('/smtp/templates?limit=100'),
  ]);

  console.log('\nLISTAS  (BREVO_LIST_ID)');
  if (!listas.lists?.length) {
    console.log('  nenhuma lista ainda: crie uma em CRM > Listas');
  } else {
    for (const l of listas.lists) {
      console.log(`  ${String(l.id).padStart(4)}  ${l.name}  (${l.totalSubscribers ?? 0} inscritos)`);
    }
  }

  console.log('\nMODELOS  (BREVO_TEMPLATE_ID)');
  if (!modelos.templates?.length) {
    console.log('  nenhum modelo ainda: crie um em Marketing > Modelos');
  } else {
    for (const m of modelos.templates) {
      // um modelo inativo não é enviado: é a pegadinha mais comum aqui
      const estado = m.isActive ? 'ativo  ' : 'INATIVO';
      console.log(`  ${String(m.id).padStart(4)}  ${estado}  ${m.name}`);
    }
    const inativos = modelos.templates.filter((m) => !m.isActive);
    if (inativos.length) {
      console.log('\n  Atenção: modelo inativo não é enviado. Abra o modelo na Brevo');
      console.log('  e mude o estado para ativo antes de testar a inscrição.');
    }
  }

  console.log('');
} catch (e) {
  console.error('\nFalhou:', e.message);
  if (e.corpo) console.error(e.corpo);

  if (e.status === 401) {
    console.error('\nUm 401 aqui tem duas causas possíveis, e elas pedem coisas diferentes:');
    console.error('');
    console.error('  1. A mensagem acima fala em "unrecognised IP address"');
    console.error('     A chave está certa. A Brevo bloqueia chamadas de IP desconhecido,');
    console.error('     em Account > Security > Authorized IPs. Como o Worker vai chamar');
    console.error('     a API de IPs rotativos da Cloudflare, o caminho é desligar essa');
    console.error('     restrição ali, e não tentar cadastrar IP por IP.');
    console.error('');
    console.error('  2. A mensagem fala em chave inválida');
    console.error('     Aí sim a chave está errada ou foi revogada. Gere outra em');
    console.error('     SMTP & API > API Keys.');
  }

  // exitCode em vez de process.exit(): sair no meio de um fetch aberto derruba
  // o Node no Windows com uma asserção do libuv, e o erro real some da tela
  process.exitCode = 1;
}
