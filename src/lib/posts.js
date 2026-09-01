import { getCollection } from 'astro:content';

const ehProducao = import.meta.env.PROD;

/** Nome da coleção a partir da seção e do idioma: blog + en -> blogEn */
function nomeColecao(secao, lang) {
  return `${secao}${lang === 'en' ? 'En' : 'Pt'}`;
}

/**
 * Posts de uma seção num idioma, do mais novo para o mais antigo.
 * Rascunhos aparecem no dev e somem no build de produção.
 */
export async function listarPosts(secao, lang) {
  const posts = await getCollection(
    nomeColecao(secao, lang),
    ({ data }) => !ehProducao || !data.draft
  );
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/**
 * Listagem de uma seção no idioma pedido, incluindo os textos que só existem
 * no outro idioma. Cada item vem com o idioma real e se está traduzido.
 *
 * Assim a versão em inglês do blog nunca fica vazia só porque um texto ainda
 * não foi traduzido: ele aparece marcado, apontando para a versão que existe.
 */
export async function listarComTraducao(secao, lang) {
  const outro = lang === 'en' ? 'pt' : 'en';
  const [noIdioma, noOutro] = await Promise.all([
    listarPosts(secao, lang),
    listarPosts(secao, outro),
  ]);

  const idsNoIdioma = new Set(noIdioma.map((p) => p.id));

  const itens = [
    ...noIdioma.map((post) => ({ post, lang, traduzido: true })),
    ...noOutro
      .filter((p) => !idsNoIdioma.has(p.id))
      .map((post) => ({ post, lang: outro, traduzido: false })),
  ];

  return itens.sort((a, b) => b.post.data.date.getTime() - a.post.data.date.getTime());
}

/** Existe versão deste post no idioma pedido? */
export async function temTraducao(secao, lang, id) {
  const posts = await listarPosts(secao, lang);
  return posts.some((p) => p.id === id);
}

export function formatarData(data, lang = 'pt') {
  return new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(data);
}

export function dataIso(data) {
  return data.toISOString().slice(0, 10);
}

/** Estimativa de leitura a 200 palavras por minuto, mínimo de 1. */
export function tempoDeLeitura(corpo = '') {
  const palavras = corpo.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(palavras / 200));
}
