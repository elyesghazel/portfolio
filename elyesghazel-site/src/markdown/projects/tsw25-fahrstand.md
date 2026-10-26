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

## Controls

- 2 large buttons for the doors, left and right
- 3 toggle switches for the PZB system
- Self-designed 3D-printed levers running on potentiometers

## Build

- Pro Micro (Arduino Leonardo clone) as the microcontroller
- C++ with the Joystick library
- Custom PCB, hand-soldered
- Housing designed in Fusion 360, printed on a Prusa Mini+

## The hard part

Calibrating the potentiometers. The microcontroller has to reliably find the minimum and maximum travel of every lever, or the inputs arrive imprecise and inconsistent. On top of that the USB-HID descriptor had to be right enough that the game accepts the desk as a real controller rather than an unknown device.

Seven months later: a working, realistic-looking driver's desk, designed, soldered and programmed end to end.
