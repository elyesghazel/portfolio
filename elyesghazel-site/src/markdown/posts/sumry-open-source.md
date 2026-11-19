---
title: I open-sourced my finance app
date: 2026-11-19
summary: Sumry, the finance tracker I use every day, is now open source under the AGPL. You can host it yourself with one compose file, install it on Android or as a web app on iPhone, or ask me for a spot on the hosted version.
tags: [Sumry, open source, self-hosted, personal finance, AGPL]
cover: /sumry-today.png
---

> [!tldr] [Sumry](https://github.com/elyesghazel/sumry-backend) is the finance tracker I built for myself: one number for what you can spend today, planned bills, budgets and Swiss bank statement import. As of today the API, the web app and the Android app are open source under the [AGPL](https://en.wikipedia.org/wiki/GNU_Affero_General_Public_License). Self-hosting takes one compose file, and there is a small hosted version on invite.

## Why it exists

I track every franc I spend. The apps I tried either wanted my bank login, showed me twenty charts, or told me what I spent last month when I wanted to know **what I can spend today**. So I built Sumry: one number at the top, what is free until the next salary after rent, bills and savings that are still due.

```gallery
/sumry-today.png | The Today screen | Invented demo data from the seed script in the repo, not my account.
```

Everything else feeds that number:

- **Plan.** Rent, salary and savings transfers that book themselves on the day or wait for a tap, budgets with a start day and rollover, savings goals.
- **Quick add.** One line of text: `12.50 lunch cash yesterday`.
- **Statement import.** PostFinance PDF, [camt.053](https://en.wikipedia.org/wiki/ISO_20022) from any Swiss bank, and CSV. You check every row before anything is saved, and account numbers are masked.
- **No bank login, no tracking, no ads.** Export everything as CSV or JSON, and deleting your account actually deletes it.

There is a web app, an Android app, and a Kotlin API behind both. On iPhone the web app installs as a [PWA](https://en.wikipedia.org/wiki/Progressive_web_app) from Safari.

## Why open source

Sumry holds the most private data I have. I'd rather people can read exactly what happens to theirs than take my word for it. And a finance app you can run on your own server is one that can't disappear on you.

The code is free under the AGPL: self-host it, change it, use it commercially. If you change it and run it as a service for others, you publish your changes. The name and the logo stay mine ([TRADEMARK.md](https://github.com/elyesghazel/sumry-backend/blob/main/TRADEMARK.md)), so a fork needs its own.

## Making a private repo public

The repos were a year of commits on my own Git server, starting November 2025. Before pushing them to GitHub:

- **Authors.** Commits came from nine different name and email combinations, including my work email. All of them are now one author.
- **Secrets in history.** [gitleaks](https://github.com/gitleaks/gitleaks) found two old development keys. Neither was ever used in production, but they were still rewritten out of history.
- **Personal data.** Test files only use the standard sample IBANs, and one script with my own spending keywords stayed private.

## Hosted, for people without a server

I run Sumry for myself anyway, so there is a hosted version too. It is **invite-only** for now. The free plan has two accounts and no statement import. **Premium is 29 CHF once**, no subscription: a finance app that charges you every month to look at your own money felt wrong. Self-hosted, every feature is free.

## Try it

- Self-host: [sumry-backend/deploy](https://github.com/elyesghazel/sumry-backend/tree/main/deploy), Docker and about 1.5 GB of RAM.
- Web app: [sumry-frontend](https://github.com/elyesghazel/sumry-frontend).
- Android: signed APK on the [sumry-app releases](https://github.com/elyesghazel/sumry-app/releases).
- Hosted: write to [sumry@elyesghazel.ch](mailto:sumry@elyesghazel.ch) for an invite.
