---
title: I went to bed with a roadmap and woke up to a game
date: 2026-11-12
summary: Zweitakt is a browser game about running a two-stroke garage in a Swiss village. AI agents built it from my roadmap in one weekend, milestone by milestone, while I played each build and said what felt wrong.
tags: [game dev, AI agents, Three.js, TypeScript]
---

> [!tldr] Zweitakt is a low-poly workshop game where you fix two-stroke bikes by hand, in the browser and on a phone. I wrote the roadmap and played every build, and **AI agents wrote the code**, one milestone at a time, mostly overnight. It went from an empty folder on Saturday evening to a public game with multiplayer on Sunday night.

I wanted a game about the thing I actually do on weekends: getting old [two-stroke](https://en.wikipedia.org/wiki/Two-stroke_engine) bikes to run again. Not a tycoon spreadsheet with a motorbike skin, but the real loop: something sounds wrong, you find out why, you fix it, and you find out whether you were right.

So on a Saturday evening I wrote down the pitch: **take over a rundown garage in a Swiss small town and build the best two-stroke shop in the region.** Phone first, tap controls, low-poly look. Then I split it into milestones and handed them to agents.

```stats
1 weekend  | empty folder to public game
88         | commits
396        | automated tests
7          | bikes, from a Töffli to an injected four
```

![Zweitakt garage with a customer at the door](/zweitakt-shop.jpg "The garage on a spring morning, first customer at the door")

## How it was built

Every milestone was **one agent with one job**: read the roadmap and the design notes, build that milestone, test it, publish it to a private preview link. They ran one after another, not in parallel, because every milestone touches the same code.

```flow caption="One milestone, start to finish"
flowchart LR
  r[roadmap +<br/>design notes] --> a[agent builds<br/>the milestone]
  a --> t[unit tests +<br/>headless play script]
  t --> p[private preview]
  p --> me[I play it]
  me -->|what felt wrong| r
```

The tests were not only unit tests. Each milestone also had a **play script**: a headless browser that walks through a real job, taps the buttons a player would tap and saves screenshots at every step. That is how an agent can check a screen it never sees. There is also a balance suite that plays the in-game economy over many seeds, to catch a strategy that prints money or one that always goes broke.

The project is [TypeScript](https://www.typescriptlang.org/) and [Three.js](https://threejs.org/) with a PS1-style render pipeline, built with [Vite](https://vite.dev/). It ends up as about **31,000 lines** across the game, the server and the tests.

## The part that needed me

The first two milestones worked. Bikes came in, I took the seat off, the tank off, the carb off, read a panel and rebuilt it. Then the next bike, the same again. **Every job felt the same**, and adding more management around it would not have fixed that.

So I rewrote the next milestone before the agent got to it. The rule I gave it: **if a job can be finished by tapping through a list, it is not done.** Repairs became hands-on close-ups: you spin bolts with a finger, heat the seized one, kick the engine on the mark, tune the idle by ear and read the plug yourself. **Nothing tells you what is wrong.** Tools give raw evidence and you draw the conclusion.

![Spark plug close-up](/zweitakt-plug.jpg "Reading the plug. White as chalk means too little fuel.")

The symptoms come from the state of the parts, not from a script. A lean mix can seize the piston, so the fault you see is not always the one you have to fix.

That bit me on the next build. I cleaned a dirty plug, handed the bike back, lost money and reputation, and the game never said why: the plug was only hiding a deeper fault. A real mechanic learns from the comeback. A player just feels cheated. So the milestone after that added a **job review after every handover**, a logbook, fairer clues on the test ride and a "Stuck?" hint that costs a little money.

> [!note] This was the pattern all weekend. The agents were fast at building what was written down. Deciding what was worth building, and noticing when something was technically correct but no fun, stayed with me.

## What was there on Sunday night

After ten milestones the game has customers you talk to and haggle with (some of them lie), test rides up a valley road that tell you whether the fix worked, a hired crew, seasons and races, barn finds, a **3.4 km road network** to ride on your own bike, and a shop you can rearrange on foot.

![Test ride on a mountain pass](/zweitakt-ride.jpg "Test ride on the pass. How the bike rides comes from the state of its parts.")

There is also Opa, an old man who came with the building. He smokes, gives confidently wrong advice and insults you, with **over 150 lines**. The regulars, crew and customers have **20 voices** and about 430 voice clips, with subtitles always on.

Multiplayer came last and is optional: leaderboards with ghost riders, a bike market and co-op on a shared bike, where one player wrenches and the other tunes. The server is plain [Node.js](https://nodejs.org/) with its built-in SQLite and no packages. It re-rides every submitted run itself, so a ghost on the board is always a real replay. If you never make an account, the game stays fully offline.

## What I would do the same next time

- **Write the roadmap so it can be checked.** "Repairs should feel hands-on" is a wish. "If it can be done by tapping a list, it is not done" is something an agent can test against.
- **Play every build yourself.** The play scripts proved that each screen worked. None of them could tell me that the game was boring.
- **Watch agents that go quiet.** One milestone sat stalled for over an hour and a half without telling anyone. Now I check on them myself.

Zweitakt is free to play at [zweitakt.elyesghazel.ch](https://zweitakt.elyesghazel.ch/) and on [itch.io](https://elyesghazel.itch.io/zweitakt). It works best on a phone in landscape.
