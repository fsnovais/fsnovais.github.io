import { listarBuscaveis, dataIso } from '../lib/posts.js';
import { localizedPath } from '../i18n/utils.js';

// Índice de busca em pt: um arquivo estático, gerado no build, consumido pelo
// componente de busca no navegador. Mesma lista que aparece em /blog e /devlog.
export async function GET() {
  const lang = 'pt';
  const itens = await listarBuscaveis(lang);

  const dados = itens.map(({ post, lang: langPost, traduzido, secao }) => ({
    titulo: post.data.title,
    descricao: post.data.description,
    url: localizedPath(langPost, `/${secao}/${post.id}`),
    data: dataIso(post.data.date),
    secao,
    tags: post.data.tags,
    idioma: langPost,
    traduzido,
  }));

  return new Response(JSON.stringify(dados), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
