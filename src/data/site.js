// Fonte única de verdade sobre o site. Os textos traduzíveis ficam em
// src/i18n/ui.js; aqui ficam só os dados que não mudam com o idioma.
export const site = {
  url: 'https://fsnovais.github.io',
  // Marca do site: header, rodapé, título das abas, og:site_name e feeds.
  brand: 'Felipe.log',
  // Selo quadrado ao lado da marca, no header e no rodapé.
  mark: '>_',
  // Nome da pessoa: autoria, JSON-LD e currículo. Não muda junto com a marca.
  name: 'Felipe Novais',
  ogImage: '/og/pt/index.png',
  // Preencha se quiser um e-mail público no rodapé. Vazio = apenas o formulário.
  email: '',
  // Currículo em PDF, gerado de cv/curriculo.html por `npm run cv`.
  // Vazio esconde o link no rodapé e o botão na página Sobre.
  cv: '/arquivos/felipe-novais-cv.pdf',
  socials: [
    { label: 'GitHub', url: 'https://github.com/fsnovais' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/felipesn17/' },
  ],
  // conteúdo primeiro: o site é sobre o que você escreve.
  // `rota` é a chave em src/i18n/routes.js, que resolve o endereço por idioma.
  nav: [
    { chave: 'nav.blog', rota: 'blog' },
    { chave: 'nav.devlog', rota: 'devlog' },
    { chave: 'nav.projects', rota: 'projetos' },
    { chave: 'nav.about', rota: 'sobre' },
  ],
};

export const knowsAbout = [
  'dbt',
  'Snowflake',
  'BigQuery',
  'AWS',
  'Python',
  'SQL',
  'React',
  'Power BI',
  'Azure DevOps',
  'Data Modeling',
  'Artificial Intelligence',
  'Personal Finance',
  'Investing',
];
