import fs from 'node:fs';
import path from 'node:path';
import satori from 'satori';
import sharp from 'sharp';

export const OG_LARGURA = 1200;
export const OG_ALTURA = 630;

/*
  O cartão de compartilhamento é a janela do site em miniatura: barra de título,
  comando, saída. Cores do tema amber, em src/styles/tokens.css.

  A fonte é IBM Plex Mono e não JetBrains Mono porque o satori lê woff e ttf,
  e a JetBrains variável só é distribuída em woff2. Nas dimensões de um cartão
  as duas se comportam igual; quem olha vê um terminal, que é o objetivo.
*/
const BG = '#0b0e12';
const BARRA = '#101419';
const BORDA = '#232b35';
const BORDA_FORTE = '#3a4553';
const TEXTO = '#e6ecf3';
const SUAVE = '#a2b0c0';
const FRACO = '#8494a6';
const ACENTO = '#ffb043';

const raizFontes = path.join(
  process.cwd(),
  'node_modules/@fontsource/ibm-plex-mono/files'
);

function carregarFonte(peso) {
  return fs.readFileSync(
    path.join(raizFontes, `ibm-plex-mono-latin-${peso}-normal.woff`)
  );
}

const fontes = [
  { name: 'Mono', data: carregarFonte(400), weight: 400, style: 'normal' },
  { name: 'Mono', data: carregarFonte(500), weight: 500, style: 'normal' },
  { name: 'Mono', data: carregarFonte(700), weight: 700, style: 'normal' },
];

/** Monoespaçado é largo: o título encolhe mais cedo do que encolheria num sans. */
function tamanhoDoTitulo(titulo) {
  const n = titulo.length;
  if (n <= 24) return 62;
  if (n <= 40) return 52;
  if (n <= 62) return 44;
  return 38;
}

function recortar(texto, max) {
  if (!texto || texto.length <= max) return texto ?? '';
  return texto.slice(0, max).replace(/\s+\S*$/, '') + '...';
}

const div = (style, children) => ({ type: 'div', props: { style, children } });

/** Os três quadros da barra de título, iguais aos do cabeçalho do site. */
function quadros() {
  return div(
    { display: 'flex', gap: 8 },
    /* o satori exige display explícito em qualquer nó com lista de filhos,
       mesmo quando a lista está vazia, como é o caso destes quadrados */
    [0, 1, 2].map(() =>
      div({ display: 'flex', width: 12, height: 12, border: `1px solid ${BORDA_FORTE}` }, '')
    )
  );
}

function montar({ eyebrow, titulo, descricao, rodape }) {
  const comando = eyebrow ? `cat ~/log/${eyebrow.toLowerCase()}` : 'cat ~/log';

  return div(
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: BG,
      fontFamily: 'Mono',
    },
    [
      // barra de título da janela
      div(
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 56,
          padding: '0 32px',
          backgroundColor: BARRA,
          borderBottom: `1px solid ${BORDA}`,
        },
        [
          div({ display: 'flex', alignItems: 'center', fontSize: 20 }, [
            div({ display: 'flex', color: SUAVE }, 'felipe@log'),
            div({ display: 'flex', color: FRACO }, ':'),
            div({ display: 'flex', color: ACENTO }, rodape ?? '~'),
          ]),
          quadros(),
        ]
      ),

      // corpo: comando e saída
      div(
        {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexGrow: 1,
          padding: '48px 64px 40px',
        },
        [
          div({ display: 'flex', flexDirection: 'column' }, [
            div(
              { display: 'flex', fontSize: 24, marginBottom: 32 },
              [
                div({ display: 'flex', color: ACENTO, marginRight: 12 }, '$'),
                div({ display: 'flex', color: FRACO }, comando),
              ]
            ),
            div(
              {
                display: 'flex',
                fontSize: tamanhoDoTitulo(titulo),
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                color: TEXTO,
              },
              recortar(titulo, 96)
            ),
            descricao
              ? div(
                  {
                    display: 'flex',
                    fontSize: 24,
                    lineHeight: 1.5,
                    color: SUAVE,
                    marginTop: 28,
                  },
                  recortar(descricao, 116)
                )
              : div({ display: 'flex' }, ''),
          ]),

          // rodapé: a marca e o endereço, separados por uma régua
          div(
            {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: `1px solid ${BORDA}`,
              paddingTop: 24,
            },
            [
              div({ display: 'flex', alignItems: 'center' }, [
                div(
                  {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    border: `1px solid ${ACENTO}`,
                    color: ACENTO,
                    fontSize: 18,
                    fontWeight: 700,
                    marginRight: 16,
                  },
                  '>_'
                ),
                div(
                  { display: 'flex', fontSize: 24, fontWeight: 500, color: TEXTO },
                  'Felipe.log'
                ),
              ]),
              div({ display: 'flex', fontSize: 20, color: FRACO }, 'fsnovais.github.io'),
            ]
          ),
        ]
      ),
    ]
  );
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
