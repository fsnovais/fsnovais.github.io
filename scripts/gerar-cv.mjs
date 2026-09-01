/*
  Gera o PDF do currículo a partir de cv/curriculo.html.

    npm run cv

  Precisa do Chromium via Playwright. Se não quiser essa dependência, abra o
  HTML no navegador e use Ctrl+P > Salvar como PDF, com margens padrão: o CSS
  já define o tamanho da página e as margens, então o resultado é o mesmo.
*/
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ORIGEM = path.resolve('cv/curriculo.html');
const DESTINO = path.resolve('public/arquivos/felipe-novais-cv.pdf');

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.error(`
O Playwright não está instalado, então não dá para gerar o PDF por aqui.

Duas saídas:
  1. npm i -D playwright && npx playwright install chromium
  2. Abra cv/curriculo.html no navegador e use Ctrl+P > Salvar como PDF,
     com margens padrão, salvando em public/arquivos/felipe-novais-cv.pdf
`);
  process.exit(1);
}

const navegador = await chromium.launch();
const pagina = await navegador.newPage();

await pagina.goto(pathToFileURL(ORIGEM).href, { waitUntil: 'networkidle' });
await pagina.pdf({
  path: DESTINO,
  format: 'A4',
  printBackground: true,
  // as margens vêm do @page no CSS
  margin: { top: '0', right: '0', bottom: '0', left: '0' },
  preferCSSPageSize: true,
});

await navegador.close();
console.log(`PDF gerado: ${path.relative(process.cwd(), DESTINO)}`);
