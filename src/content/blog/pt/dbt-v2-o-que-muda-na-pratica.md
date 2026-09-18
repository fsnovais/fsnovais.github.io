---
title: "dbt v2: o que muda para quem já roda dbt em produção"
description: "O Fusion virou dbt e chegou ao GA. Reescrita em Rust, compilador SQL local, artefatos em Parquet e uma engine só. O que disso resolve problema real de projeto em produção, onde estão as pegadinhas de licença e como eu migraria sem quebrar nada."
date: 2026-09-17
tags: [dbt, engenharia-de-dados, snowflake, ferramentas]
---

A dbt Labs anunciou ontem, 16 de setembro de 2026, a disponibilidade geral do dbt v2. O
nome comercial mudou junto: o que a gente chamava de Fusion engine desde o beta de maio de
2025 agora se chama simplesmente **dbt**.

Eu mantenho um data warehouse em Snowflake que integra Oracle Fusion HCM e CMIC, modelado
em estrela, com dbt no meio e Power BI na ponta. É desse lugar que escrevo. Não é review de
lançamento, é a leitura de quem vai ter que decidir se migra, quando migra e o que quebra.

## Não é upgrade de versão, é troca de motor

O dbt v1 nasceu como ferramenta interna de consultoria: Python, Jinja e JSON. Funcionou
bem demais para o que era. O v2 é reescrita do zero em Rust, com 18 meses de engenharia,
ADBC e o ecossistema Arrow no lugar dos drivers antigos, e Parquet no lugar do
`manifest.json`.

Quem tratar isso como um `pip install --upgrade` vai se surpreender. É mudança de
fundação, com a quebra de compatibilidade que um major version traz. A primeira desde a
virada de 0.x para 1.x, em 2021.

## O que me interessa de verdade: o compilador SQL

Esse é o item que justifica o resto.

No dbt v1 não existe forma de saber se um SQL está certo sem mandar para o warehouse e ver
o que acontece. Em projeto com camadas, o erro não aparece onde nasceu: alguém renomeia uma
coluna na staging, o build passa nela, e a quebra estoura três camadas abaixo, em produção,
às seis da manhã. Quem integra sistema de origem que muda sem avisar, como Fusion HCM,
conhece esse roteiro de cor.

O v2 faz análise estática local, emulando o dialeto do banco, e pega o erro antes de
qualquer execução. O detalhe que me convenceu é mais fino que "valida sintaxe": remover uma
coluna deixa a query válida em si mesma, e ainda assim quebra os modelos que dependem dela.
O warehouse não tem como enxergar isso, ele só vê a query da vez. O dbt vê o grafo inteiro.

São dois modos: `baseline`, o padrão, feito para projeto grande entrar sem parede de erro,
e `strict`, com a análise completa. O padrão ser o baseline é a decisão certa. Ligar strict
em um projeto maduro no primeiro dia é receita para desistir na primeira tarde.

## Velocidade: o número bonito e o número que importa

O benchmark divulgado é de projeto com 10 mil nós: parse de 70 segundos no dbt 1.12 contra
17 segundos no v2. Quatro vezes mais rápido.

Sendo honesto com o meu caso: meu projeto não tem 10 mil modelos. Parse de vinte ou trinta
segundos nunca foi meu gargalo, meu gargalo é tempo de warehouse no Snowflake. O ganho de
parse, para mim, é conforto de desenvolvimento, não redução de fatura.

Onde isso vira dinheiro de verdade é em dois lugares. Primeiro, CI: quem roda dbt a cada
pull request, várias vezes por dia, multiplica esse 4x por todo job da semana. Segundo, o
dbt State integrado, que pula modelo já existente e clona de outro schema em vez de
reconstruir. Esse sim mexe no consumo do warehouse, e é justamente a peça que tem preço.
Volto nela.

## dbt Information Schema: a parte que eu mais quero

O `manifest.json` sempre foi o ponto cego do dbt. Arquivo gigante, formato ruim para
consulta, e todo time acabou escrevendo o próprio script Python para abrir aquilo e
responder pergunta de governança.

O v2 troca por artefatos em Parquet, mais de dez vezes menores com `--no-write-json`, e
consultáveis direto com DuckDB ou via `dbt show --info`. Isso muda a classe de pergunta que
sai barato:

- que colunas ninguém consome e estão no modelo só por inércia
- que modelo de camada intermediária não tem um único teste
- convenção de nome validada no CI, como código, em vez de no code review
- lineage que um agente consegue ler sem eu manter parser

Em modelagem dimensional isso não é detalhe. Coluna morta em dimensão larga é dívida real:
custa storage, custa tempo de build, e custa confusão no Power BI quando o usuário acha um
campo que ninguém mantém. Poder responder isso com uma query, e não com um script, é ganho
que se paga sozinho.

## Uma engine só, e o que isso resolve

Entre maio de 2025 e junho de 2026 existiram dois motores: Core em Python sob Apache 2.0, e
Fusion em Rust sob ELv2. A desconfiança da comunidade tinha fundamento, porque a inovação
estava indo toda para o lado fechado.

O Core v2.0, em alpha desde 1º de junho de 2026, resolve isso no papel. O runtime passou a
ser Apache 2.0, escrito em Rust, dentro do repo `dbt-core`. O `dbt-fusion` foi arquivado e o
código que vivia no repo privado foi aberto. Mesma especificação de linguagem nas duas
distribuições.

Mesmo motor, porém, não significa mesmo produto. E é aí que eu freio.

## Onde eu freio

**Licenciamento na prática.** O binário Fusion é gratuito para instalar, mas parte das
capacidades pede login gratuito e outra parte pede contrato comercial. Linter embutido,
column-level lineage e a extensão de VS Code ficam desse lado da cerca. O Core v2 puro é
Apache 2.0 e não tem essas peças. A pergunta honesta não é "isso é open source?", é "o que
exatamente eu perco se ficar só no Core?".

**Preço dentro do motor.** A Datacoves aponta cobrança medida de US$ 0,094 por *daily
unique reuse* no dbt State. Se o número estiver certo, é a primeira vez que preço por uso
aparece dentro da engine, e não apenas na plataforma hospedada. Isso é mudança de
categoria. Merece uma linha no orçamento antes de virar dependência, e merece um plano B:
seletores nativos e state comparison feito por fora resolvem boa parte do mesmo problema.

**Adapters assinados.** O novo padrão exige driver assinado pela dbt Labs. Snowflake,
Databricks, BigQuery e Redshift estão cobertos, o que atende a maioria dos times. Quem usa
adapter de nicho, ou mantém um adapter próprio, precisa checar esse item antes de qualquer
outro, porque ele decide sozinho se a migração é possível.

**Modelos Python.** Continuam em public preview e só em Snowflake, BigQuery e Databricks.
Quem tem modelo Python em produção tem aqui o item que segura o cronograma.

**Fivetran no meio.** A fusão entre Fivetran e dbt Labs é contexto, não fofoca. Quando a
ferramenta de ingestão e a de transformação viram a mesma empresa, o custo de sair sobe.
Vale desenhar a arquitetura assumindo que em dois anos você pode querer trocar uma das
duas.

## Como eu migraria

1. Subir para o **1.12 primeiro** e zerar todo deprecation warning. O v2 remove o que o
   1.12 avisa, então essa etapa é o filtro real.
2. Rodar `dbt parse --use-v2-parser` no projeto atual. É leitura, não escreve nada, e já
   devolve o tamanho do estrago em minutos.
3. Passar o `dbt-autofix` no que for mecânico, e **revisar o diff**. Correção automática em
   projeto grande merece leitura, não confiança cega.
4. Rodar o v2 **em paralelo no CI**, em baseline, por algumas semanas, comparando resultado
   com o 1.12. Sem tocar em produção.
5. Só depois ligar `strict`, um diretório por vez, começando pela staging.
6. Decidir Core v2 contra Fusion com a lista de features na mão, não por default de
   instalação.

O passo 4 é o que a maioria vai pular, e é exatamente o que evita incidente. Motor
reescrito em outra linguagem, com semântica nova de análise estática, vai achar caso de
borda no seu projeto que benchmark nenhum tem.

## Vale?

Vale, e não no primeiro dia.

O compilador SQL local resolve uma classe inteira de erro que hoje só aparece depois do
deploy, e o Information Schema em Parquet transforma governança de script mantido a mão em
consulta SQL. São ganhos estruturais, não cosméticos. É a primeira mudança no dbt em anos
que muda o trabalho, e não só a velocidade dele.

O que eu não faria é migrar produção nesta semana. O GA é de ontem. Deixa o ecossistema
encontrar os primeiros bugs, roda em paralelo, e entra quando o custo de migrar for menor
que o custo de continuar adiando. Em janeiro eu escrevo de novo, com número do meu projeto
em vez do benchmark deles.

## Fontes

- [dbt v2 is GA](https://docs.getdbt.com/blog/dbt-v2-is-ga), dbt Labs
- [dbt Core v2 is here](https://docs.getdbt.com/blog/dbt-core-v2-is-here), dbt Labs
- [dbt Fusion](https://datacoves.com/post/dbt-fusion), Datacoves
- [Guia de início do dbt](https://docs.getdbt.com/guides/dbt?step=1), dbt Labs
