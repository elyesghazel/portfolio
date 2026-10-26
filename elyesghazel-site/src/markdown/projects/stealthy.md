---
title: Stealthy
role: hardware & firmware, solo
period: 2026.02 - 2026.03
order: 1
highlight: true
summary: A pocket security-research badge on the ESP32-S3: a custom circuit board, a 2.13" e-ink screen, WiFi and infrared tooling, and firmware written in C++ from an empty repo. Board, code and case, about a month end to end.
tags: [ESP32-S3, C++, PlatformIO, KiCad, PCB design, e-ink, 802.11, IR]
link: github.com/elyesghazel/stealthy-firmware
url: https://github.com/elyesghazel/stealthy-firmware
---

```gallery
/stealthy-hand.jpg | The finished Stealthy badge, fully built, held in one hand | Finished board: ESP32-S3, e-ink, four buttons, running its own firmware.
/stealthy-pcb.jpg | The bare Stealthy PCB before any components are soldered | The bare board, before assembly. 'PUT THAT BACK' hides under the ESP32 footprint; the note by the e-ink connector reads, upside-down, 'if you can read this, you are holding it the wrong way.'
/stealthy-kicad.jpg | The Stealthy PCB layout in KiCad | The layout in KiCad. Footprints, placement and routing, all done by hand.
/stealthy-schematic.jpg | The Stealthy schematic | The schematic: ESP32-S3, e-ink over SPI, IR, buttons, power path and kill switch.
```

I wanted to understand how **wireless attacks** actually work at the packet level, so instead of buying a tool I built one. Stealthy is a pocket security-research badge built on an ++ESP32-S3++: a circuit board I designed myself, a ++2.13" e-ink screen++, four buttons, an infrared unit, and firmware I wrote in **C++** starting from an empty repository. Board, code and case, about a month from nothing to a thing I can hold in my hand and use.

## What it does

The firmware runs like a tiny operating system. Every tool is its own **app**, driven from the ++e-ink menu++ with four buttons or remotely from a password-protected **web interface** the badge hosts itself.

- **WiFi beacon flood**: crafts raw 802.11 frames to fill the air with fake networks
- **Deauth**: sends 802.11 deauthentication frames to knock devices off a target access point
- **Karma / rogue AP**: listens for probe requests and shape-shifts the AP into whatever network a nearby device is looking for
- **Captive troll portal**: serves configurable HTML to anyone who connects to it
- **IR record and replay**: captures remote-control signals over infrared and plays them back, reading and writing the Flipper Zero .ir file format
- **Offline TOTP authenticator**: generates 2FA codes with no network at all, time synced from the browser

None of it is example code glued together. The firmware is structured like real software: a small **app framework with a state machine**, apps as singletons with **onEnter and onExit lifecycle hooks**, and a **service-locator context** that hands each screen the managers it needs - display, input, power, storage, IR, WiFi, LEDs. The radio, the **LittleFS** filesystem and the web server are all separate modules. Adding a new tool means writing one app, not editing everything else.

## The board

The hardware is the part I am proudest of. I designed the whole ++PCB in KiCad++ - schematic, footprints, layout - with the ++ESP32-S3++ at the centre, e-ink over ++SPI++, an infrared LED, four tactile buttons, status LEDs, battery input, and a ++physical kill switch++ wired straight into the VCC line so the device is genuinely dead when it's off. The ++USB-C++ port went in horizontally with the two ++5.1 kΩ resistors++ on the CC pins that modern chargers demand before they will deliver any power.

Revision one taught me what revision two fixed. The first regulator, an ++AMS1117++, sagged under current spikes, so I replaced it with a ++Microchip TC1262++ that has a far smaller dropout, patched it in with ++bodge wires++ to prove it, then spun a cleaner board. A ++boost converter++ is planned to feed the 1-3 W infrared LED the current it wants without dragging the ESP32 into a brown-out.

## Making it stop resetting itself

An e-ink refresh and a WiFi burst both pull hard on a small battery, and the ESP32-S3 answers the voltage dip by resetting itself. Three changes fixed it. ++Partial refresh++, so the screen updates without the full black-and-white flash that costs the most current. Dropping the CPU to ++80 MHz++ while writing to the display. And briefly muting the ++brown-out detector++ during boot, so the charge pump can't trap the board in a reset loop before it has settled. Together they turned a flaky prototype into something that just runs.

## The case, and the jokes

The enclosure is an open-frame skeleton design: the board snaps into ++printed corner clips++ with no screws, and a back plate carries the battery. I also left a few things on the ++silkscreen++ for anyone who looks closely. 'PUT THAT BACK' under the ESP32 footprint. And, printed upside-down beside the e-ink connector, 'if you can read this, you are holding it the wrong way.'

About a month, empty repository to working board. It's the project I point at when someone asks whether I actually build hardware or just talk about it. Built for learning and authorised testing on my own equipment.
