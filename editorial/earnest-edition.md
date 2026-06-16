# The Earnest Edition — Revision Log

A shortened edition of *Talosapien*, cut by roughly half and rewritten on Ernest Hemingway's
principles. Drafted on the `earnest` branch.

## What changed

- **Length.** Manuscript body cut from ~108,800 words to ~59,400 — **54.6% of the original** (about
  half). Every prose file lands in a 47–61% band of its original; the lone outlier is Ch26 ("The Last
  Day," 75%), held back deliberately because it is the short climactic chapter where every beat is
  load-bearing and the frame-voice refusal at the surge cannot be compressed without damage.
- **Prose.** Converted to Hemingway register throughout: short declarative sentences, concrete nouns
  and active verbs, adjectives and adverbs stripped, the iceberg (state the surface, trust the
  subtext), no narrator editorializing. The long recursive sentences that were the original's
  signature are broken into hard, separate sentences. The frame "we" voice keeps its content, its
  humility, and every confession of what is invented vs. found — rendered in short sentences.
- **Conversion brief.** The binding instructions are in `editorial/hemingway-brief.md`.

## What was preserved (deliberately not cut)

- **The braided architecture.** All 29 body chapters, the prologue, three interludes, and epilogue
  remain. The alternating PAST/FUTURE structure and its unstated rhyme pairs are the book's load-
  bearing spine (the editorial panel's named triumph); halving was achieved by line- and section-
  level compression, not by deleting chapters or breaking the braid.
- POV and past tense per chapter; the frame voice's present-tense "we."
- All plot beats, in-world terminology, the Talos physiology rules (crest-flush, throat going grey,
  the inner ear reading the floor tilt — no human-body clichés), the hard rule (the deep past never
  asserts what the record could not recover; the frame voice flags its inventions), correct science.
- The two earned refusals to resolve: the asteroid's intent (the three readings, all fair) and the
  withheld hearing outcome.
- The Ch26 surge blank — the book's one true empty page — kept whole.

## Method

Converted in parallel by subagents, one batch per Part plus a frame-matter batch, all working from
`hemingway-brief.md` and `style-sheet.md`. Ch26 was converted by hand. Frontmatter `words:` fields
were resynced to actual body counts. The EPUB build (`build/compile.py`) compiles clean: 46 sections.
