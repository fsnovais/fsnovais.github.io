/*
  Cria o arquivo de um post novo, já com o frontmatter preenchido.

  Uso:
    npm run post -- blog meu-post
    npm run post -- devlog nota-rapida --en
    npm run post -- blog meu-post --ambos

  Sem opção, cria só em português. `--en` cria só em inglês. `--ambos` cria os
  dois arquivos com o mesmo nome, que é o que liga um como tradução do outro.
*/
import fs from 'node:fs';
import path from 'node:path';

const [, , secao, slugBruto, ...opcoes] = process.argv;

const SECOES = ['blog', 'devlog'];

if (!secao || !slugBruto || !SECOES.includes(secao)) {
  console.error(`
Uso: npm run post -- <blog|devlog> <slug> [--en] [--ambos]

  npm run post -- blog custo-de-warehouse
  npm run post -- devlog erro-no-dbt --en
  npm run post -- blog custo-de-warehouse --ambos
`);
  process.exit(1);
}

/** Vira um slug seguro: sem acento, sem espaço, minúsculo. */
function paraSlug(texto) {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** "custo-de-warehouse" -> "Custo de warehouse" */
function paraTitulo(slug) {
  const texto = slug.replace(/-/g, ' ');
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

const slug = paraSlug(slugBruto);
const hoje = new Date().toISOString().slice(0, 10);
const titulo = paraTitulo(slug);

const idiomas = opcoes.includes('--ambos')
  ? ['pt', 'en']
  : opcoes.includes('--en')
    ? ['en']
    : ['pt'];

const modelo = {
  pt: `---
title: "${titulo}"
description: "Uma frase que aparece na listagem, no Google e na imagem de compartilhamento."
date: ${hoje}
tags: []
draft: true
---

Escreva aqui.

## Um subtítulo

Enquanto \`draft: true\`, o post aparece em \`npm run dev\` e fica fora do ar.
Troque para \`false\` quando estiver pronto para publicar.
`,
  en: `---
title: "${titulo}"
description: "One sentence that shows up in the listing, on Google and on the share image."
date: ${hoje}
tags: []
draft: true
---

Write here.

## A subheading

While \`draft: true\`, this post shows up in \`npm run dev\` and stays off the live site.
Switch it to \`false\` when it is ready to publish.
`,
};

const criados = [];
const existentes = [];

for (const lang of idiomas) {
  const destino = path.join('src', 'content', secao, lang, `${slug}.md`);

  if (fs.existsSync(destino)) {
    existentes.push(destino);
    continue;
  }

  fs.mkdirSync(path.dirname(destino), { recursive: true });
  fs.writeFileSync(destino, modelo[lang], 'utf8');
  criados.push({ destino, lang });
}

if (existentes.length) {
  console.log('\nJá existia, não sobrescrevi:');
  for (const e of existentes) console.log(`  ${e}`);
}

if (criados.length) {
  console.log('\nCriado:');
  for (const { destino, lang } of criados) {
    const url = lang === 'pt' ? `/${secao}/${slug}` : `/en/${secao}/${slug}`;
    console.log(`  ${destino}`);
    console.log(`    -> http://localhost:4321${url}`);
  }
  console.log(`
Próximos passos:
  1. Ajuste o title e a description no topo do arquivo
  2. Escreva o texto
  3. npm run dev e confira em http://localhost:4321/${secao}
  4. Troque draft: true para false quando quiser publicar
`);
}

if (!criados.length && !existentes.length) process.exit(1);
