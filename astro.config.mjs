// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://fsnovais.github.io',
  // o repositorio e fsnovais.github.io (user site), entao a base e a raiz
  base: '/',
  trailingSlash: 'ignore',
  // Português na raiz (/), inglês em /en/. Sem redirecionamento automático.
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'pt',
        locales: { pt: 'pt-BR', en: 'en' },
      },
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    // as imagens de projeto sao servidas otimizadas pelo pipeline do Astro
    responsiveStyles: true,
  },
});
