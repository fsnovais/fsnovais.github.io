import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/*
  Uma coleção por seção E por idioma.

  O idioma vem da pasta, não do frontmatter. O MESMO nome de arquivo nas duas
  pastas significa que um texto é tradução do outro, e o botão de idioma leva
  direto de um para o outro:

    src/content/blog/pt/meu-post.md  ->  /pt/blog/meu-post
    src/content/blog/en/meu-post.md  ->  /blog/meu-post

  Escrever só num idioma continua funcionando: a listagem do outro idioma mostra
  o texto marcado como disponível apenas na outra língua.
*/

// Schema conferido no build: um post com frontmatter errado quebra o build,
// não vai para o ar quebrado.
const base = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

const colecao = (pasta: string) =>
  defineCollection({
    loader: glob({ pattern: '**/*.md', base: `./src/content/${pasta}` }),
    schema: base,
  });

export const collections = {
  blogEn: colecao('blog/en'),
  blogPt: colecao('blog/pt'),
  devlogEn: colecao('devlog/en'),
  devlogPt: colecao('devlog/pt'),
};
