---
title: SlidePlate
role: founder
period: 2025.12 - now
order: 2
summary: 3D-printed foldable licence plate holders for supermoto and enduro bikes.
tags: [ASA+, 3D printing, Shopify, Next.js, Prisma]
link: slideplate.ch
url: https://slideplate.ch
---

Supermoto and enduro bikes ship with licence plate holders that are long, heavy, and bolted onto a bracket that hangs out past the rear wheel. Mine are short, they fold, and they bolt straight on without modifying the bike.

Two versions. BASE is fixed. FLEX folds in flat against the fender and back out to almost horizontal, which is what you want after dropping the bike or when you need the clearance. There are model-specific fitments for Yamaha, KTM EXC, TM SMR and Beta, plus a universal plate for everything else. They ship to Switzerland, Austria, Belgium and the UK.

```stats
2 | versions: BASE + FLEX
ASA+ | current print material
5 | early units replaced free
```

## From a rear fender to a finished part

This is not one shape that happens to fit every bike. The fitment is part of the product: where it bolts on, how it sits under the fender, and how much room the holder has to move. A universal plate covers the bikes without a dedicated fitment.

```flow caption="The physical side: measure, model, print, ship."
flowchart TD
  fit[Measure the bike] --> cad[Design the fitment]
  cad --> version{BASE or FLEX?}
  version --> base[Fixed holder]
  version --> flex[Folding holder]
  base --> print[Print to order in ASA+]
  flex --> print
  print --> pack[Pack and ship]
```

## The part I got wrong

The first run was printed in PETG with settings I had not thought about hard enough: low infill, thin walls. The hinges broke. Five came back.

I replaced every one of them for free, moved the whole line to ASA+, and then posted a video explaining exactly what I had got wrong and why. That video got shared more than anything else I have posted, including the product ones. It taught me more about selling something than any amount of product copy did.

> [!note] The material change was only half the lesson. The walls and infill mattered too. Replacing the broken units and explaining the failure became part of building the product, not a distraction from it.

## The boring half

Most of the work is unglamorous: measuring rear ends, cutting new fitments in CAD, printing to order, packing boxes, answering DMs about whether it fits a 2019 EXC.

Shopify reports revenue, and for a while I read that as profit. It isn't. So I built my own tracker in Next.js, Prisma and Postgres, where every order carries its real costs: filament, packaging, the postage I actually paid, and the warranty units that went out for nothing. It produces one number I trust. It is a lot smaller than the number Shopify shows, and that is the entire reason it exists.


```flow caption="The digital side: revenue is the starting point, not the result."
flowchart TD
  order[Shopify order] --> tracker[Next.js + Prisma + Postgres]
  material[Filament + packaging] --> tracker
  delivery[Actual postage] --> tracker
  warranty[Free warranty units] --> tracker
  tracker --> result[Profit after real costs]
```

## What I actually built

A physical part and the small business around it. Custom fitments, a printer for production, Shopify for the shop, and my own software for the part the shop's revenue chart could not tell me. The useful work sits in the connections between them.
