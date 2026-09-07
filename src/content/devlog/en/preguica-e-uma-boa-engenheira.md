---
title: "Laziness is good engineering: turning a car purchase into a data problem"
description: "I adapted a Ukrainian OLX scraper to the Brazilian site and turned a car search into a comparable dataset."
date: 2026-09-07
tags: [data, scraping, scala, car]
draft: false
---

For the past few weeks I had been meaning to replace my car, and I was stuck on the boring part: which model to look for, where to look, what counted as a fair price and what was just an optimistic listing. Scrolling through classifieds by eye was getting me nowhere.

So, being the lazy person I am, I thought: why not download every listing in my price range and settle it with a data analysis?

Looking for a starting point, I found an old scraper on GitHub built for olx.ua, the Ukrainian OLX. I adapted it to the Brazilian OLX: categories, state filters, price range, model year, mileage and pagination, all driven by a form that builds the search URL. It is written in Scala, runs on Docker and stores everything in an H2 database, with CSV export for the analysis.

One honest limitation: OLX blocks scraping on the individual listing pages, so I only collected the public catalog. That leaves out the descriptions, but it keeps what actually matters for comparing offers: model, year, price, mileage and location.

Repo: https://github.com/fsnovais/web_scraper_olx
