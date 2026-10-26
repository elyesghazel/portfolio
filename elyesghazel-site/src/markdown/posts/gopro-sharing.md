---
title: Watching 4K GoPro clips without downloading 4K GoPro clips
date: 2026-10-26
summary: A 5-minute ride is a 3.7 GB file. Here is the setup that turns it into a link that plays instantly, on my own server, with one command.
tags: [self-hosting, ffmpeg, NVENC, Jellyfin, rclone]
---

I film most rides with a helmet GoPro. A five-minute clip in 4K is about 3.7 GB, and a weekend is a few hundred of them. They lived on my cloud drive, which meant that watching one, or sending one to the person riding behind me, started with a two-minute download.

> [!note] The slowness was never where the files lived. It was the delivery: download the whole thing first, at a raw bitrate nobody needs on a phone. Fix that and the storage can stay where it is.

So every clip now exists twice. The untouched 4K original goes to the archive, and a small, seek-friendly copy goes to my server, where it plays straight away.

```stats
9×   | smaller stream copy
1    | command per SD card
0    | accounts needed to watch
361  | clips in the library
```

## The pipeline

One command, `gopro import`, does all of it when the SD card goes in:

```flow caption="gopro import, from SD card to a link"
flowchart TD
  sd[SD card] --> imp[gopro import]
  imp -->|rclone, originals| arc[(cloud archive<br/>4K, untouched)]
  imp --> enc[NVENC on the desktop GPU<br/>1440p H.264, +faststart]
  enc -->|rsync| srv[my server<br/>stream copies]
  srv --> jf[Jellyfin<br/>browse and watch]
  srv --> share[gopro share<br/>private link]
  srv --> files[file browser<br/>grab on the phone]
  arc -. 4K on request .-> share
```

The transcode runs on the desktop's RTX 3060: hardware decode, scale, `h264_nvenc`, and `+faststart` so the index sits at the front of the file and playback can start before the rest has arrived. The server never transcodes anything. Jellyfin direct-plays the copy, which is why it feels instant.

```bars title="One 5-minute clip"
4K original     | HEVC, ~108 Mbps   | 3700 | 3.7 GB
stream copy     | H.264, ~12 Mbps   | 462  | 462 MB | *
```

## Sending a clip to someone

This is the part I use most. `gopro share` takes a clip, a list of clips, or a whole day, and prints one link:

```term title="on the server"
$ gopro share GX010598
https://share.elyesghazel.ch/<token>/
$ gopro share 2026-07-25 --all --days 3 --title "Sunday"
# one link for the whole day, gone after three days
```

The link opens a small page with a poster and a player for every clip, and a download picker per clip: the 1440p copy for someone who just wants it on their phone, the 4K original for someone who wants to edit it. No account, no app. After 14 days by default the whole folder deletes itself.

Stream copies are hard-linked into the share folder, so a share costs no disk. Originals are real copies, pulled from the archive by the server itself. Pulling them one by one was slow, so a share now fetches all of its originals in a single batched `rclone` run, which lets the transfers run in parallel:

```bars title="Pulling originals from the archive" ratio
one call per clip   | sequential       | 20 | 20 MB/s
one batched run     | parallel files   | 80 | 80 MB/s | *
```

## Never encoding the same clip twice

The question I kept asking was "if I change the quality, do I redo everything?". The answer is now built into the files. Every stream copy carries the settings it was made with in its mp4 comment tag:

```txt title="mp4 comment tag"
gopro-enc:v2:1440p:h264:cq22
```

`gopro backfill` compares that stamp with the current config. Clips already at the current profile are skipped, stale ones are re-encoded, missing ones are made. Change the resolution or the quality in the config and exactly the outdated copies get redone, in batches, resumable, safe to run twice.

```term
$ gopro backfill --dry-run
$ gopro backfill --limit 20
```

> [!tip] If you build something like this: put the version of the recipe into the output. It turns "what do I need to redo?" into a lookup instead of a guess.

It's a few hundred lines of shell around ffmpeg, rclone and Jellyfin's API. Nothing clever, but it removed the one step that made me not bother watching my own footage.
