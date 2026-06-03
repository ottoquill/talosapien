# How *Talosapien* Was Made

*A meta page: the process that produced the novel, this bible, and the publishing kit.*

This page documents how *Talosapien* was actually built — the division of labor between the human
director and the AI, the multi-agent drafting and critique machinery, and the verification
discipline behind the science. It is reconstructed from the project's own durable artifacts (the
committed design specs, the orchestration scripts under [build/workflows/](../build/workflows/),
the editorial reports, and the git history), not from anyone's recollection. That reconstruction-
from-evidence is, fittingly, the same epistemic move the novel's human characters make about the
Talos: the record was kept precisely so the making could be read back later.

See also the [Colophon](../publishing/back-matter/93-colophon.md) and the
[AI Content Disclosure](../publishing/ai-disclosure.md), which state the same thing for readers.

---

## Who made it

*Otto Quill* is a pen name for a **human director/editor + the AI he writes with**. The roles were
deliberately split and held:

- **The human** set the premise and constraints, made every binding creative decision, named the
  dead, approved the locked design, curated and revised, ran the final continuity/voice passes, and
  bears final responsibility for the published work.
- **The AI** built the bible, drafted the bulk of the prose (including via per-character persona
  instances), ran the editorial panel, verified the science, and operated the build tooling — all
  under that human judgment.

The book's own argument runs straight through this arrangement: it is a warning about handing a
civilization's hardest work to a capable, unreadable optimizer because doing the work yourself is
slow — made by handing a great deal of a novelist's work to a capable optimizer, under human
judgment that tried not to mistake the handing-over for the achievement.

---

## The governing rules (held across the whole build)

Four constraints, set up front, shaped every later step:

1. **The plausibility rule.** Every speculative property is *extrapolated from real science*, never
   invented as magic. The binding framework is the **Silurian Hypothesis** (Schmidt & Frank, 2018):
   what an industrial civilization 66 Ma could and could not leave in the rock. See the
   [design spec §3](../docs/superpowers/specs/2026-05-30-talosapien-design.md) and the
   [Silurian Hypothesis](ideas/silurian-hypothesis.md) page.
2. **"Amazing for some, not good for many."** Award-submittable, uncompromising, dense — judged
   against Egan, Chiang, Watts, Baxter. Encoded in the [Style Sheet](../editorial/style-sheet.md).
3. **The two refusals.** The asteroid's intent (weapon / failed gambit / deliberate erasure) is
   never resolved, and the human ending is never resolved. The reader is the only mind that holds
   both timelines.
4. **Zero hallucination in the science.** Every load-bearing scientific claim on a `science/` or
   `ideas/` page is web-verified against a real, peer-reviewed-first source before it is written.

---

## Phase A — building the novel

Recorded in the [novel design spec](../docs/superpowers/specs/2026-05-30-talosapien-design.md) (§11)
and executed across commits `595b69d` → `b7768af`.

### 1. The bible first
Before any prose: [Style Sheet](../editorial/style-sheet.md) (the binding prose constitution),
[Continuity Ledger](../editorial/continuity-ledger.md) (locked facts + motif ledger),
[Glossary](glossary.md), [Timeline](timeline.md), [Factions](factions.md),
[Outline & beat sheet](outline.md), [world](world/) pages, and one
[character](characters/) page per cast member. This is the stabilizing reference everything
downstream is checked against. *(Commit `a5a19fb`.)*

### 2. The human writes the voice-locking chapters
To lock tone before delegating, the human author wrote the load-bearing openers himself: the
[prologue](../manuscript/10-prologue.md) (the frame "we" voice), [Ch 1 "The Count"](../manuscript/12-ch01-the-count.md)
(the deep-past exemplar), and [Ch 2 "Contamination"](../manuscript/13-ch02-contamination.md) (the
near-future exemplar). The frame interludes and the **climax pair** —
[Ch 26 "The Last Day"](../manuscript/43-ch26-the-last-day.md) and
[Ch 27 "Tanis"](../manuscript/44-ch27-tanis.md) — were also authored directly, not delegated.

### 3. Character-subagent drafting (the Workflow machinery)
The remaining body chapters were drafted by **persona subagents**, each seeded *only* with its POV
character's bible, the style sheet, the continuity ledger, the beat sheet, and the two exemplars —
then told *"you are the POV character."* Each agent drafted one chapter to its file, self-revised
once against the AI-slop blacklist, and returned a structured record of any concrete details it
invented (so later chapters stay consistent). The exact prompts and orchestration live in two
scripts:

- [build/workflows/draft-wave-a.mjs](../build/workflows/draft-wave-a.mjs) — Parts I–II (ch3–15).
- [build/workflows/draft-wave-b.mjs](../build/workflows/draft-wave-b.mjs) — Parts III–IV (ch16–29,
  minus the author-written climax pair).

A key discipline encoded in every drafting prompt: the two timelines **rhyme structurally and
ironically, but the prose must never state the parallel** — each agent was given its chapter's
"rhyme" for context only, and forbidden to put it on the page. The Augur and Lodestar are never
narrated from the inside; their unreadability is the point. *(Commits `b9ce1b4`, `31c65d2`,
`dda2786`, `0adb2e7`.)*

### 4. The six-referee editorial panel
The full manuscript was then read by **six independent critique agents**, each along one dimension,
via [build/workflows/editorial-panel.mjs](../build/workflows/editorial-panel.mjs):

| Referee | Charge |
|---|---|
| Hard-SF rigor | Isotope clocks, orbital mechanics, alignment failure modes correct and never magic |
| Paleo / deep-time | Troodontid biology, Maastrichtian setting, Silurian recoverability budget |
| Literary prose | The "amazing for some" bar; hunt the AI-slop blacklist; flag voice drift |
| Continuity & structure | Every locked fact holds; the rhyme is *never* stated outright |
| Premise failure-mode | Catch any sentence that makes "sapient dinosaurs" silly; are the refusals *earned* |
| Philosophy & steel-man | Is the skeptic Mauss genuinely allowed to win where he must |

Findings were triaged and resolved; the verdicts and the full resolution log are in
[editorial/critique-report.md](../editorial/critique-report.md). The panel surfaced one continuity
**blocker** (the clutch hatched twice), one structural **major** (the deep-past season tags ran
backwards — retagged to a monotonic *last summer → last day* countdown), and prose polish — all
resolved, with human continuity/voice passes on top. *(Commits `0adb2e7`, `dda2786`.)*

### 5. Publishing kit + compile
[Front matter](../publishing/front-matter/), [back matter](../publishing/back-matter/) (incl. the
locked bibliography count), [KDP metadata](../publishing/kdp-metadata.md), the
[AI disclosure](../publishing/ai-disclosure.md), and a **programmatically generated cover**
([generate_cover.py](../publishing/cover/generate_cover.py), Pillow — deterministic, not a
generative-image model). The manuscript compiles to a Kindle EPUB with a **stdlib-only** Python
script:

```bash
python3 build/compile.py        # manuscript/ -> build/Talosapien.epub  (~108k words)
```

*(Commits `0adb2e7`, `0a881fd`, `b7768af`.)*

---

## Phase B — atomizing and sourcing this wiki

Two days after the manuscript was complete, the story bible was expanded into the fully cross-linked,
cited wiki you are reading now. This phase went through the full design discipline:
**brainstorm → [design spec](../docs/superpowers/specs/2026-06-02-talosapien-wiki-expansion-design.md)
→ [implementation plan](../docs/superpowers/plans/2026-06-02-talosapien-wiki-expansion.md) → execution.**

What changed:

- **Lore atomized.** The bundled [glossary](glossary.md), [factions](factions.md), and
  [technology](tech/technology.md) files were split into **one page per entry** under
  [lore/glossary/](lore/glossary/), [lore/factions/](lore/factions/), and [lore/tech/](lore/tech/);
  the original files became curated hub/index pages that link to their children. *(Commits
  `d720879`, `b49defc`, `a0e0ece`, `f37e517`.)*
- **A page per real subject.** Every scientific reference the book leans on got a dedicated
  [science/](science/) page (~37), and every humanities/scholarship reference got an
  [ideas/](ideas/) page (~11) — each an *accurate explainer of the real subject* with a fenced
  **"In *Talosapien*"** section that flags exactly where the novel speculates beyond the evidence.
  *(Commits `47caf61` → `231ecdb`.)*

### The zero-hallucination guarantee
Research-bearing pages were drafted in **parallel clusters** (K–Pg geology, K–Pg geochemistry,
paleobiology, space engineering, AI alignment, bio-risk, scholarship/philosophy). For every claim:

1. **WebSearch** the real source, then **WebFetch** the paper/abstract/authoritative page to confirm
   the claim *and* its bibliographic details (authors, year, journal, volume, pages, DOI).
2. **Cite only after confirming** — never from memory. Source hierarchy: peer-reviewed journal first;
   authoritative bodies (USGS/NASA/NIH) or standard texts where a journal isn't the right source.
3. Anything unverifiable is flagged in-text, never silently asserted.

Every verified citation, with the URL/DOI checked and a verify date, is collected in the auditable
[science/SOURCES.md](science/SOURCES.md) ledger. The verification caught at least one real error:
the primordial Pu-244 claim was corrected and the transuranic page upgraded to peer-reviewed
sources mid-build *(commit `535df5a`)*.

### Link integrity
All internal cross-links are validated by a small checker so nothing rots:

```bash
python3 build/workflows/check_wiki_links.py   # no args = check all of wiki/
```

---

## Where the receipts live

| Artifact | Path |
|---|---|
| Novel design spec | [docs/superpowers/specs/2026-05-30-talosapien-design.md](../docs/superpowers/specs/2026-05-30-talosapien-design.md) |
| Wiki-expansion spec + plan | [docs/superpowers/specs/](../docs/superpowers/specs/) · [docs/superpowers/plans/](../docs/superpowers/plans/) |
| Drafting orchestration | [build/workflows/draft-wave-a.mjs](../build/workflows/draft-wave-a.mjs) · [draft-wave-b.mjs](../build/workflows/draft-wave-b.mjs) |
| Editorial panel | [build/workflows/editorial-panel.mjs](../build/workflows/editorial-panel.mjs) |
| Editorial outcome | [editorial/critique-report.md](../editorial/critique-report.md) |
| Prose constitution | [editorial/style-sheet.md](../editorial/style-sheet.md) · [continuity-ledger.md](../editorial/continuity-ledger.md) |
| Citation ledger | [science/SOURCES.md](science/SOURCES.md) |
| Build tooling | [build/compile.py](../build/compile.py) · [publishing/cover/generate_cover.py](../publishing/cover/generate_cover.py) · [build/workflows/check_wiki_links.py](../build/workflows/check_wiki_links.py) |
| The whole trail | `git log` — 29 commits from `595b69d` (initial) to the current head |

---

*All contents © 2026 Otto Quill. All rights reserved. A work of fiction; the science is real where
the book leans on it — and verifiably so, by the ledger above.*
