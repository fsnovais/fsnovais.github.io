/*
  Todas as strings de interface do site, nos dois idiomas.
  Português é o padrão e fica na raiz (/). Inglês fica em /en/.

  Para adicionar uma string, coloque a mesma chave nos dois blocos.
  Uma chave que falte em `en` cai no texto em português, nunca some.
*/

export const languages = {
  pt: 'Português',
  en: 'English',
};

export const defaultLang = 'pt';

/** Códigos completos para as tags hreflang e og:locale. */
export const localeTags = {
  en: { html: 'en', og: 'en_US', hreflang: 'en' },
  pt: { html: 'pt-BR', og: 'pt_BR', hreflang: 'pt-BR' },
};

export const ui = {
  en: {
    // navegação
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.blog': 'Blog',
    'nav.devlog': 'Devlog',
    'nav.primary': 'Primary navigation',
    'nav.open': 'Open menu',
    'nav.footer': 'Footer links',
    'nav.skip': 'Skip to content',

    // controles
    'toggle.theme.toDark': 'Switch to dark theme',
    'toggle.theme.toLight': 'Switch to light theme',
    'toggle.lang': 'Ver em português',
    'toggle.langGroup': 'Language',
    'toggle.langCurrent': 'current language',

    // meta do site
    'site.role': 'Senior Data Engineer',
    'site.tagline': 'Technology and finance',
    'site.title': 'Felipe.log, technology and finance',
    'site.description':
      'Here I write about technology, finance and whatever else catches my eye along the way.',

    // home
    // {devlog} e {contato} viram o endereço no idioma da página
    'home.lede':
      'Here I write about technology, finance and whatever else catches my eye along the way. I also keep a <a href="{devlog}">devlog</a> with shorter notes from the day to day. Feel free to <a href="{contato}">reach out</a> if you want to talk about any of it!',
    'home.latest': 'Latest',
    'home.allBlog': 'All writing',
    'home.allDevlog': 'All notes',
    'home.moreTitle': 'Beyond the writing',
    'home.projectsCard': 'What I have built, from data pipelines to web interfaces and small tools.',
    'home.aboutCard': 'How I work, the stack I use and how to reach me.',
    'home.contactCard': 'Open to data engineering roles, and to talking about anything on this site. I reply within two business days.',
    'home.contactLabel': 'Contact',

    // projetos
    'projects.eyebrow': 'Projects',
    'projects.title': 'What I have built',
    'projects.intro':
      'Data and integration work first, front-end after. Each card links to the repository or the live site.',
    'projects.filterLabel': 'Filter projects by area',
    'projects.all': 'All',
    'projects.shown': 'project shown.',
    'projects.shownPlural': 'projects shown.',
    'projects.cat.dados': 'Data',
    'projects.cat.backend': 'Back-end',
    'projects.cat.frontend': 'Front-end',

    // contato
    'contact.eyebrow': 'Contact',
    'contact.title': "Let's talk",
    'contact.intro':
      'Open to data engineering roles, remote, and to trading notes on anything on this site, from pipelines and warehouse cost to what to do with the money. I reply within two business days.',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send',
    'contact.sending': 'Sending...',
    'contact.honeypot': 'Do not fill in this field',
    'contact.ok': 'Message sent. Thanks for reaching out.',
    'contact.error': 'I could not send it right now. Try again in a few minutes.',
    'contact.noKey': 'Form has no key configured. Set PUBLIC_STATICFORMS_KEY.',

    // rodapé
    'footer.builtWith': 'Built with Astro',
    'footer.cv': 'CV',

    // blog e devlog
    'blog.eyebrow': 'Blog',
    'blog.title': 'Writing',
    'blog.intro':
      'Topics worth more than a quick note: an architecture decision, an investment analysis, the reasoning behind an expensive choice. For the day to day, see the',
    'blog.introLink': 'devlog',
    'blog.description':
      'Writing on technology, finance and whatever else comes up, with the reasoning behind the decisions.',
    'devlog.eyebrow': 'Devlog',
    'devlog.title': 'Notes from the day to day',
    'devlog.intro':
      'A short record of what comes up: a problem at work, a tool that paid off, a calculation that did not close, or anything else worth writing down. For longer pieces, see the',
    'devlog.introLink': 'blog',
    'devlog.description':
      'Short notes from the day to day: code, money and whatever else comes up. Real problems, what I tried and what fixed it.',
    'posts.subscribe': 'Subscribe via RSS',
    'posts.section.blog': 'Blog',
    'posts.section.devlog': 'Devlog',
    'posts.empty': 'Nothing published here yet.',
    'posts.draft': 'draft',
    'posts.readingTime': 'min read',
    'posts.onlyPortuguese': 'only in Portuguese',
    'posts.onlyEnglish': 'only in English',
    'post.footer':
      'Written something similar, or disagree? Reach me on',
    'post.footerOr': 'or through the',
    'post.footerForm': 'contact form',

    // sobre
    'about.eyebrow': 'About',
    'about.description':
      'Who I am, what holds my attention and how to reach me. The professional side is in the CV in PDF.',
    'about.ctaContact': 'Talk to me',
    'about.cv': 'Download CV (PDF)',

    // 404
    '404.title': 'This page does not exist',
    '404.description': 'The page you were looking for does not exist.',
    '404.explanation':
      'The address may have changed, or the link that brought you here is out of date.',
    '404.home': 'Home',
  },

  pt: {
    'nav.about': 'Sobre',
    'nav.projects': 'Projetos',
    'nav.blog': 'Blog',
    'nav.devlog': 'Devlog',
    'nav.primary': 'Navegação principal',
    'nav.open': 'Abrir menu',
    'nav.footer': 'Links do rodapé',
    'nav.skip': 'Pular para o conteúdo',

    'toggle.theme.toDark': 'Mudar para o tema escuro',
    'toggle.theme.toLight': 'Mudar para o tema claro',
    'toggle.lang': 'View in English',
    'toggle.langGroup': 'Idioma',
    'toggle.langCurrent': 'idioma atual',

    'site.role': 'Engenheiro de Dados Sênior',
    'site.tagline': 'Tecnologia e finanças',
    'site.title': 'Felipe.log, tecnologia e finanças',
    'site.description':
      'Aqui falo sobre tecnologia, finanças e mais o que me der na telha pelo caminho.',

    // home
    // {devlog} e {contato} viram o endereço no idioma da página
    'home.lede':
      'Aqui falo sobre tecnologia, finanças e mais o que me der na telha pelo caminho. Também mantenho um <a href="{devlog}">devlog</a> com notas mais curtas do dia a dia. Fique à vontade para <a href="{contato}">me chamar</a> se quiser conversar sobre esses assuntos!',
    'home.latest': 'Mais recentes',
    'home.allBlog': 'Todos os textos',
    'home.allDevlog': 'Todas as notas',
    'home.moreTitle': 'Além dos textos',
    'home.projectsCard': 'O que eu construí, de pipelines de dados a interfaces web e ferramentas pequenas.',
    'home.aboutCard': 'Como eu trabalho, a stack que uso e como falar comigo.',
    'home.contactCard':
      'Aberto a oportunidades em engenharia de dados e a conversar sobre qualquer assunto daqui. Respondo em até dois dias úteis.',
    'home.contactLabel': 'Contato',

    'projects.eyebrow': 'Projetos',
    'projects.title': 'O que eu construí',
    'projects.intro':
      'Projetos de dados e integração primeiro, front-end depois. Cada card leva ao repositório ou ao site publicado.',
    'projects.filterLabel': 'Filtrar projetos por área',
    'projects.all': 'Todos',
    'projects.shown': 'projeto exibido.',
    'projects.shownPlural': 'projetos exibidos.',
    'projects.cat.dados': 'Dados',
    'projects.cat.backend': 'Back-end',
    'projects.cat.frontend': 'Front-end',

    'contact.eyebrow': 'Contato',
    'contact.title': 'Vamos conversar',
    'contact.intro':
      'Aberto a oportunidades em engenharia de dados, remoto, e a trocar ideia sobre qualquer assunto daqui, de pipeline e custo de warehouse a o que fazer com o dinheiro. Respondo em até dois dias úteis.',
    'contact.name': 'Nome',
    'contact.email': 'Email',
    'contact.message': 'Mensagem',
    'contact.send': 'Enviar',
    'contact.sending': 'Enviando...',
    'contact.honeypot': 'Não preencha este campo',
    'contact.ok': 'Mensagem enviada. Obrigado pelo contato.',
    'contact.error': 'Não consegui enviar agora. Tente de novo em alguns minutos.',
    'contact.noKey': 'Formulário sem chave configurada. Defina PUBLIC_STATICFORMS_KEY.',

    'footer.builtWith': 'Feito com Astro',
    'footer.cv': 'Currículo',

    'blog.eyebrow': 'Blog',
    'blog.title': 'Textos',
    'blog.intro':
      'Assuntos que rendem mais que uma nota rápida: uma decisão de arquitetura, a análise de um investimento, o raciocínio por trás de uma escolha cara. Para o dia a dia, veja o',
    'blog.introLink': 'devlog',
    'blog.description':
      'Textos sobre tecnologia, finanças e o que mais aparecer, com o raciocínio por trás das decisões.',
    'devlog.eyebrow': 'Devlog',
    'devlog.title': 'Notas do dia a dia',
    'devlog.intro':
      'Registro curto do que aparece: um problema no trabalho, uma ferramenta que valeu a pena, uma conta que não fechou, ou qualquer outra coisa que mereça registro. Para textos mais longos, veja o',
    'devlog.introLink': 'blog',
    'devlog.description':
      'Notas curtas do dia a dia: código, dinheiro e o que mais aparecer. Problemas reais, o que testei e o que resolveu.',
    'posts.subscribe': 'Assinar por RSS',
    'posts.section.blog': 'Blog',
    'posts.section.devlog': 'Devlog',
    'posts.empty': 'Nada publicado por aqui ainda.',
    'posts.draft': 'rascunho',
    'posts.readingTime': 'min de leitura',
    'posts.onlyPortuguese': 'só em português',
    'posts.onlyEnglish': 'só em inglês',
    'post.footer': 'Escreveu algo parecido ou discorda? Me chame no',
    'post.footerOr': 'ou pelo',
    'post.footerForm': 'formulário de contato',

    'about.eyebrow': 'Sobre',
    'about.description':
      'Quem eu sou, o que me prende a atenção e como falar comigo. O lado profissional está no currículo em PDF.',
    'about.ctaContact': 'Falar comigo',
    'about.cv': 'Baixar currículo (PDF)',

    '404.title': 'Esta página não existe',
    '404.description': 'A página que você procurou não existe.',
    '404.explanation':
      'O endereço pode ter mudado, ou o link que te trouxe aqui está desatualizado.',
    '404.home': 'Início',
  },
};
