# Inscrição na newsletter

O formulário do site não fala com a Brevo diretamente. Ele posta um JSON para
este Worker, e o Worker é quem guarda a chave de API e conhece o provedor.

```
formulário no site  ->  Cloudflare Worker  ->  Brevo
   (público)            (guarda a chave)      (lista + descadastro)
```

Isso resolve duas coisas de uma vez. A chave nunca aparece no HTML público, e
trocar de provedor amanhã é reescrever uma função (`inscrever`, em
`newsletter.js`) sem tocar no site nem quebrar o formulário que as pessoas já
conhecem.

A inscrição é por **dupla confirmação**: quem digita o e-mail recebe uma
mensagem e só entra na lista depois de clicar no link. Isso custa uns 20% de
conversão e paga de volta em endereço válido, reputação de envio, consentimento
registrado para a LGPD, e lista que migra limpa quando você trocar de serviço.

---

## Parte 1: Brevo

1. Crie a conta em brevo.com. O plano gratuito dá 300 e-mails por dia e
   contatos ilimitados, e não exige domínio próprio.
2. **Verifique um remetente** em *Senders, Domains & Dedicated IPs*. Sem
   domínio próprio, verifique um endereço de e-mail seu; a Brevo manda um
   código de confirmação.
3. **Crie a lista** em *Contacts > Lists*.
4. **Crie o template de confirmação** em *Marketing > Templates*, em
   *Create Template > Email template*. Preencha nome, remetente e assunto.

   O passo que importa: coloque um bloco de **botão** no corpo, clique nele e,
   no menu *Link > Type*, escolha **Double opt-in link**. A Brevo gera o
   endereço de confirmação sozinha; não existe variável para digitar à mão.
   Sem esse botão, a confirmação nunca acontece.

5. **Gere a chave de API** em *SMTP & API > API Keys*. Guarde: ela só aparece
   uma vez.

6. **Descubra os dois IDs.** Da raiz do repositório:

   ```bash
   BREVO_API_KEY=xkeysib-... node scripts/brevo-ids.mjs
   ```

   Ele lista as listas e os modelos com os respectivos ids, e avisa se o modelo
   estiver inativo, que é a pegadinha mais comum: modelo inativo não é enviado.

   Use a chave de **API** (começa com `xkeysib-`), não a chave SMTP. A SMTP
   serve para enviar por protocolo SMTP e não fala com esta API.

## Parte 2: Cloudflare

1. Crie a conta em cloudflare.com. O plano gratuito de Workers dá 100.000
   requisições por dia; este formulário vai usar algumas dezenas por mês.
2. Instale a ferramenta e entre na conta:

   ```bash
   npm install -g wrangler
   wrangler login
   ```

3. Da pasta `worker/`, grave os três segredos. Cada comando pede o valor e não
   escreve nada no repositório:

   ```bash
   cd worker
   wrangler secret put BREVO_API_KEY
   wrangler secret put BREVO_LIST_ID
   wrangler secret put BREVO_TEMPLATE_ID
   ```

4. Publique:

   ```bash
   wrangler deploy
   ```

   No fim ele imprime o endereço, algo como
   `https://newsletter.SEU-SUBDOMINIO.workers.dev`.

## Parte 3: ligar no site

1. No `.env` local, aponte para o endereço que o passo anterior imprimiu:

   ```
   PUBLIC_NEWSLETTER_ENDPOINT=https://newsletter.SEU-SUBDOMINIO.workers.dev
   ```

2. No GitHub, em *Settings > Secrets and variables > Actions*, crie o secret
   `PUBLIC_NEWSLETTER_ENDPOINT` com o mesmo valor. O `deploy.yml` já o repassa
   para o build.

3. Rode `npm run dev` e teste com um endereço seu. O esperado é ver
   "Quase lá. Confira sua caixa de entrada", receber o e-mail, clicar, e cair
   em `/newsletter/confirmado`.

Com `PUBLIC_NEWSLETTER_ENDPOINT` vazio, o formulário aparece mas avisa que a
inscrição não está configurada. Nada quebra, nada some.

---

## Quando o domínio próprio chegar

Muda uma coisa só, e ela é do lado da Brevo:

1. Adicione o domínio em *Senders, Domains & Dedicated IPs* e configure os
   registros DKIM, SPF e DMARC que ela indicar no DNS.
2. Troque o remetente das campanhas para o endereço no domínio novo.

Se o site também mudar de endereço, atualize `SITE_URL`, `REDIRECT_PT` e
`REDIRECT_EN` no `wrangler.toml` e rode `wrangler deploy` de novo. A lista de
assinantes não é afetada, e o formulário no site continua igual.

## Quando quiser trocar de provedor

Reescreva a função `inscrever` em `newsletter.js`, mantendo os mesmos códigos
de retorno do contrato descrito no topo do arquivo. Exporte os contatos da
Brevo em CSV e importe no serviço novo. O site não muda.

## Quando quiser automatizar o envio

Hoje o disparo é manual, pelo painel da Brevo: você escreve a campanha e envia.
Para automatizar depois, o caminho é um GitHub Action agendado que lê o RSS do
site, compara com um arquivo de estado no repositório e cria a campanha pela
API. Vale fazer quando escrever o e-mail na mão começar a incomodar, e não antes.
