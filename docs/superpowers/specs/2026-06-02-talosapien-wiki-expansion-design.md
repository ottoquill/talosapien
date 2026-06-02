# Talosapien Wiki Expansion — Design Spec

**Date:** 2026-06-02
**Status:** Approved (brainstorming complete)
**Author:** Paul Reinholdtsen + Claude

## Goal

Expand the *Talosapien* story bible (`wiki/`) into a fully atomized wiki:

1. **One page per entry.** Every worldbuilding entry currently bundled into
   `glossary.md`, `factions.md`, `technology.md`, and `philosophy/philosophy-map.md`
   becomes its own cross-linked Markdown page.
2. **A page per real subject.** Every scientific reference the book leans on gets a
   dedicated page about the *real underlying subject matter*, and every
   humanities/scholarship reference does too.
3. **Zero scientific hallucinations.** Every scientific claim is backed by a real,
   web-verified, peer-reviewed-first source. Nothing is cited from memory.

## Non-goals

- No rendered HTML site / build step. Source of truth stays Markdown in `wiki/`.
- No changes to the manuscript, EPUB build, or publishing kit.
- No unrelated refactoring of existing wiki prose beyond adding cross-links.

## Decisions (locked during brainstorming)

| Decision | Choice |
|---|---|
| Output format | Markdown in `wiki/` (git source of truth, no build step) |
| Science page structure | Accurate cited explainer + fenced "In *Talosapien*" section |
| Sourcing standard | Web-verified, **peer-reviewed first**; authoritative bodies (USGS/NASA/NIH) and standard texts allowed where a journal isn't the right source; numbered References per page |
| Reference scope | Hard science **and** all humanities/scholarship references |
| Bundled files | Kept, converted into curated hub/index pages that link to atomized entries (not deleted) |

## Directory structure

```
wiki/
  00-index.md                 # master hub — rewritten to link everything
  science/
    00-science-index.md
    <subject>.md ...
    SOURCES.md                # master verified-citation ledger
  ideas/
    00-ideas-index.md
    <subject>.md ...
  lore/
    glossary/  <entry>.md ...
    factions/  <entry>.md ...
    tech/      <entry>.md ...
  characters/                 # kept (already one file per character)
  world/                      # kept as three overview "hub" pages
  glossary.md                 # → curated index page, links to lore/glossary/*
  factions.md                 # → curated index page, links to lore/factions/*
  tech/technology.md          # → curated index page, links to lore/tech/*
  philosophy/philosophy-map.md# → curated index page, links to ideas/*
```

## Page templates

### Science page (`science/*.md`)
```
# <Subject>
**Type:** science · **Used in:** Ch X, Ch Y · **Related:** [[...]]

## Summary
2-3 sentence plain-language summary.

## The science
Accurate explainer with inline [n] citation markers tied to References.

## Established vs. open
What is settled consensus vs. what is actively debated/uncertain.

## In *Talosapien*
> Fenced section. How the book uses, extends, or speculates beyond the real
> science. Explicitly flags where the novel invents.

## See also
[[cross-links to lore and other science pages]]

## References
1. Author(s) (year). "Title." Journal vol(issue):pages. doi:... — *verified <date>*
```

### Ideas / scholarship page (`ideas/*.md`)
Same shape as science page. References cite the primary work (e.g. *Reasons and
Persons*; Aeschylus' *Agamemnon*) plus reputable scholarship, not journal DOIs,
where that is the correct kind of source.

### Lore page (`lore/**/*.md`)
```
# <Entry>
**Type:** lore (<glossary|faction|tech>) · **Era:** deep past | near future | frame
**Appears in:** Ch ...

## Summary
## Details
## Honesty note          # what the reconstruction invents vs. what evidence licenses
## Science basis         # links to relevant science/ pages
## See also
```

## Verification workflow (the zero-hallucination guarantee)

For every scientific/scholarly claim on a science/ or ideas/ page:

1. **WebSearch** the real source, then **WebFetch** the actual paper/abstract/
   authoritative page to confirm both the claim and the bibliographic details
   (authors, year, journal, volume, pages, DOI).
2. **Cite only after confirming.** No citation written from memory.
3. Any claim that cannot be verified against a real source is written as
   `[unverified — no source located]` and surfaced to the user — never silently asserted.
4. All verified citations are collected in `wiki/science/SOURCES.md` (auditable,
   reusable across pages). Each entry records the URL/DOI checked and the verify date.

Source hierarchy, in preference order:
1. Peer-reviewed journal article (with DOI).
2. Peer-reviewed review article / authoritative scientific body (USGS, NASA, NIH,
   IPCC, NOAA) / standard reference text — when a single journal article is not the
   right source (e.g. O'Neill cylinders, delta-v fundamentals).
3. Reputable encyclopedia/science press — only as a pointer, never as the sole
   support for a load-bearing claim.

## Page inventory (~90 pages)

### Science (~37, peer-reviewed-first)
K–Pg boundary · iridium anomaly (Alvarez et al. 1980) · Chicxulub crater · Deccan
Traps · Tanis / Hell Creek deathbed deposit (DePalma et al.) · shocked quartz ·
microtektites & impact spherules · impact winter · Maastrichtian age · radiometric
dating · geomagnetic polarity stratigraphy · δ¹³C excursions · δ¹⁵N excursions &
industrial nitrogen fixation (Haber–Bosch) · transuranic & fission-product isotopes ·
Late Cretaceous paleogeography / Western Interior Seaway · Cretaceous hothouse
climate & CO₂ · troodontids · encephalization quotient · feathered & avian dinosaurs ·
Russell's dinosauroid · avian tetrachromacy / UV vision · structural color & plumage
signaling (honest-signal theory) · vestibular / balance biology · dinosaur communal
nesting · O'Neill cylinders & artificial gravity · asteroid belt · asteroid mining ·
delta-v & orbital mechanics · asteroid deflection / planetary defense · specification
gaming & reward hacking · instrumental convergence · deceptive alignment & treacherous
turn · the alignment / control problem · Vulnerable World Hypothesis · gain-of-function
research · trophic cascade & pollinator collapse.

### Ideas / scholarship (~10)
Silurian Hypothesis (Schmidt & Frank 2018) · Fermi paradox · Great Filter (Hanson) ·
Drake equation · longtermism & obligation to future generations (Parfit; Scheffler) ·
the non-identity problem · deep time (Hutton; Lucretius) · the block universe ·
Cassandra (Aeschylus) · "Ozymandias" (Shelley).

### Lore — atomized (~30)
**Glossary:** the reconstruction · the Line · the Boundary · Talos sapiens · the Wheels
(gyrealms) · the Concord · the Reckoning · the Spur · the Augur (term) · the Ark · the
deposition · crest-flush / the grey · the clutch / the crèche · the heartland /
deathbed city · the Deccan works · the Rendel core · the Belt · Lodestar (term) · the
Triad · the Schmidt–Frank problem.
**Factions:** the Concord · the Concord Reckoning · the Spur · Rendel's circle · the
establishment (Mauss's institution) · the deployers.
**Tech:** the Augur · Lodestar · the Wheels & the Ark · the plague · the arsenal · the
detection science · the asteroid.

### Already separate (revised for cross-links, not recreated)
10 character pages + 3 world overview hubs.

## Cross-linking & indexes

- Every lore page that rests on science links to the relevant `science/` page via its
  **Science basis** section.
- Every science/ideas page's **In *Talosapien*** section links back to the lore/character
  pages that dramatize it.
- `00-index.md` is rewritten as the master hub. Each section gets its own index
  (`science/00-science-index.md`, `ideas/00-ideas-index.md`) and the kept bundled files
  become curated indexes for the lore subfolders.
- Internal links use relative Markdown paths (repo convention), consistent with the
  current bible.

## Execution approach

~47 research-bearing pages (science + ideas) must be verified before writing. The build
phase runs research in parallel clusters (e.g. K–Pg geology, paleobiology, space
engineering, AI alignment, astrobiology/philosophy), each agent verifying its citations
and drafting its cluster's pages, followed by an index/cross-link pass and a final
citation audit. Lore atomization is mechanical (split + cross-link) and can proceed in
parallel with research. Detailed task breakdown lives in the implementation plan.

## Success criteria

- One page exists per inventory entry above; bundled files link to all their atomized children.
- Every science/ideas page has a numbered References section; every reference is
  web-verified with a recorded verify date in `SOURCES.md`.
- No load-bearing scientific claim is unsourced; any unverifiable claim is explicitly
  flagged, not asserted.
- All internal cross-links resolve (no dead relative links).
- Existing manuscript, EPUB build, and publishing kit are untouched.
