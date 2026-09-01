# Registro das operações de tratamento

Documento interno, exigido pelo artigo 37 da LGPD. Como agente de tratamento
de pequeno porte (pessoa natural, sem tratamento de alto risco), o registro
pode ser feito em **forma simplificada**, nos termos do artigo 9 da Resolução
CD/ANPD nº 2/2022. É isto aqui.

Ele **não é publicado no site**. Serve para você responder rápido se alguém
perguntar, e para você mesmo lembrar do que existe. A versão voltada ao público
é `src/i18n/privacidade.js`, que gera `/privacidade` e `/en/privacy`. Mexeu em
um, revise o outro.

- **Controlador:** Felipe Novais, pessoa natural
- **Canal do titular:** formulário de contato do site, em `/sobre#contato`
- **Encarregado:** não indicado. Dispensa do artigo 11 da Resolução CD/ANPD
  nº 2/2022, que exige apenas o canal de comunicação acima
- **Prazos de resposta:** o artigo 14 da mesma resolução dobra os prazos gerais
  para agentes de pequeno porte. A política promete trinta dias, que é mais
  rígido do que o exigido, de propósito
- **Última revisão:** 2026-09-01

---

## 1. Contato pelo formulário

| Campo | Conteúdo |
|---|---|
| Dados | Nome, e-mail, mensagem escrita pela pessoa |
| Titulares | Quem escolhe escrever pelo site |
| Finalidade | Responder à mensagem |
| Base legal | Art. 7, V (procedimentos preliminares a pedido do titular) |
| Operador | StaticForms (Estados Unidos), que recebe e repassa |
| Retenção | Doze meses após a última troca, então exclusão da caixa de entrada |
| Transferência internacional | Sim, Estados Unidos. Art. 33 e Resolução CD/ANPD nº 19/2024, com base nas salvaguardas contratuais publicadas pelo fornecedor |
| Segurança | HTTPS, chave do formulário em variável de ambiente, armadilha anti-robô |
| Exclusão | Manual, na caixa de entrada |

## 2. Inscrição na newsletter

| Campo | Conteúdo |
|---|---|
| Dados | E-mail, idioma de leitura, e o registro do aceite (data, hora e IP) feito pela Brevo |
| Titulares | Quem se inscreve e confirma |
| Finalidade | Avisar quando sai texto novo |
| Base legal | Art. 7, I (consentimento) |
| Prova do consentimento | Dupla confirmação. O registro de aceite guardado pela Brevo é a prova exigida pelo art. 8, § 2 |
| Operadores | Cloudflare Workers (Estados Unidos), que só repassa; Brevo (França), que guarda a lista e processa o descadastro |
| Retenção | Até o descadastro. O registro do consentimento é mantido enquanto a inscrição durar, como prova |
| Transferência internacional | Sim, Estados Unidos e França. Mesma base do item anterior |
| Segurança | Chave de API só no Worker, origem restrita ao site, e-mail nunca gravado em log |
| Exclusão | Link de descadastro em todo e-mail, com efeito imediato, processado pela Brevo |

## 3. Logs de acesso

| Campo | Conteúdo |
|---|---|
| Dados | Endereço de IP e navegador, registrados por qualquer servidor web |
| Finalidade | Operação e segurança da hospedagem |
| Base legal | Art. 7, IX (legítimo interesse), e art. 15 do Marco Civil da Internet |
| Operadores | GitHub Pages e Cloudflare, conforme as políticas de retenção deles |
| Observação | Não tenho acesso a esses logs no plano usado, nem os cruzo com nada |

---

## O que este site não faz

Vale registrar porque é o que dispensa uma pilha de obrigações:

- não usa cookie de espécie alguma
- não tem analytics, pixel de anúncio, gravador de sessão ou widget social
- serve as fontes do próprio domínio, então ler uma página não entrega IP a terceiro
- não trata dado sensível (art. 5, II)
- não faz decisão automatizada nem perfilamento (art. 20)
- não é dirigido a crianças e adolescentes (art. 14)
- não vende nem compartilha dado com ninguém além dos operadores acima

## Pendências a conferir

- [ ] "Enforce HTTPS" ligado em Settings > Pages do repositório
- [ ] Ler o DPA do StaticForms e confirmar que traz cláusulas equivalentes às
      cláusulas-padrão da ANPD. É o menor dos três fornecedores e o elo que eu
      trocaria primeiro se o texto não convencer
- [ ] Guardar cópia dos DPAs de Brevo, Cloudflare e GitHub junto deste arquivo

## Quando revisar

- Ao acrescentar qualquer coleta nova (analytics, comentários, área logada)
- Ao trocar de fornecedor
- Ao passar a monetizar o site de qualquer forma
- Uma vez por ano, mesmo que nada tenha mudado
