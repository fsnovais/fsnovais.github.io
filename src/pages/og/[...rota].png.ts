import type { APIRoute } from 'astro';
import { gerarOg } from '../../lib/og.js';
import { listarPosts } from '../../lib/posts.js';
import { ui, languages } from '../../i18n/ui.js';

/**
 * Uma imagem de compartilhamento por página E por idioma, desenhada no build.
 * Nenhuma imagem precisa ser criada à mão: o título e a descrição viram o cartão.
 * Rota: /og/<idioma>/<pagina>.png
 */
export async function getStaticPaths() {
  const caminhos: any[] = [];

  for (const lang of Object.keys(languages)) {
    const [blog, devlog] = await Promise.all([
      listarPosts('blog', lang),
      listarPosts('devlog', lang),
    ]);
    const t = (k: string) => ui[lang][k] ?? ui.en[k] ?? k;

    const fixas = [
      { slug: 'index', eyebrow: t('site.tagline'), titulo: 'Felipe.log', descricao: t('site.description') },
      { slug: 'sobre', eyebrow: t('about.eyebrow'), titulo: 'Felipe Novais', descricao: t('about.description') },
      { slug: 'blog', eyebrow: t('blog.eyebrow'), titulo: t('blog.title'), descricao: t('blog.description') },
      { slug: 'devlog', eyebrow: t('devlog.eyebrow'), titulo: t('devlog.title'), descricao: t('devlog.description') },
      { slug: 'projetos', eyebrow: t('projects.eyebrow'), titulo: t('projects.title'), descricao: t('projects.intro') },
    ];

    for (const f of fixas) {
      caminhos.push({
        params: { rota: `${lang}/${f.slug}` },
        props: { eyebrow: f.eyebrow, titulo: f.titulo, descricao: f.descricao },
      });
    }

    for (const [colecao, posts] of [['blog', blog], ['devlog', devlog]] as const) {
      for (const post of posts) {
        caminhos.push({
          params: { rota: `${lang}/${colecao}/${post.id}` },
          props: {
            eyebrow: colecao === 'blog' ? t('blog.eyebrow') : t('devlog.eyebrow'),
            titulo: post.data.title,
            descricao: post.data.description,
          },
        });
      }
    }
  }

  return caminhos;
}

export const GET: APIRoute = async ({ props }) => {
  const png = await gerarOg(props as Parameters<typeof gerarOg>[0]);
  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
