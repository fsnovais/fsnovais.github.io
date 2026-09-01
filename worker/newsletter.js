/*
  Proxy de inscrição na newsletter.

  Existe por dois motivos:

  1. A chave da API não pode viver no navegador. O site é estático e público;
     qualquer chave no HTML seria de todo mundo.
  2. O provedor fica isolado num ponto só. Trocar Brevo por Resend, Buttondown
     ou qualquer outro é reescrever a função `inscrever` aqui embaixo. O site
     não muda uma linha, e o formulário que as pessoas já usaram continua igual.

  Contrato com o site:
    POST { email: string, lang: 'pt' | 'en' }
    200 {}                        -> e-mail de confirmação enviado
    409 { erro: 'ja_inscrito' }   -> endereço já está na lista
    400 { erro: 'email_invalido' }
    5xx { erro: ... }

  A inscrição é por dupla confirmação: 200 aqui significa "mandamos o e-mail de
  confirmação", nunca "está na lista". Quem entra na lista é a Brevo, depois do
  clique, e é ela quem passa a ser dona do descadastro.

  Variáveis (wrangler secret put NOME):
    BREVO_API_KEY      chave da API, com permissão de contatos
    BREVO_LIST_ID      id numérico da lista
    BREVO_TEMPLATE_ID  id do template de dupla confirmação
  Variáveis públicas (wrangler.toml):
    SITE_URL           origem permitida, ex.: https://fsnovais.github.io
    REDIRECT_PT        para onde a Brevo manda quem confirmou, em português
    REDIRECT_EN        idem, em inglês
*/

const LIMITE_TAMANHO = 254; // limite de endereço de e-mail na RFC 5321
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default {
  async fetch(request, env) {
    const origem = origemPermitida(request, env);

    // o navegador pergunta antes de postar de outra origem
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cabecalhos(origem) });
    }

    if (request.method !== 'POST') {
      return responder(405, { erro: 'metodo_nao_permitido' }, origem);
    }

    // origem desconhecida não passa: o formulário é do site, não da internet
    if (!origem) {
      return responder(403, { erro: 'origem_nao_permitida' }, null);
    }

    let corpo;
    try {
      corpo = await request.json();
    } catch {
      return responder(400, { erro: 'corpo_invalido' }, origem);
    }

    const email = String(corpo?.email ?? '').trim().toLowerCase();
    const lang = corpo?.lang === 'en' ? 'en' : 'pt';

    if (!email || email.length > LIMITE_TAMANHO || !EMAIL.test(email)) {
      return responder(400, { erro: 'email_invalido' }, origem);
    }

    try {
      return await inscrever({ email, lang, env, origem });
    } catch (e) {
      // o motivo real fica no log do Worker; o site recebe só o genérico
      // mesma razão: registra o tipo da falha, nunca o corpo do pedido
      console.error('falha ao inscrever', e?.name ?? 'erro', e?.message ?? '');
      return responder(502, { erro: 'provedor_indisponivel' }, origem);
    }
  },
};

/*
  Único ponto que conhece o provedor. Para trocar de serviço, reescreva
  daqui até o fim da função e mantenha os mesmos códigos de retorno.
*/
async function inscrever({ email, lang, env, origem }) {
  const resposta = await fetch('https://api.brevo.com/v3/contacts/doubleOptinConfirmation', {
    method: 'POST',
    headers: {
      'api-key': env.BREVO_API_KEY,
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({
      email,
      includeListIds: [Number(env.BREVO_LIST_ID)],
      templateId: Number(env.BREVO_TEMPLATE_ID),
      redirectionUrl: lang === 'en' ? env.REDIRECT_EN : env.REDIRECT_PT,
      // guarda o idioma no contato: serve para não mandar português a
      // quem assinou lendo em inglês, quando o envio existir
      attributes: { IDIOMA: lang.toUpperCase() },
    }),
  });

  if (resposta.status === 201 || resposta.status === 204) {
    return responder(200, {}, origem);
  }

  const dados = await resposta.json().catch(() => ({}));

  // a Brevo devolve duplicate_parameter quando o endereço já existe
  if (resposta.status === 400 && dados?.code === 'duplicate_parameter') {
    return responder(409, { erro: 'ja_inscrito' }, origem);
  }

  if (resposta.status === 400 && dados?.code === 'invalid_parameter') {
    return responder(400, { erro: 'email_invalido' }, origem);
  }

  // só o código do erro vai para o log: a resposta da Brevo às vezes ecoa o
  // endereço, e log da Cloudflare não é lugar de guardar e-mail de ninguém
  console.error('brevo respondeu', resposta.status, dados?.code ?? 'sem_codigo');
  return responder(502, { erro: 'provedor_indisponivel' }, origem);
}

/*
  Devolve a origem do pedido se ela for permitida, e null caso contrário.
  Em desenvolvimento o site roda em localhost, então ele também entra.
*/
function origemPermitida(request, env) {
  const origem = request.headers.get('Origin');
  if (!origem) return null;

  const permitidas = [env.SITE_URL, 'http://localhost:4321', 'http://127.0.0.1:4321'];
  return permitidas.includes(origem) ? origem : null;
}

function cabecalhos(origem) {
  return {
    'content-type': 'application/json; charset=utf-8',
    // sem origem conhecida, nenhum cabeçalho de liberação é devolvido
    ...(origem
      ? {
          'access-control-allow-origin': origem,
          'access-control-allow-methods': 'POST, OPTIONS',
          'access-control-allow-headers': 'content-type',
          'access-control-max-age': '86400',
          vary: 'Origin',
        }
      : {}),
  };
}

function responder(status, corpo, origem) {
  return new Response(JSON.stringify(corpo), { status, headers: cabecalhos(origem) });
}
