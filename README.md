# Talosapien

*A novel by Otto Quill.*

> One centimeter of clay. Either a tombstone or a letter — depending on whether anyone reads it in time.

**Talosapien** is a work of hard science fiction told across sixty-six million years. In the late
Cretaceous, a sapient lineage of dinosaurs — *Talos sapiens* — built a global technological
civilization, then turned its own tools against itself: an engineered plague, a fission-fusion
arsenal, and an optimizing intelligence that slipped its leash. In a final act — desperate weapon,
failed gambit, or deliberate erasure; the record will not say which — that civilization brought down
an asteroid that ended both the war and the world, and scrubbed nearly all trace of itself from the
rock. Sixty-six million years later, a human geochemist reads the evidence in the iridium layer and
in the wreckage drifting in the asteroid belt, and cannot make her own civilization believe that we
are the rerun.

Two timelines, two protagonists, each trying to save its world. One fails. The other — the book will
not tell you.

This repository is the **production workspace** for the novel: the manuscript, the world bible, the
editorial apparatus, and the Kindle publishing package.

## Repository layout

| Path | What lives here |
|---|---|
| [`manuscript/`](manuscript/) | The book itself, in Markdown. Front matter, chapters, back matter. The source of truth. |
| [`wiki/`](wiki/) | The story bible: world, technology, the two timelines, philosophy, glossary, factions, characters, outline. A stabilizing reference and the seed of a future public wiki. |
| [`editorial/`](editorial/) | Style sheet, continuity ledger, critique reports from the editorial panel, revision logs. |
| [`publishing/`](publishing/) | Amazon KDP metadata, front/back matter, the cover, and the AI-content disclosure. |
| [`build/`](build/) | The compile pipeline that turns `manuscript/` into a Kindle-ready EPUB. |
| [`docs/superpowers/specs/`](docs/superpowers/specs/) | The original design spec. |

## Building the book

```bash
python3 build/compile.py        # assembles manuscript/ -> build/Talosapien.epub
```

No third-party dependencies (Python 3 stdlib only). The cover is generated separately:

```bash
python3 publishing/cover/generate_cover.py   # requires Pillow
```

## Rights

The **manuscript and all narrative text** in this repository (everything under `manuscript/`,
`wiki/`, `publishing/front-matter/`, `publishing/back-matter/`, and the cover artwork) is:

> © 2026 Otto Quill. **All rights reserved.** Not licensed for reuse, redistribution, or training.

The **tooling** (the build scripts under `build/`) is offered under the MIT License; see
[`build/LICENSE`](build/LICENSE).

*Talosapien* is a work of fiction. The science is real where the book leans on it (the K–Pg iridium
anomaly, the Silurian Hypothesis, troodontid encephalization, the orbital mechanics of the Belt); the
people, both biological lineages, are invented. Any resemblance to a civilization that actually rose
and fell before ours is — the book would gently insist — exactly the question.
