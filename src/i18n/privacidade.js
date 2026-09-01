/*
  Texto do aviso de privacidade, nos dois idiomas.

  Escrito para ser lido, não para se defender em juízo: frase curta, sem
  "outrossim", sem parágrafo de cinquenta linhas. A LGPD exige acesso
  facilitado à informação (art. 9), e um texto que ninguém termina de ler não
  cumpre isso, mesmo estando publicado.

  Ao mudar qualquer coisa aqui, atualize a data em `atualizadoEm` e revise o
  registro interno em `docs/registro-tratamento.md`, que descreve as mesmas
  operações do ponto de vista do art. 37.

  Use {contato} no lugar do endereço do formulário: o prefixo do idioma entra
  sozinho na hora de renderizar.
*/

// AAAA-MM-DD. Aparece no topo da página, nos dois idiomas.
export const atualizadoEm = '2026-09-01';

// Prazo de guarda das mensagens do formulário, citado no texto e no registro.
export const RETENCAO_CONTATO_MESES = 12;

export const privacidade = {
  en: {
    resumo:
      'Short version: this site sets no cookies, runs no analytics and tracks nobody. It only holds personal data when you hand it over yourself, by writing through the contact form or subscribing to the newsletter. You can ask me to delete it at any time.',
    blocos: [
      {
        titulo: 'Who is responsible',
        paragrafos: [
          'Felipe Novais, a natural person, is the controller of the data described here. There is no company behind this site and nothing on it is sold.',
          'To exercise any of the rights below, or to ask anything about this notice, write through the <a href="{contato}">contact form</a>. That form is the communication channel required by the Brazilian data protection authority for small processing agents.',
        ],
      },
      {
        titulo: 'What the site collects, and why',
        paragrafos: [
          '<strong>Contact form.</strong> Name, email address and the message you write. Purpose: answering you. Legal basis: your request, under article 7, item V of the LGPD. The message reaches my inbox and is kept for up to twelve months after our last exchange, then deleted.',
          '<strong>Newsletter.</strong> Email address and the language you were reading in. Purpose: telling you when a new post goes up. Legal basis: your consent, under article 7, item I. Subscription only takes effect after you click the link in the confirmation email, and that confirmation is recorded with date, time and IP address as proof of consent, as article 8 requires. Your address stays on the list until you unsubscribe.',
          '<strong>Nothing else.</strong> No account, no profile, no purchase, no sensitive data, no automated decision that affects you.',
        ],
      },
      {
        titulo: 'What the site does not do',
        paragrafos: [
          'It sets no cookies. It runs no analytics, no advertising pixel, no session recorder and no social network widget.',
          'Fonts are served from this site itself, not from an external service, so simply reading a page does not hand your IP address to anyone else.',
          'Your theme choice is stored in your own browser, in local storage. It never leaves your device and I never see it.',
        ],
      },
      {
        titulo: 'Who else touches this data',
        paragrafos: [
          'Three suppliers act as processors, each doing one job and nothing more:',
          '<strong>GitHub Pages</strong> (United States) hosts the site. Like any web server it records access logs with IP address and browser.',
          '<strong>StaticForms</strong> (United States) receives the contact form and forwards it to my inbox.',
          '<strong>Brevo</strong> (France) stores the newsletter list, sends the confirmation email and processes unsubscribes. The subscription passes through a Cloudflare (United States) function that holds the API key.',
          'This means your data is transferred outside Brazil. The transfer relies on the contractual safeguards these suppliers publish in their own data processing agreements, in the terms of article 33 of the LGPD and ANPD Resolution 19/2024. I share data with nobody else, and I sell data to nobody.',
        ],
      },
      {
        titulo: 'Your rights',
        paragrafos: [
          'Article 18 of the LGPD gives you the right to confirm that processing exists, to access your data, to correct it, to anonymise, block or delete unnecessary or excessive data, to obtain it in portable form, to know who it has been shared with, and to withdraw consent.',
          'Ask through the <a href="{contato}">contact form</a> and I answer within thirty days. For the newsletter you do not need to ask: every email carries an unsubscribe link that takes effect immediately.',
          'You may also file a complaint with the ANPD, the Brazilian national data protection authority.',
        ],
      },
      {
        titulo: 'Security and children',
        paragrafos: [
          'The site is served over HTTPS, the newsletter API key never reaches the browser, and only my own site is allowed to submit the subscription form.',
          'No absolute guarantee exists in this field, and I would rather say so plainly than promise otherwise.',
          'This site is not aimed at children or adolescents and does not knowingly collect their data. If you believe a minor sent me something, write to me and I delete it.',
        ],
      },
      {
        titulo: 'Changes',
        paragrafos: [
          'If this notice changes, the date at the top changes with it, and the full history is public in the site repository on GitHub.',
        ],
      },
    ],
  },

  pt: {
    resumo:
      'Versão curta: este site não usa cookie, não tem analytics e não rastreia ninguém. Ele só guarda dado pessoal quando você mesmo entrega, escrevendo pelo formulário de contato ou assinando a newsletter. Você pode pedir a exclusão quando quiser.',
    blocos: [
      {
        titulo: 'Quem é o responsável',
        paragrafos: [
          'Felipe Novais, pessoa natural, é o controlador dos dados descritos aqui. Não existe empresa por trás deste site e nada nele é vendido.',
          'Para exercer qualquer um dos direitos abaixo, ou para perguntar qualquer coisa sobre este aviso, escreva pelo <a href="{contato}">formulário de contato</a>. Ele é o canal de comunicação exigido pela ANPD para agentes de tratamento de pequeno porte.',
        ],
      },
      {
        titulo: 'O que o site coleta, e para quê',
        paragrafos: [
          '<strong>Formulário de contato.</strong> Nome, e-mail e a mensagem que você escreve. Finalidade: te responder. Base legal: o seu próprio pedido, no artigo 7, inciso V, da LGPD. A mensagem chega na minha caixa de entrada e fica guardada por até doze meses depois da nossa última troca, e então é apagada.',
          '<strong>Newsletter.</strong> Endereço de e-mail e o idioma em que você estava lendo. Finalidade: avisar quando sai texto novo. Base legal: o seu consentimento, no artigo 7, inciso I. A inscrição só vale depois que você clica no link do e-mail de confirmação, e essa confirmação fica registrada com data, hora e endereço de IP, que é a prova de consentimento exigida pelo artigo 8. Seu endereço fica na lista até você se descadastrar.',
          '<strong>Nada além disso.</strong> Não existe conta, nem perfil, nem compra, nem dado sensível, nem decisão automatizada que afete você.',
        ],
      },
      {
        titulo: 'O que o site não faz',
        paragrafos: [
          'Não usa cookie. Não tem analytics, nem pixel de anúncio, nem gravador de sessão, nem widget de rede social.',
          'As fontes são servidas pelo próprio site, e não por um serviço externo, então só de ler uma página o seu endereço de IP não vai para mais ninguém.',
          'A sua escolha de tema fica guardada no seu próprio navegador, no armazenamento local. Ela nunca sai do seu aparelho e eu nunca vejo.',
        ],
      },
      {
        titulo: 'Quem mais encosta nesses dados',
        paragrafos: [
          'Três fornecedores atuam como operadores, cada um fazendo uma coisa só:',
          '<strong>GitHub Pages</strong> (Estados Unidos) hospeda o site. Como todo servidor web, registra logs de acesso com endereço de IP e navegador.',
          '<strong>StaticForms</strong> (Estados Unidos) recebe o formulário de contato e repassa para a minha caixa de entrada.',
          '<strong>Brevo</strong> (França) guarda a lista da newsletter, envia o e-mail de confirmação e processa os descadastros. A inscrição passa por uma função da Cloudflare (Estados Unidos), que é onde a chave de API fica guardada.',
          'Ou seja: há transferência internacional de dados. Ela se apoia nas salvaguardas contratuais que esses fornecedores publicam nos próprios acordos de tratamento, nos termos do artigo 33 da LGPD e da Resolução CD/ANPD nº 19/2024. Não compartilho com mais ninguém, e não vendo dado para ninguém.',
        ],
      },
      {
        titulo: 'Seus direitos',
        paragrafos: [
          'O artigo 18 da LGPD te dá o direito de confirmar que existe tratamento, acessar os dados, corrigi-los, pedir anonimização, bloqueio ou eliminação do que for desnecessário ou excessivo, obter os dados em formato portável, saber com quem foram compartilhados, e revogar o consentimento.',
          'Peça pelo <a href="{contato}">formulário de contato</a> e eu respondo em até trinta dias. Para a newsletter você nem precisa pedir: todo e-mail leva um link de descadastro que vale na hora.',
          'Você também pode reclamar diretamente à ANPD, a Autoridade Nacional de Proteção de Dados.',
        ],
      },
      {
        titulo: 'Segurança e crianças',
        paragrafos: [
          'O site é servido por HTTPS, a chave de API da newsletter nunca chega ao navegador, e só o próprio site tem permissão para enviar o formulário de inscrição.',
          'Garantia absoluta não existe nessa área, e eu prefiro dizer isso do que prometer o contrário.',
          'Este site não é dirigido a crianças e adolescentes e não coleta dados deles de propósito. Se você acha que um menor me mandou alguma coisa, me escreva que eu apago.',
        ],
      },
      {
        titulo: 'Mudanças',
        paragrafos: [
          'Se este aviso mudar, a data lá em cima muda junto, e o histórico completo fica público no repositório do site no GitHub.',
        ],
      },
    ],
  },
};
