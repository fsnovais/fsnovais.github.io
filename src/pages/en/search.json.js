import { listarBuscaveis, dataIso } from '../../lib/posts.js';
import { localizedPath } from '../../i18n/utils.js';

// Mesma ideia do índice em pt, só que na lista que aparece em /en/blog e
// /en/devlog: quem busca em inglês recebe título, tags e trecho em inglês.
export async function GET() {
  const lang = 'en';
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
