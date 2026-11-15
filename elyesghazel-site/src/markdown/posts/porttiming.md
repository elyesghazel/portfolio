---
title: A port timing calculator for my DT125
date: 2026-11-15
summary: I am porting a two-stroke cylinder for the first time, so I had agents build a calculator that turns port heights into degrees and shows what a base plate does before I cut anything.
tags: [two-stroke, TypeScript, AI agents, tools]
cover: /work/porttiming-site.webp
---

> [!tldr] I want more top end from the Athena 170 kit on my Yamaha DT125, and the first step is a base plate. To see what that does to the port timing before I touch the cylinder, I had agents build **porttiming.elyesghazel.ch**: a calculator that turns port heights into degrees, compares before and after, and checks the result against Blair's time-area targets.

My DT125 runs an [Athena](https://www.athena.eu/) 170 big-bore kit. Athena bores the 125 casting out to 65 mm, so the ports stay 125-sized: the exhaust opens at about **190°**, the transfers at about **114°**, and at bottom dead centre the piston still covers part of the transfers. The usual fix is a **base plate** (a spacer under the cylinder). It lifts the ports relative to the piston, so they open earlier and close later.

The question is always how much. A few tenths of a millimetre change the timing by degrees, and a base plate also opens up the squish gap and drops compression, so the head has to be skimmed to match. I have never ported a cylinder, so I wanted numbers I can check before I cut anything.

```stats
2.5 mm  | base plate
190° to 201° | exhaust duration
114° to 129° | transfer duration
43      | automated tests
```

## What it does

You load an engine (stock DT125R, DT125R with the Athena 170, a Minarelli AM6 or Blair's textbook 125) or type in your own bore, stroke, rod length and port heights. It gives you:

- **exhaust, transfer and intake timing** in degrees, blowdown and compression ratio
- a **before and after** view for a base plate, a skimmed head or a different head gasket
- a timing diagram and a piston cutaway that show where the crown is at each port edge
- **specific time-area** bars against [Blair](https://en.wikipedia.org/wiki/Gordon_P._Blair)'s targets for a chosen rpm

![porttiming on a phone](/porttiming-results.png "Results for the stock DT125R, on a phone")

Everything sits in the URL hash, so **a link is the whole setup**. I can send someone my numbers and they see exactly what I see. Nothing goes to a server.

## How it was built

Three GitHub issues, one agent each: the calc core, the UI, then deploy and docs. The calc core came first and has no DOM at all, so every formula can be tested on its own.

```flow caption="Three issues, one after another"
flowchart LR
  c[calc core<br/>formulas + tests] --> u[UI<br/>presets, diagrams]
  u --> d[deploy + docs]
  me[me: DT125 numbers<br/>and what looks wrong] --> c
  me --> u
```

The part I cared about most is that **every number has a source**. The formulas come from Blair's _The Basic Design of Two-Stroke Engines_ and Jennings' _Two-Stroke Tuner's Handbook_, and the tests check them against the worked examples in those books. The DT125R geometry (56 x 50.7 mm, 105 mm rod) comes from the service manual and rod kit listings. Where the port widths are a guess, the preset says so in the UI.

That source check caught a real mistake: the first numbers used a 110 mm rod for the DT125R. The manual and two rod kits say **105 mm**, which shifts every timing a little.

## What it does not do

It is geometry. It does not know how your exhaust pipe works with the port timing, and the reed valve timing is an assumption, because a reed opens on crankcase pressure, not crank angle. **Measure your own cylinder** with a degree wheel before you trust any of it.

The next step for me is measuring the real port heights on my Athena cylinder and putting them in. If you have measured a cylinder, the presets take sources, and real measurements are worth more than any estimate.
