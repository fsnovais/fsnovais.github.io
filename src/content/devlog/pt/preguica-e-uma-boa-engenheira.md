---
title: "Preguiça é uma boa engenheira: como virei a compra de um carro em análise de dados"
description: "Adaptei um coletor da OLX ucraniana para a brasileira e virei a busca por carro em base de anúncios comparáveis."
date: 2026-09-07
tags: [dados, scraping, scala, carro]
draft: false
---

Nas últimas semanas eu estava querendo trocar de carro e travado na parte chata: qual modelo procurar, onde procurar, o que era preço justo e o que era anúncio otimista. Rolar página de classificado no olho não me levava a lugar nenhum.

Então, como um bom preguiçoso, pensei: por que não baixar todos os anúncios da faixa de preço que eu quero e resolver isso com uma análise de dados?

Procurando referência, achei um coletor antigo no GitHub feito para a olx.ua, a OLX ucraniana. Adaptei para a OLX brasileira: categorias, filtros de estado, faixa de preço, ano, quilometragem e paginação, tudo montado por um formulário que gera a URL de busca. É Scala, roda em Docker e grava em um banco H2, com exportação em CSV para a análise.

Uma limitação honesta: a OLX bloqueia scraping das páginas de anúncio, então coletei só o catálogo público de listagem. Ficou sem as descrições, mas sobrou o que importa para comparar oferta: modelo, ano, preço, quilometragem e localização.

Repositório: https://github.com/fsnovais/web_scraper_olx
