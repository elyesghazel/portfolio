---
title: TSW25 Fahrstand
role: hardware & firmware
period: 2025.03 - 2025.10
order: 3
summary: A physical train driver's desk for Train Sim World 25, built from the circuit board up.
tags: [C++, Arduino, PCB, Fusion 360, 3D printing, USB-HID]
---

```gallery
/log/tsw25.webp | The TSW25 Fahrstand, a custom train driver's desk | The finished desk: door buttons, PZB toggles and printed levers on potentiometers.
```

A friend was done playing Train Sim World 25 with a keyboard and mouse. So I built him a driver's desk instead: circuit board, firmware, housing, all of it designed from scratch. Seven months of work, and it sold.

```stats
2 | door buttons
3 | PZB toggles
7 months | from build to sale
```

## The idea: make the inputs physical

The point was not to put a keyboard in a bigger box. Door controls should be buttons, PZB controls should be switches, and the levers should have actual travel. That meant designing the mechanical parts and the electronics together, then making the game understand what came out of them.

## Controls

- 2 large buttons for the doors, left and right
- 3 toggle switches for the PZB system
- Self-designed 3D-printed levers running on potentiometers

```flow caption="From a hand on a lever to an input the game understands."
flowchart TD
  lever[Printed lever] --> pot[Potentiometer]
  pot --> calibration[Calibrate travel in firmware]
  doors[Door buttons + PZB toggles] --> micro[Pro Micro]
  calibration --> micro
  micro --> usb[USB-HID joystick]
  usb --> game[Train Sim World 25]
```

## Build

- Pro Micro (Arduino Leonardo clone) as the microcontroller
- C++ with the Joystick library
- Custom PCB, hand-soldered
- Housing designed in Fusion 360, printed on a Prusa Mini+

The Pro Micro is the bridge between the physical desk and the PC. The Joystick library handles the controller side in C++, while the custom PCB carries the connections. The enclosure and levers were modelled in Fusion 360 and printed on my Prusa Mini+.

```flow caption="Three parts of the same build, meeting at the finished desk."
flowchart TD
  cad[Fusion 360] --> housing[Printed housing + levers]
  pcb[Custom PCB] --> solder[Hand-soldered electronics]
  code[C++ + Joystick library] --> firmware[Pro Micro firmware]
  housing --> desk[Finished driver's desk]
  solder --> desk
  firmware --> desk
```

## The hard part

Calibrating the potentiometers. The microcontroller has to reliably find the minimum and maximum travel of every lever, or the inputs arrive imprecise and inconsistent. On top of that the USB-HID descriptor had to be right enough that the game accepts the desk as a real controller rather than an unknown device.

> [!note] Mechanical travel is not the same thing as a usable game input. Calibration and the USB-HID descriptor were what made the custom hardware behave like a controller.

## From parts to a desk

This project crossed all the boundaries I like working across: CAD, printing, a circuit board, hand soldering and firmware. None of those pieces was the whole project. The result was the moment they worked together in the simulator.

Seven months later: a working, realistic-looking driver's desk, designed, soldered and programmed end to end.
