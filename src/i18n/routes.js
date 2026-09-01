/*
  Mapa de rotas por idioma.

  O endereço é traduzido junto com o conteúdo: quem lê em português vê /sobre,
  quem lê em inglês vê /en/about. Cada chave aqui é uma página do site.

  As seções de conteúdo (blog e devlog) mantêm o mesmo nome nos dois idiomas
  porque a palavra é a mesma, e isso mantém o slug dos posts idêntico entre as
  versões, que é o que faz o botão de idioma achar a tradução.
*/

export const rotas = {
  home: { pt: '/', en: '/' },
  blog: { pt: '/blog', en: '/blog' },
  devlog: { pt: '/devlog', en: '/devlog' },
  projetos: { pt: '/projetos', en: '/projects' },
  sobre: { pt: '/sobre', en: '/about' },
  privacidade: { pt: '/privacidade', en: '/privacy' },
  // destino do link de confirmação da newsletter, enviado pela Brevo
  newsletterOk: { pt: '/newsletter/confirmado', en: '/newsletter/confirmed' },
};

/** Endereço de uma página no idioma pedido, já com o prefixo. */
export function rota(chave, lang) {
  const alvo = rotas[chave]?.[lang] ?? rotas[chave]?.pt ?? '/';
  if (lang === 'pt') return alvo;
  return alvo === '/' ? '/en' : `/en${alvo}`;
}

/**
 * Traduz um caminho SEM prefixo de idioma de um idioma para o outro,
 * preservando o que vier depois da rota conhecida.
 *
 *   traduzirRota('/sobre', 'pt', 'en')            -> '/about'
 *   traduzirRota('/blog/meu-post', 'pt', 'en')    -> '/blog/meu-post'
 */
export function traduzirRota(caminho, de, para) {
  const limpo = caminho.replace(/\/+$/, '') || '/';

  // rota exata
  for (const par of Object.values(rotas)) {
    if (par[de] === limpo) return par[para];
  }

  // rota com sufixo, como um post dentro de uma seção
  const candidatos = Object.values(rotas)
    .filter((par) => par[de] !== '/')
    .sort((a, b) => b[de].length - a[de].length);

  for (const par of candidatos) {
    if (limpo.startsWith(`${par[de]}/`)) {
      return par[para] + limpo.slice(par[de].length);
    }
  }

  return limpo;
}
