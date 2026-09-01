# fsnovais.github.io

Site pessoal de Felipe Novais, construido em [Astro](https://astro.build) e publicado no
GitHub Pages.

Site estatico puro: nenhum JavaScript de framework chega ao navegador. As tres partes
interativas (menu mobile, filtro de projetos e formulario de contato) sao scripts
proprios de poucas linhas.

## Rodar localmente

```sh
npm install
npm run dev
```

Abre em http://localhost:4321.

Para conferir o resultado final antes de publicar:

```sh
npm run build
npm run preview
```

## Idiomas

O site sai em portugues e ingles. Portugues e o padrao e fica na raiz (`/`);
ingles fica em `/en/`. Nao ha redirecionamento automatico por navegador.

O endereco tambem e traduzido, nao so o texto:

| Pagina | Portugues | Ingles |
| --- | --- | --- |
| Home, feed de textos | `/` | `/en/` |
| Blog | `/blog` | `/en/blog` |
| Devlog | `/devlog` | `/en/devlog` |
| Projetos | `/projetos` | `/en/projects` |
| Sobre | `/sobre` | `/en/about` |

O mapa fica em `src/i18n/routes.js`. Nenhum endereco aparece fixo em componente:
tudo sai de `rota(chave, idioma)`, e o botao de idioma sabe levar de `/sobre` para
`/en/about` porque consulta o mesmo mapa.

Blog e devlog mantem o mesmo nome nos dois idiomas de proposito: e o que faz o slug
de um post ser identico nas duas versoes, e por isso o botao de idioma dentro de um
post acha a traducao.

Para inverter o padrao no futuro, mude `defaultLocale` em `astro.config.mjs` e
`defaultLang` em `src/i18n/ui.js`, e mova as pastas de rota. Nenhum prefixo de
idioma aparece fixo no codigo: tudo sai de `localizedPath()`.

O controle de idioma no cabecalho mostra os DOIS codigos, com o idioma da pagina
aceso em ambar. Assim da para ver de relance em que idioma voce esta, e o outro
codigo e o link para trocar.

Todo texto de interface vive em `src/i18n/ui.js`, uma chave por string, nos dois
idiomas. Para adicionar uma frase, coloque a mesma chave nos dois blocos. Chave que
falte em `pt` cai no ingles em vez de sumir da tela.

Nos arquivos de dados (`src/data/projects.js` e `src/data/site.js`), qualquer campo
de texto aceita `{ en, pt }`. Campos que nao mudam com o idioma, como o nome de uma
tecnologia, continuam sendo string simples.

O texto da pagina Sobre fica separado, em `src/i18n/about.js`, porque e o unico
lugar com paragrafos longos.

As tags `hreflang` sao geradas sozinhas em cada pagina, incluindo `x-default`
apontando para o ingles, entao o Google entende que sao a mesma pagina em dois
idiomas e nao trata como conteudo duplicado.

### Posts nos dois idiomas

O idioma de um post vem da PASTA, nao do frontmatter:

```
src/content/blog/pt/meu-post.md   ->  /blog/meu-post
src/content/blog/en/meu-post.md   ->  /en/blog/meu-post
```

O **mesmo nome de arquivo** nas duas pastas significa que um texto e traducao do
outro. Com isso, o botao de idioma dentro de um post leva direto para a versao
correspondente, e as tags `hreflang` do par sao geradas sozinhas.

O corpo do texto e escrito de verdade nos dois idiomas, nao traduzido pelo
navegador: sao dois arquivos markdown.

**Se voce escrever so num idioma**, nada quebra. O texto aparece na listagem do
outro idioma com um selo dizendo "so em portugues" (ou "only in English"), o link
leva para a versao que existe, a pagina nao ganha `hreflang` prometendo um par que
nao existe, e o botao de idioma naquele post leva para a listagem do outro idioma
em vez de uma pagina inexistente.

## Icone do site

O monograma FN em ambar sobre fundo escuro, a mesma marca do cabecalho. Os
arquivos ficam em `public/`:

| Arquivo | Onde e usado |
| --- | --- |
| `icon.svg` | aba do navegador moderno, nitido em qualquer tela |
| `favicon.ico` | 16, 32 e 48 px, para quem nao suporta SVG |
| `apple-touch-icon.png` | 180 px, atalho na tela inicial do iOS |
| `icon-192.png` e `icon-512.png` | manifest, instalacao como app |

Para trocar, substitua os arquivos em `public/` mantendo os nomes.
O SVG tem as letras em contorno, nao em texto, entao nao depende de fonte instalada.

## Tema

Botao no cabecalho alterna claro e escuro. Sem escolha salva, o site segue o
`prefers-color-scheme` do sistema. A escolha vai para o `localStorage` e vale para
as proximas visitas.

Um script pequeno roda no `<head>`, antes da primeira pintura, aplicando o tema
salvo. Sem ele, quem escolheu claro veria um lampejo escuro a cada navegacao.

## Como o site esta organizado

A home e o feed de textos, nao um cartao de visita. Quem chega ve o que voce
escreveu primeiro, e o resto fica a um clique.

| Pagina | O que faz |
| --- | --- |
| Home | intro de duas linhas, os 6 textos mais recentes de blog e devlog juntos, e tres atalhos |
| Blog e Devlog | arquivo completo de cada secao |
| Projetos | grade com filtro por area, em pagina propria |
| Sobre | pagina pessoal: de onde voce vem, o que te interessa, com link para o curriculo e o formulario de contato no fim |

Quatro decisoes de estrutura, todas para tirar duplicacao:

- **O Sobre e uma pagina pessoal, nao um curriculo em prosa.** Ela conta de onde
  voce vem, o que te prende a atencao e o que voce escreve aqui. Quem chegou atras
  de carreira segue para o PDF e para os projetos, que e onde esse dado esta de
  verdade. O cargo aparece so num paragrafo curto perto do fim
- **Nao existe secao de Skills.** Ela repetia o que ja esta no curriculo e nos
  projetos. A lista de tecnologias sobreviveu apenas como `knowsAbout` em
  `src/data/site.js`, usada no JSON-LD para buscadores, sem ocupar tela
- **O formulario de contato** mora no fim do Sobre: quem leu sobre voce e quem
  quer falar com voce
- **A pagina `/links` deixou de existir**. Ela repetia GitHub, LinkedIn, blog e
  devlog, que ja estao no menu e no rodape. O unico conteudo exclusivo dela, o
  curriculo, virou um botao no Sobre. O caminho do PDF sai de `cv` em
  `src/data/site.js`; deixar esse campo vazio esconde o botao e o link do rodape.
  Para trocar o arquivo, substitua `public/arquivos/felipe-novais-cv.pdf`
  mantendo o nome

## Curriculo

O PDF nao e um arquivo solto: a fonte dele e `cv/curriculo.html`, versionada
junto com o resto. Edite o HTML e gere o PDF de novo:

```sh
npm run cv
```

Precisa do Playwright (`npm i -D playwright && npx playwright install chromium`).
Sem ele, abra `cv/curriculo.html` no navegador e use Ctrl+P > Salvar como PDF com
margens padrao, salvando em `public/arquivos/felipe-novais-cv.pdf`. O CSS ja define
tamanho de pagina e margens, entao o resultado e o mesmo.

Ao mudar o curriculo, revise `src/i18n/about.js` junto: a pagina Sobre conta a
mesma historia em prosa, e os dois nao devem divergir.

**O telefone fica fora do PDF de proposito.** O arquivo e servido publicamente, e
numero de telefone e o dado que mais atrai raspador. O e-mail fica, porque
recrutador espera um canal direto de resposta

## Estrutura

| Caminho | O que tem |
| --- | --- |
| `src/pages/` | Rotas em portugues na raiz e em ingles sob `en/`. Arquivos finos: cada um so escolhe a secao e o layout. |
| `src/sections/` | O conteudo de cada pagina, compartilhado pelos dois idiomas: `HomeFeed`, `PostsIndex`, `ProjectsPage`, `AboutPage` e `NotFound`. |
| `src/i18n/` | `ui.js` (strings da interface), `about.js` (texto da pagina Sobre), `routes.js` (mapa de enderecos por idioma) e `utils.js`. |
| `src/content/blog/{en,pt}/` | Posts do blog, uma pasta por idioma. |
| `src/content/devlog/{en,pt}/` | Notas do devlog, uma pasta por idioma. |
| `src/content.config.ts` | Schema do frontmatter, uma colecao por secao e por idioma. Post com campo errado quebra o build. |
| `src/layouts/` | `BaseLayout.astro` com o `<head>` completo (SEO, Open Graph, Twitter Card, JSON-LD e hreflang) e `PostLayout.astro` para os textos. |
| `src/components/` | `Header`, `Footer`, `Contact`, `Projects`, `PostList`, `LangToggle` e `ThemeToggle`. |
| `src/data/` | Conteudo separado da marcacao: `site.js` (marca, menu, redes, curriculo) e `projects.js`. |
| `src/lib/` | Funcoes de apoio: `posts.js` (listagem e pareamento de traducoes) e `og.js` (imagens de compartilhamento). |
| `src/pages/og/` | Rota que desenha os cartoes 1200x630 no build. |
| `src/styles/tokens.css` | Sistema de design. Toda cor, tamanho e espacamento sai daqui. |
| `src/styles/global.css` | Reset, tipografia e utilitarios. |
| `src/assets/img/` | Imagens processadas pelo Astro (viram WebP no build). |
| `public/` | Servido como esta: icones, manifest, robots, o curriculo em PDF e a imagem de compartilhamento padrao. |
| `cv/` | `curriculo.html`, a fonte do PDF. |
| `scripts/` | As guardas e os atalhos de linha de comando. |
| `.github/workflows/deploy.yml` | Build e publicacao no GitHub Pages. |

## Editar conteudo

Nao e preciso mexer em componente para atualizar o site.

- **Marca, menu, redes e curriculo**: `src/data/site.js`
- **Projetos**: `src/data/projects.js`
- **Texto da pagina Sobre**: `src/i18n/about.js`
- **Qualquer outra frase da interface**: `src/i18n/ui.js`

Nos projetos, cada item aceita `title`, `description`, `tags`, `image`, `url`, `category`
e, opcionalmente, `video` para um card animado. A ordem das categorias em `categories`
manda na ordem do filtro. Cada descricao deve dizer o problema resolvido, nao a stack,
que ja aparece em `tags`.

Para adicionar uma imagem nova, coloque em `src/assets/img/` e importe no arquivo de
dados. O Astro cuida de redimensionar, converter para WebP e versionar.

## Escrever um post

### O caminho curto

```sh
npm run post -- blog meu-post          # so em portugues
npm run post -- devlog nota --en       # so em ingles
npm run post -- blog meu-post --ambos  # os dois idiomas
```

O comando cria o arquivo com o frontmatter preenchido, a data de hoje e
`draft: true`, e imprime o endereco onde o post vai aparecer. Ele nunca
sobrescreve um arquivo que ja existe.

Depois: ajuste `title` e `description`, escreva, rode `npm run dev` para conferir,
e troque `draft` para `false` quando quiser publicar.

### O que o comando faz por baixo

Cria um markdown na pasta do idioma. O nome do arquivo vira o endereco:

```
src/content/blog/pt/meu-post.md   ->  /blog/meu-post
src/content/blog/en/meu-post.md   ->  /en/blog/meu-post
```

```md
---
title: "Titulo do post"
description: "Uma frase que aparece na listagem, no Google e na imagem de compartilhamento."
date: 2026-09-01
tags: [dbt, snowflake]
draft: true
---

Texto do post em markdown.
```

Use aspas em `title` e `description`: sem elas, um dois-pontos no meio da frase
quebra o YAML. O `date` aceita `AAAA-MM-DD`.

Nao existe campo `lang`: o idioma vem da pasta em que o arquivo esta.

Com `draft: true`, o post aparece em `npm run dev` e fica de fora do build de
producao. E util para ir escrevendo sem publicar.

O schema e validado no build. Se faltar um campo ou a data estiver errada, o build
falha com a mensagem exata, em vez de publicar um post quebrado.

## Imagens de compartilhamento

Nenhuma imagem precisa ser feita a mao. Todo post ganha um cartao 1200x630 desenhado no
build a partir do titulo e da descricao, em `src/lib/og.js`, usando as mesmas cores do
tema. O tamanho do titulo se ajusta sozinho ao comprimento.

Para conferir, abra `/og/blog/nome-do-post.png` depois do build.

## RSS

Quatro feeds: uma secao por idioma, porque nem todo leitor quer as duas secoes e
ninguem quer receber texto numa lingua que nao le.

- `/rss/en/blog.xml` e `/rss/en/devlog.xml`
- `/rss/pt/blog.xml` e `/rss/pt/devlog.xml`

O `<head>` de cada pagina anuncia os feeds do idioma daquela pagina, entao um leitor
acha sozinho a partir do endereco do site. E o mesmo mecanismo que serve para ligar uma
newsletter automatica depois: servicos como Buttondown enviam um email a cada item novo
do feed.

## Formulario de contato

Usa [StaticForms](https://www.staticforms.xyz/). A chave nao fica no codigo:

1. Copie `.env.example` para `.env` e preencha `PUBLIC_STATICFORMS_KEY`
2. No GitHub, cadastre o mesmo valor em **Settings > Secrets and variables > Actions**

O formulario tem um campo escondido como armadilha de spam. Se vier preenchido, o envio
e descartado sem chamar a API.

## Deploy

Automatico. Todo push na `main` dispara `.github/workflows/deploy.yml`, que roda
`npm ci`, a guarda de traducao, o build, a guarda de links, e publica o `dist/` no
GitHub Pages. Nada e enviado a mao, e nao existe branch de build: a `gh-pages` do site
antigo em Create React App nao e mais usada.

O workflow tambem aceita disparo manual em **Actions > Deploy no GitHub Pages >
Run workflow**, util para republicar sem mudar codigo.

### Antes do primeiro deploy

1. **Settings > Pages > Source**: troque de "Deploy from a branch" para
   **GitHub Actions**. Sem isso o site continua servindo o build antigo
2. **Settings > Secrets and variables > Actions**: cadastre `PUBLIC_STATICFORMS_KEY`
   com o mesmo valor do seu `.env`. O build passa sem ela, mas o formulario de contato
   sobe avisando que esta sem chave
3. Rode `npm run verify` local. E exatamente a mesma sequencia do CI, entao o que
   passa aqui passa la

### Quando o deploy falha

| Onde quebrou | Quase sempre e |
| --- | --- |
| `npm ci` | `package-lock.json` fora de sincronia. Rode `npm install`, commite o lock |
| Conferir traducao | chave presente num idioma e ausente no outro. O script diz qual |
| Conferir links | link interno ou ancora quebrada no HTML gerado. O script diz o arquivo |
| Verde, mas o site esta velho | o passo 1 acima nao foi feito, ou e cache do navegador |

O build roda em `ubuntu-latest`, e o `package-lock.json` guarda os binarios nativos
de todas as plataformas. Um lock gerado no Windows funciona no CI sem ajuste.

## Comandos

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor local em http://localhost:4321, com rascunhos visiveis |
| `npm run build` | Guarda de traducao e build de producao em `dist/` |
| `npm run preview` | Serve o `dist/` ja construido |
| `npm run verify` | Traducao, build e links. Rode antes de dar push |
| `npm run post` | Cria um post novo com o frontmatter pronto |
| `npm run cv` | Gera o PDF do curriculo a partir de `cv/curriculo.html` |
| `npm run check` | `astro check`, tipos e diagnosticos |

## Guardas automaticas

`npm run verify` roda as tres de uma vez: traducao, build e links.

### Traducao

`npm run check:i18n` confere que os dois idiomas tem exatamente as mesmas chaves,
e nenhuma vazia. Roda automatico antes de todo `npm run build` e no CI.

Existe porque chave faltando nao quebra o build sozinha: ela cai no fallback e, no
pior caso, aparece crua na tela, como `home.lede`. Aconteceu uma vez aqui.

### Links e ancoras

`npm run check:links` confere o HTML ja gerado em `dist/`: title, description,
canonical, og:image apontando para arquivo que existe, um unico `h1` por pagina,
hierarquia de titulos sem pular degrau, links internos, e **ancoras**.

A checagem de ancora existe por um bug real: `/#contato` continuou apontando para a
home depois que o formulario mudou para a pagina Sobre. Esse tipo de link nao
quebra de forma visivel, ele leva a uma pagina que existe, so que sem o destino.
Agora o build falha quando isso acontece.

## Acessibilidade

O site passa em WCAG 2.1 AA nos dois temas, verificado com axe-core nas seis rotas
principais. As cores de texto em `tokens.css` foram calculadas para bater o contraste
minimo de 4.5:1 tambem sobre as superficies dos cards, nao so sobre o fundo.

Se voce trocar uma cor, refaca a conta antes de publicar. O token `--on-accent` existe
justamente para isso: e a cor do texto que fica POR CIMA do acento, e ela vira com o
tema (quase preto no escuro, branco no claro).

Os dois temas saem dos mesmos tokens em `src/styles/tokens.css`, entao mudar uma cor
muda os dois de forma consistente.
