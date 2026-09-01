/*
  Confere o HTML gerado em dist/: metadados obrigatórios, hierarquia de títulos,
  links internos e âncoras.

  A checagem de âncora existe porque `/#contato` continuou apontando para a home
  depois que o formulário de contato mudou para a página Sobre. O link não quebra
  de forma visível: ele leva para uma página que existe, só que sem o destino.
*/
import fs from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
if (!fs.existsSync(DIST)) {
  console.error('dist/ não existe. Rode `npm run build` antes.');
  process.exit(1);
}

function listar(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const f = path.join(dir, e.name);
    return e.isDirectory() ? listar(f) : [f];
  });
}

const paginas = listar(DIST).filter((f) => f.endsWith('.html'));
const problemas = [];

/** Arquivo HTML que atende um caminho interno, ou null. */
function paginaDe(href) {
  const alvo = href.replace(/^\/+|\/+$/g, '');
  if (!alvo) return path.join(DIST, 'index.html');
  const direto = path.join(DIST, alvo);
  if (fs.existsSync(direto) && fs.statSync(direto).isFile()) return direto;
  const indice = path.join(DIST, alvo, 'index.html');
  if (fs.existsSync(indice)) return indice;
  return null;
}

for (const arquivo of paginas) {
  const rel = path.relative(DIST, arquivo);
  const html = fs.readFileSync(arquivo, 'utf8');
  const ehErro = rel.includes('404');

  if (!/<title>.+?<\/title>/s.test(html)) problemas.push(`${rel}: sem <title>`);
  if (!/name="description" content="[^"]+"/.test(html))
    problemas.push(`${rel}: sem meta description`);
  if (!ehErro && !/rel="canonical"/.test(html)) problemas.push(`${rel}: sem canonical`);
  if (!/property="og:image"/.test(html)) problemas.push(`${rel}: sem og:image`);

  const h1 = html.match(/<h1[^>]*>/g) || [];
  if (h1.length !== 1) problemas.push(`${rel}: ${h1.length} <h1> (esperado 1)`);

  const niveis = [...html.matchAll(/<h([1-6])[^>]*>/g)].map((m) => Number(m[1]));
  for (let i = 1; i < niveis.length; i += 1) {
    if (niveis[i] > niveis[i - 1] + 1) {
      problemas.push(`${rel}: pulo de h${niveis[i - 1]} para h${niveis[i]}`);
      break;
    }
  }

  // og:image tem de existir como arquivo
  const og = html.match(/property="og:image" content="([^"]+)"/);
  if (og) {
    const caminho = og[1].split('fsnovais.github.io').pop().replace(/^\//, '');
    if (caminho && !fs.existsSync(path.join(DIST, caminho)))
      problemas.push(`${rel}: og:image inexistente (${caminho})`);
  }

  // links internos
  for (const m of new Set([...html.matchAll(/href="(\/[^"#]*)"/g)].map((x) => x[1]))) {
    if (!m.replace(/\//g, '')) continue;
    if (paginaDe(m) === null) problemas.push(`${rel}: link interno quebrado -> ${m}`);
  }

  // âncoras para outra página
  for (const [, caminho, ancora] of html.matchAll(/href="(\/[^"#]*)#([^"]+)"/g)) {
    const destino = paginaDe(caminho);
    if (destino === null) {
      problemas.push(`${rel}: âncora para página inexistente -> ${caminho}#${ancora}`);
      continue;
    }
    const alvo = fs.readFileSync(destino, 'utf8');
    if (!alvo.includes(`id="${ancora}"`))
      problemas.push(
        `${rel}: âncora sem destino -> ${caminho}#${ancora} (não há id="${ancora}" em ${path.relative(DIST, destino)})`
      );
  }

  // âncoras da própria página
  for (const [, ancora] of html.matchAll(/href="#([^"]+)"/g)) {
    if (!html.includes(`id="${ancora}"`))
      problemas.push(`${rel}: âncora local sem destino -> #${ancora}`);
  }
}

console.log(`páginas conferidas: ${paginas.length}`);
if (problemas.length === 0) {
  console.log('nenhum problema encontrado');
  process.exit(0);
}
console.error('');
for (const p of [...new Set(problemas)].sort()) console.error(`  ${p}`);
process.exit(1);
