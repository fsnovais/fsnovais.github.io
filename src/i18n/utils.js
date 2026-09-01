import { ui, defaultLang, languages } from './ui.js';
import { traduzirRota } from './routes.js';

/** Descobre o idioma pelo primeiro segmento da URL. Sem prefixo = português. */
export function getLangFromUrl(url) {
  const [, prefixo] = url.pathname.split('/');
  return prefixo in ui && prefixo !== defaultLang ? prefixo : defaultLang;
}

/**
 * Devolve a função de tradução.
 * Chave ausente cai no idioma padrão e, se faltar lá também, em qualquer outro
 * idioma que a tenha. Só devolve a chave crua se ela não existir em lugar nenhum,
 * o que aparece na tela e denuncia o esquecimento em vez de sumir calado.
 */
export function useTranslations(lang) {
  return function t(chave) {
    const noIdioma = ui[lang]?.[chave];
    if (noIdioma !== undefined) return noIdioma;

    const noPadrao = ui[defaultLang]?.[chave];
    if (noPadrao !== undefined) return noPadrao;

    for (const outro of Object.keys(ui)) {
      if (ui[outro]?.[chave] !== undefined) return ui[outro][chave];
    }
    return chave;
  };
}

/**
 * Monta um caminho no idioma pedido.
 * localizedPath('pt', '/blog') -> '/blog'
 * localizedPath('en', '/blog') -> '/en/blog'
 */
export function localizedPath(lang, caminho = '/') {
  const limpo = `/${String(caminho).replace(/^\/+/, '')}`.replace(/\/+$/, '') || '/';
  if (lang === defaultLang) return limpo;
  return limpo === '/' ? `/${lang}` : `/${lang}${limpo}`;
}

/** Tira o prefixo de idioma de um caminho, devolvendo a rota neutra. */
export function stripLang(pathname) {
  const outros = Object.keys(languages).filter((l) => l !== defaultLang);
  for (const l of outros) {
    if (pathname === `/${l}` || pathname === `/${l}/`) return '/';
    if (pathname.startsWith(`/${l}/`)) return pathname.slice(l.length + 1);
  }
  return pathname;
}

/**
 * Mesma página, no outro idioma, com o endereço traduzido.
 * De '/sobre' em pt para '/en/about' em inglês.
 */
export function paginaNoIdioma(pathname, de, para) {
  const neutra = stripLang(pathname);
  return localizedPath(para, traduzirRota(neutra, de, para));
}

/** O outro idioma disponível, para o botão de troca. */
export function otherLang(lang) {
  return Object.keys(languages).find((l) => l !== lang) ?? defaultLang;
}

/** Escolhe o texto certo de um campo que pode ser string ou { en, pt }. */
export function pick(valor, lang) {
  if (valor && typeof valor === 'object' && !Array.isArray(valor)) {
    return valor[lang] ?? valor[defaultLang] ?? '';
  }
  return valor;
}
