/*
  Confere que os dois idiomas têm exatamente as mesmas chaves.

  Existe porque uma chave presente só num idioma não quebra o build: ela cai no
  fallback e, no pior caso, aparece crua na tela. Este script transforma isso em
  erro antes de publicar.
*/
import { ui } from '../src/i18n/ui.js';

const idiomas = Object.keys(ui);
const todas = new Set(idiomas.flatMap((l) => Object.keys(ui[l])));

const problemas = [];
for (const idioma of idiomas) {
  const faltando = [...todas].filter((k) => ui[idioma][k] === undefined);
  if (faltando.length) problemas.push({ idioma, faltando });

  const vazias = Object.entries(ui[idioma])
    .filter(([, v]) => typeof v !== 'string' || v.trim() === '')
    .map(([k]) => k);
  if (vazias.length) problemas.push({ idioma, vazias });
}

if (problemas.length === 0) {
  console.log(`i18n ok: ${todas.size} chaves em ${idiomas.length} idiomas (${idiomas.join(', ')})`);
  process.exit(0);
}

for (const p of problemas) {
  if (p.faltando) console.error(`[${p.idioma}] faltando: ${p.faltando.join(', ')}`);
  if (p.vazias) console.error(`[${p.idioma}] vazias: ${p.vazias.join(', ')}`);
}
process.exit(1);
