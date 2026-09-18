---
title: "dbt v2: what changes if you already run dbt in production"
description: "Fusion became dbt and hit GA. A Rust rewrite, a local SQL compiler, Parquet artifacts and a single engine. Which parts solve real problems in a production project, where the licensing catches are, and how I would migrate without breaking anything."
date: 2026-09-17
tags: [dbt, data-engineering, snowflake, tooling]
---

dbt Labs announced the general availability of dbt v2 yesterday, September 16, 2026. The
product name changed with it: what we had been calling the Fusion engine since the May 2025
beta is now simply **dbt**.

I maintain a Snowflake warehouse that integrates Oracle Fusion HCM and CMIC, modeled as star
schemas, with dbt in the middle and Power BI at the end. That is where I am writing from.
This is not a launch review, it is the read of someone who has to decide whether to migrate,
when, and what breaks along the way.

## This is not a version bump, it is a new engine

dbt v1 started life as an internal consulting tool: Python, Jinja and JSON. It worked far
better than it had any right to. v2 is a ground-up rewrite in Rust, 18 months of engineering,
with ADBC and the Arrow ecosystem replacing the old drivers and Parquet replacing
`manifest.json`.

Treat this like a `pip install --upgrade` and you will be surprised. It is a foundation
change, with the breakage a major version implies. The first one since the 0.x to 1.x jump
back in 2021.

## What actually interests me: the SQL compiler

This is the feature that justifies everything else.

In dbt v1 there is no way to know whether a piece of SQL is correct without sending it to the
warehouse and watching what happens. In a layered project the error does not surface where it
was born: someone renames a column in staging, the build passes there, and the break lands
three layers down, in production, at six in the morning. Anyone integrating a source system
that changes without notice, Fusion HCM being a fine example, knows this script by heart.

v2 runs static analysis locally, emulating the warehouse dialect, and catches the mistake
before any execution. The detail that sold me is sharper than "it validates syntax": dropping
a column leaves the query itself perfectly valid, and still breaks every model downstream of
it. The warehouse cannot see that, it only ever sees the query in front of it. dbt sees the
whole graph.

There are two modes: `baseline`, the default, built so that a large project can move without
hitting a wall of errors, and `strict`, with the full analysis. Baseline being the default is
the right call. Turning strict on in a mature project on day one is how you give up by the
first afternoon.

## Speed: the pretty number and the one that matters

The published benchmark uses a 10k node project: 70 seconds to parse on dbt 1.12 against 17
seconds on v2. Four times faster.

Being honest about my own case: my project does not have 10,000 models. A twenty or thirty
second parse was never my bottleneck, warehouse time on Snowflake is. The parse win, for me,
is development comfort, not a smaller bill.

Where it turns into real money is two places. First, CI: if you run dbt on every pull request,
several times a day, that 4x multiplies across every job of the week. Second, the integrated
dbt State, which skips models that already exist and clones from another schema instead of
rebuilding. That one does move warehouse consumption, and it is precisely the piece that
carries a price tag. More on that below.

## dbt Information Schema: the part I want most

`manifest.json` was always dbt's blind spot. Huge file, a bad format to query, and every team
ended up writing its own Python script to crack it open and answer governance questions.

v2 replaces it with Parquet artifacts, more than ten times smaller with `--no-write-json`, and
queryable directly through DuckDB or `dbt show --info`. That changes the class of question
that is cheap to ask:

- which columns nobody consumes and only sit in the model out of inertia
- which intermediate model has not a single test on it
- naming conventions validated in CI, as code, instead of in code review
- lineage an agent can read without me maintaining a parser

In dimensional modeling this is not a detail. A dead column in a wide dimension is real debt:
it costs storage, it costs build time, and it costs confusion in Power BI when a user finds a
field nobody owns. Answering that with a query instead of a script pays for itself.

## One engine, and what that fixes

Between May 2025 and June 2026 there were two engines: Core in Python under Apache 2.0, and
Fusion in Rust under ELv2. The community's suspicion had grounds, because the innovation was
all flowing to the closed side.

Core v2.0, in alpha since June 1, 2026, fixes that on paper. The runtime is now Apache 2.0,
written in Rust, inside the `dbt-core` repo. `dbt-fusion` was archived and the code that lived
in the private repo was opened. Same language specification across both distributions.

Same engine, though, does not mean same product. That is where I pump the brakes.

## Where I pump the brakes

**Licensing in practice.** The Fusion binary is free to install, but some capabilities want a
free login and others want a commercial agreement. The built-in linter, column-level lineage
and the VS Code extension sit on that side of the fence. Pure Core v2 is Apache 2.0 and does
not ship them. The honest question is not "is this open source?", it is "what exactly do I
lose by staying on Core?".

**Pricing inside the engine.** Datacoves reports metered billing of $0.094 per *daily unique
reuse* on dbt State. If that number holds, it is the first time usage pricing lands inside the
engine rather than only in the hosted platform. That is a category change. It deserves a line
in the budget before it becomes a dependency, and it deserves a plan B: native selectors and
state comparison handled outside dbt solve a good share of the same problem.

**Signed adapters.** The new adapter pattern requires drivers signed by dbt Labs. Snowflake,
Databricks, BigQuery and Redshift are covered, which serves most teams. If you run a niche
adapter, or maintain your own, check this item before any other, because on its own it decides
whether the migration is possible at all.

**Python models.** Still in public preview, and only on Snowflake, BigQuery and Databricks.
If you have Python models in production, this is the item that sets your timeline.

**Fivetran in the middle.** The Fivetran and dbt Labs merger is context, not gossip. When your
ingestion tool and your transformation tool become the same company, the cost of leaving goes
up. Worth designing the architecture on the assumption that in two years you may want to
replace one of them.

## How I would migrate

1. Move to **1.12 first** and clear every deprecation warning. v2 removes what 1.12 warns
   about, so this step is the real filter.
2. Run `dbt parse --use-v2-parser` against the current project. It only reads, it writes
   nothing, and it sizes the damage in minutes.
3. Run `dbt-autofix` over whatever is mechanical, and **read the diff**. Automated fixes on a
   large project deserve review, not blind trust.
4. Run v2 **in parallel in CI**, on baseline, for a few weeks, comparing output against 1.12.
   Without touching production.
5. Only then turn on `strict`, one directory at a time, starting with staging.
6. Decide between Core v2 and Fusion with the feature list in hand, not by whatever the
   installer defaults to.

Step 4 is the one most people will skip, and it is exactly the one that prevents an incident.
An engine rewritten in another language, with new static analysis semantics, will find edge
cases in your project that no benchmark contains.

## Is it worth it?

Yes, and not on day one.

The local SQL compiler kills an entire class of error that today only shows up after deploy,
and the Parquet Information Schema turns governance from a hand-maintained script into a SQL
query. Those are structural wins, not cosmetic ones. It is the first change to dbt in years
that changes the work rather than just its speed.

What I would not do is migrate production this week. GA was yesterday. Let the ecosystem find
the first round of bugs, run it in parallel, and move when the cost of migrating drops below
the cost of putting it off. I will write this again in January, with numbers from my own
project instead of theirs.

## Sources

- [dbt v2 is GA](https://docs.getdbt.com/blog/dbt-v2-is-ga), dbt Labs
- [dbt Core v2 is here](https://docs.getdbt.com/blog/dbt-core-v2-is-here), dbt Labs
- [dbt Fusion](https://datacoves.com/post/dbt-fusion), Datacoves
- [dbt quickstart guide](https://docs.getdbt.com/guides/dbt?step=1), dbt Labs
