import rss from '@astrojs/rss';
import { listarPosts } from '../../../lib/posts.js';
import { site } from '../../../data/site.js';
import { ui } from '../../../i18n/ui.js';
import { localizedPath } from '../../../i18n/utils.js';

// Um feed por seção E por idioma: quem assina o feed em inglês não recebe
// texto em português no meio da caixa de entrada.
export async function GET(context) {
  const lang = 'pt';
  const posts = await listarPosts('devlog', lang);

  return rss({
    title: `${ui[lang]['devlog.eyebrow']}, ${site.brand}`,
    description: ui[lang]['devlog.description'],
    site: context.site ?? site.url,
    trailingSlash: false,
    customData: `<language>pt-BR</language>`,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: localizedPath(lang, `/devlog/${post.id}`),
      categories: post.data.tags,
    })),
  });
}
