import fs from 'node:fs';
import path from 'node:path';
import satori from 'satori';
import sharp from 'sharp';

export const OG_LARGURA = 1200;
export const OG_ALTURA = 630;

// Cores tiradas do tema escuro em src/styles/tokens.css.
const BG = '#0c0f13';
const BORDA = '#232b35';
const TEXTO = '#e7ecf2';
const SUAVE = '#9aa7b6';
const FRACO = '#697687';
const ACENTO = '#e8b04b';

const raizFontes = path.join(
  process.cwd(),
  'node_modules/@fontsource/ibm-plex-sans/files'
);

function carregarFonte(peso) {
  return fs.readFileSync(
    path.join(raizFontes, `ibm-plex-sans-latin-${peso}-normal.woff`)
  );
}

const fontes = [
  { name: 'Plex', data: carregarFonte(400), weight: 400, style: 'normal' },
  { name: 'Plex', data: carregarFonte(600), weight: 600, style: 'normal' },
  { name: 'Plex', data: carregarFonte(700), weight: 700, style: 'normal' },
];

/**
 * Escala o título conforme o comprimento, para título longo não estourar o cartão.
 */
function tamanhoDoTitulo(titulo) {
  const n = titulo.length;
  if (n <= 28) return 76;
  if (n <= 45) return 64;
  if (n <= 70) return 54;
  return 46;
}

function recortar(texto, max) {
  if (!texto || texto.length <= max) return texto ?? '';
  return texto.slice(0, max).replace(/\s+\S*$/, '') + '...';
}

/**
 * Monta o cartão. Sem gradiente, coerente com o tema do site:
 * fundo quase preto, uma régua de acento no topo e hierarquia de texto clara.
 */
function montar({ eyebrow, titulo, descricao, rodape }) {
  return {
    type: 'div',
    props: {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: BG,
        padding: '72px 80px',
        fontFamily: 'Plex',
        borderTop: `10px solid ${ACENTO}`,
      },
      children: [
        {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column' },
            children: [
              eyebrow && {
                type: 'div',
                props: {
                  style: {
                    fontSize: 24,
                    fontWeight: 600,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: ACENTO,
                    marginBottom: 28,
                  },
                  children: eyebrow,
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: tamanhoDoTitulo(titulo),
                    fontWeight: 700,
                    lineHeight: 1.14,
                    letterSpacing: '-0.02em',
                    color: TEXTO,
                  },
                  children: recortar(titulo, 110),
                },
              },
              descricao && {
                type: 'div',
                props: {
                  style: {
                    fontSize: 28,
                    lineHeight: 1.45,
                    color: SUAVE,
                    marginTop: 28,
                  },
                  children: recortar(descricao, 130),
                },
              },
            ].filter(Boolean),
          },
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: `1px solid ${BORDA}`,
              paddingTop: 28,
            },
            children: [
              {
                type: 'div',
                props: {
                  style: { display: 'flex', alignItems: 'center' },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 44,
                          height: 44,
                          border: `1px solid ${ACENTO}`,
                          borderRadius: 8,
                          color: ACENTO,
                          fontSize: 18,
                          fontWeight: 600,
                          marginRight: 18,
                        },
                        children: 'FN',
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        style: { fontSize: 26, fontWeight: 600, color: TEXTO },
                        children: 'Felipe Novais',
                      },
                    },
                  ],
                },
              },
              {
                type: 'div',
                props: {
                  style: { fontSize: 22, color: FRACO },
                  children: rodape ?? 'fsnovais.github.io',
                },
              },
            ],
          },
        },
      ],
    },
  };
}

/** Devolve o PNG do cartão pronto para virar resposta de endpoint. */
export async function gerarOg(opcoes) {
  const svg = await satori(montar(opcoes), {
    width: OG_LARGURA,
    height: OG_ALTURA,
    fonts: fontes,
  });

  return sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
}
