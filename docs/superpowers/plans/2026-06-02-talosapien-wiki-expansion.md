# Talosapien Wiki Expansion — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Atomize the *Talosapien* story bible into one page per entry, add a dedicated cited page for every real scientific/scholarly subject the book references, and guarantee zero scientific hallucinations via web-verified, peer-reviewed-first citations.

**Architecture:** Markdown files in `wiki/`, no build step. Three new typed trees — `science/`, `ideas/`, `lore/` — plus a master citation ledger `science/SOURCES.md`. Research-bearing pages (science + ideas) are written only after their citations are web-verified and recorded in `SOURCES.md`. Lore atomization is mechanical splitting + cross-linking from the existing bundled files. Existing bundled files become curated hub/index pages. Existing character and world pages get a cross-link pass.

**Tech Stack:** Markdown; WebSearch + WebFetch for source verification; `grep`/`find` for link and structure checks. No code, no compiler.

**Spec:** `docs/superpowers/specs/2026-06-02-talosapien-wiki-expansion-design.md`

---

## Conventions (apply to every task)

**Internal links:** relative Markdown paths from the file's own location, e.g. from
`wiki/lore/tech/the-augur.md` link to a science page as
`[instrumental convergence](../../science/instrumental-convergence.md)`. Match the
existing bible's relative-link style. Link text is the human name; never expose `[[wikilink]]`
double-bracket syntax in committed pages (that style is internal-note only).

**Filenames:** kebab-case, ASCII only, `.md`. Strip diacritics and symbols
(`δ¹³C excursion` → `d13c-excursion.md`; `"Ozymandias"` → `ozymandias.md`).

**Citation discipline (NON-NEGOTIABLE — this is the whole point of the project):**
1. Before writing any factual scientific/scholarly claim, run **WebSearch** for the source,
   then **WebFetch** the actual article/abstract/authoritative page to confirm (a) the claim
   is true and (b) the bibliographic details are correct (authors, year, journal, volume,
   pages, DOI).
2. Write the citation ONLY after that confirmation. Never cite from memory.
3. Record every verified citation in `wiki/science/SOURCES.md` with the URL/DOI checked and
   the verify date (2026-06-02 or later).
4. Any claim you cannot verify against a real source: write it as
   `[unverified — no source located]` in the page AND add a line to a
   `## Unverified claims` list at the bottom of `SOURCES.md`. Never silently assert it.

**Source preference order:** (1) peer-reviewed journal article with DOI; (2) peer-reviewed
review / authoritative body (USGS, NASA, NIH, IPCC, NOAA, ESA) / standard reference text where
no single journal article fits (e.g. O'Neill cylinders, delta-v basics); (3) reputable
encyclopedia/science press only as a pointer, never as sole support for a load-bearing claim.

**Page templates:** defined in the spec, §"Page templates". Reproduced inline where first used.

**Verification check after every page-producing task** ("the test"):
```bash
# 1. Every new science/ideas page has a References section:
for f in <files-created-this-task>; do grep -q "^## References" "$f" || echo "MISSING REFS: $f"; done
# 2. No accidental [[wikilink]] syntax leaked into committed pages:
grep -rn "\[\[" <files-created-this-task> && echo "LEAKED WIKILINK SYNTAX" || echo "ok"
# 3. Every relative link target exists (run the link-check script from Task 1):
python3 build/workflows/check_wiki_links.py <files-created-this-task>
```
Expected: no `MISSING REFS`, prints `ok`, link-check prints `ALL LINKS RESOLVE`.

---

## Task 1: Scaffolding — directories, link-checker, SOURCES ledger

**Files:**
- Create: `wiki/science/`, `wiki/ideas/`, `wiki/lore/glossary/`, `wiki/lore/factions/`, `wiki/lore/tech/` (directories)
- Create: `wiki/science/SOURCES.md`
- Create: `build/workflows/check_wiki_links.py`

- [ ] **Step 1: Create the directory tree**

```bash
cd /home/paul/git/ottoquill/talosapien
mkdir -p wiki/science wiki/ideas wiki/lore/glossary wiki/lore/factions wiki/lore/tech
```

- [ ] **Step 2: Create the citation ledger `wiki/science/SOURCES.md`**

```markdown
# SOURCES — Verified Citation Ledger

Every scientific/scholarly citation used anywhere in `wiki/science/` or `wiki/ideas/` is
recorded here after being web-verified against the real source. Format:

`[key]` Author(s) (year). "Title." Venue vol(issue):pages. doi/URL — *verified YYYY-MM-DD*

Pages cite by re-stating the full reference in their own `## References` section; this ledger
is the auditable master list and dedup point.

## Verified

<!-- append entries here as they are verified -->

## Unverified claims

<!-- any claim that could not be sourced, with the page it appears on -->
```

- [ ] **Step 3: Write the link-checker `build/workflows/check_wiki_links.py`**

```python
#!/usr/bin/env python3
"""Check that every relative Markdown link in the given files (or all of wiki/) resolves.
Usage: check_wiki_links.py [file ...]   (no args = check all of wiki/)"""
import os, re, sys, glob

LINK = re.compile(r'\[[^\]]*\]\(([^)]+)\)')
root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

def files(argv):
    if argv:
        return argv
    return glob.glob(os.path.join(root, "wiki", "**", "*.md"), recursive=True)

bad = []
for f in files(sys.argv[1:]):
    base = os.path.dirname(os.path.abspath(f))
    with open(f, encoding="utf-8") as fh:
        text = fh.read()
    for m in LINK.finditer(text):
        target = m.group(1).split('#')[0].strip()
        if not target or target.startswith(('http://', 'https://', 'mailto:')):
            continue
        if not os.path.exists(os.path.normpath(os.path.join(base, target))):
            bad.append((f, target))

if bad:
    for f, t in bad:
        print(f"BROKEN LINK: {f} -> {t}")
    sys.exit(1)
print("ALL LINKS RESOLVE")
```

- [ ] **Step 4: Verify the checker runs on the current (pre-change) wiki**

Run: `python3 build/workflows/check_wiki_links.py`
Expected: `ALL LINKS RESOLVE` (the existing bible's links are already valid).

- [ ] **Step 5: Commit**

```bash
git add wiki/science/SOURCES.md build/workflows/check_wiki_links.py
git commit -m "wiki: scaffold science/ideas/lore trees, citation ledger, link-checker"
```

---

## Task 2: Atomize the glossary (lore/glossary/)

**Files:**
- Create one page per term listed below under `wiki/lore/glossary/`.
- Source content: `wiki/glossary.md` (split, do not invent — preserve the locked definitions verbatim where possible, expand only with what other bible pages already establish).

**Pages to create (filename ← term):**
`the-reconstruction.md`, `the-line.md`, `the-boundary.md`, `talos-sapiens.md`,
`the-wheels.md`, `the-concord.md`, `the-reckoning.md`, `the-spur.md`, `the-augur.md`,
`the-ark.md`, `the-deposition.md`, `crest-flush.md`, `the-clutch.md`,
`the-heartland-city.md`, `the-deccan-works.md`, `the-rendel-core.md`, `the-belt.md`,
`lodestar.md`, `the-triad.md`, `the-schmidt-frank-problem.md`.

- [ ] **Step 1: Create each glossary page using the lore template**

For each term, create `wiki/lore/glossary/<file>.md`:
```markdown
# <Term>

**Type:** lore (glossary) · **Era:** deep past | near future | frame

## Summary
<the locked glossary definition, verbatim or lightly expanded>

## Details
<anything the existing bible (world/, characters/, tech/) already establishes; no invention>

## Science basis
<links to science/ or ideas/ pages this rests on, if any — e.g. the-line.md links to
science/iridium-anomaly.md, science/transuranic-fission-isotopes.md;
the-schmidt-frank-problem.md links to ideas/silurian-hypothesis.md>

## See also
<relative links to related lore/characters/factions pages>
```
Example — `wiki/lore/glossary/the-line.md` "Science basis" section:
```markdown
## Science basis
- [The iridium anomaly](../../science/iridium-anomaly.md) — the real, accepted signal.
- [Transuranic & fission-product isotopes](../../science/transuranic-fission-isotopes.md) —
  the in-world anomalies layered on top of it.
- [δ¹³C and δ¹⁵N excursions](../../science/d13c-d15n-excursions.md).
```
Cross-link rule: every term that maps to a science/ideas subject MUST link it here. Leave
`## Science basis` out entirely for purely fictional terms (e.g. the-deposition, the-grey).

- [ ] **Step 2: Run the verification check**

```bash
python3 build/workflows/check_wiki_links.py wiki/lore/glossary/*.md
grep -rn "\[\[" wiki/lore/glossary/ && echo "LEAKED" || echo "ok"
```
Expected: `ALL LINKS RESOLVE` (science targets may not exist yet — see note), `ok`.
NOTE: Science-basis links will point at pages created in Tasks 6–10. If running this task
first, the link-checker will report those as broken; that is expected until Task 11's final
pass. Either (a) run glossary atomization AFTER the science tasks, or (b) accept the
forward-reference warnings now and rely on Task 11 to confirm all links resolve. Recommended
order: Tasks 6–10 (science) → Tasks 2–4 (lore) → Task 11.

- [ ] **Step 3: Commit**

```bash
git add wiki/lore/glossary/
git commit -m "wiki: atomize glossary into one page per term"
```

---

## Task 3: Atomize the factions (lore/factions/)

**Files:**
- Create under `wiki/lore/factions/`: `the-concord.md`, `the-concord-reckoning.md`,
  `the-spur.md`, `rendels-circle.md`, `the-establishment.md`, `the-deployers.md`.
- Source content: `wiki/factions.md`.

- [ ] **Step 1: Create each faction page**

Template per page:
```markdown
# <Faction>

**Type:** lore (faction) · **Era:** deep past | near future

## Summary
## Want / Premise / Method
<the faction's legitimate claim, its method-is-the-question framing — from factions.md>
## Key figures
<links to character pages: e.g. the-spur.md -> [Vael](../../characters/vael.md)>
## Structural rhyme
<its cross-era counterpart, from the factions.md table — link the paired faction>
## See also
```

- [ ] **Step 2: Verification check**

```bash
python3 build/workflows/check_wiki_links.py wiki/lore/factions/*.md
grep -rn "\[\[" wiki/lore/factions/ && echo "LEAKED" || echo "ok"
```
Expected: `ALL LINKS RESOLVE`, `ok`.

- [ ] **Step 3: Commit**

```bash
git add wiki/lore/factions/
git commit -m "wiki: atomize factions into one page each"
```

---

## Task 4: Atomize the technology entries (lore/tech/)

**Files:**
- Create under `wiki/lore/tech/`: `the-augur.md`, `lodestar.md`, `the-wheels-and-ark.md`,
  `the-plague.md`, `the-arsenal.md`, `the-detection-science.md`, `the-asteroid.md`.
- Source content: `wiki/tech/technology.md`.

These are the lore pages most tightly coupled to science pages. Each MUST have a populated
`## Science basis`.

- [ ] **Step 1: Create each tech page**

Template:
```markdown
# <System>

**Type:** lore (tech) · **Era:** deep past | near future | both

## Summary
## In the story
<what it is and does in-world, from technology.md — keep the "never named in-text" failure
modes framing for the Augur/Lodestar>
## Science basis
<REQUIRED. Links to the real-subject pages. Examples:
 - the-augur.md / lodestar.md -> science/specification-gaming.md,
   science/instrumental-convergence.md, science/deceptive-alignment.md,
   science/alignment-control-problem.md, ideas/vulnerable-world-hypothesis.md
 - the-wheels-and-ark.md -> science/oneill-cylinders.md, science/asteroid-belt.md,
   science/asteroid-mining.md, science/delta-v-orbital-mechanics.md
 - the-plague.md -> science/gain-of-function.md, science/trophic-cascade.md
 - the-arsenal.md -> science/transuranic-fission-isotopes.md
 - the-detection-science.md -> science/iridium-anomaly.md, science/d13c-d15n-excursions.md,
   science/transuranic-fission-isotopes.md, science/microtektites.md,
   science/radiometric-dating.md, science/geomagnetic-polarity-stratigraphy.md,
   science/tanis-deathbed-deposit.md, ideas/silurian-hypothesis.md
 - the-asteroid.md -> science/chicxulub-crater.md, science/shocked-quartz.md,
   science/microtektites.md, science/impact-winter.md,
   science/asteroid-deflection.md, science/delta-v-orbital-mechanics.md>
## See also
```

- [ ] **Step 2: Verification check**

```bash
python3 build/workflows/check_wiki_links.py wiki/lore/tech/*.md
grep -rn "\[\[" wiki/lore/tech/ && echo "LEAKED" || echo "ok"
```
Expected: `ALL LINKS RESOLVE` (after science tasks done), `ok`.

- [ ] **Step 3: Commit**

```bash
git add wiki/lore/tech/
git commit -m "wiki: atomize technology entries, wire to science pages"
```

---

## Task 5: The fully-worked reference example (do this FIRST among the research tasks)

This task produces ONE complete science page end-to-end so the pattern is concrete and the
citation discipline is demonstrated before the clusters fan out. Use
`science/iridium-anomaly.md`.

**Files:**
- Create: `wiki/science/iridium-anomaly.md`
- Modify: `wiki/science/SOURCES.md` (append verified entries)

- [ ] **Step 1: Verify the foundational citation**

Run WebSearch: `Alvarez 1980 Extraterrestrial cause Cretaceous-Tertiary extinction Science iridium`.
Then WebFetch the Science article landing page / DOI record to confirm: authors (Alvarez,
Alvarez, Asaro, Michel), year (1980), journal (Science), volume 208, issue 4448, pages
1095–1108, doi:10.1126/science.208.4448.1095.
Do NOT proceed to write the citation until the fetch confirms these fields.

- [ ] **Step 2: Append to SOURCES.md**

```markdown
`[alvarez1980]` Alvarez, L.W., Alvarez, W., Asaro, F., Michel, H.V. (1980). "Extraterrestrial
Cause for the Cretaceous–Tertiary Extinction." Science 208(4448):1095–1108.
doi:10.1126/science.208.4448.1095 — *verified 2026-06-02*
```
(Add a second verified source on the global synchroneity / later confirmation of the anomaly,
e.g. Schulte et al. 2010 Science review — verify it the same way before adding.)

- [ ] **Step 2.5: Verify the second citation (global synchroneity / consensus)**

WebSearch `Schulte 2010 Chicxulub asteroid impact Cretaceous-Paleogene boundary Science review`,
WebFetch to confirm authors/year/journal/volume/pages/DOI, then append `[schulte2010]` to
SOURCES.md in the same format.

- [ ] **Step 3: Write `wiki/science/iridium-anomaly.md`**

```markdown
# The Iridium Anomaly

**Type:** science · **Used in:** the Line; Asha's case · **Related:** [[chicxulub-crater]]

## Summary
A worldwide spike in the rare platinum-group element iridium found in a thin clay layer at
the Cretaceous–Paleogene (K–Pg) boundary. Iridium is depleted in Earth's crust but enriched in
meteoritic material, so the anomaly is read as the global fallout of a large asteroid impact.

## The science
Iridium is strongly siderophile and was largely sequestered into Earth's core, leaving crustal
rocks iridium-poor; chondritic meteorites retain near-solar iridium abundances. Alvarez and
colleagues (1980) measured anomalously high iridium in boundary clays at Gubbio (Italy),
Stevns Klint (Denmark), and Woodside Creek (New Zealand), and argued the most parsimonious
source was a ~10 km impactor [alvarez1980]. The anomaly was subsequently found at K–Pg sites
worldwide and, together with shocked quartz, spherules, and the Chicxulub crater, underpins the
impact consensus reaffirmed by a large multi-author review [schulte2010].

## Established vs. open
Established: the iridium enrichment is real, global, and impact-sourced. Open/debated: the
relative kill contribution of the impact versus Deccan Traps volcanism, and fine details of
the boundary's depositional time.

## In *Talosapien*
> The iridium anomaly is the real, universally accepted signal Asha starts from — "the Line"
> everyone already believes. The book's speculative move is to layer *additional* anomalies on
> top of it (transuranic/fission-product isotopes, industrial δ¹⁵N, manufactured-looking
> spherule microstructure) that an impact alone cannot explain. The real iridium science is
> never altered; the fiction lives entirely in what is claimed to sit beside it.
> See [The Line](../lore/glossary/the-line.md) and
> [the detection science](../lore/tech/the-detection-science.md).

## See also
- [Chicxulub crater](chicxulub-crater.md)
- [Shocked quartz](shocked-quartz.md)
- [Transuranic & fission-product isotopes](transuranic-fission-isotopes.md)

## References
1. Alvarez, L.W., Alvarez, W., Asaro, F., Michel, H.V. (1980). "Extraterrestrial Cause for the
   Cretaceous–Tertiary Extinction." *Science* 208(4448):1095–1108.
   doi:10.1126/science.208.4448.1095 — *verified 2026-06-02*
2. Schulte, P., et al. (2010). "The Chicxulub Asteroid Impact and Mass Extinction at the
   Cretaceous–Paleogene Boundary." *Science* 327(5970):1214–1218.
   doi:10.1126/science.1177265 — *verified 2026-06-02*
```
(The `[[...]]` in the header `Related:` line is internal shorthand — convert to real relative
links or plain text before commit, per the no-leaked-wikilink rule. Use plain names in the
header; real links go in See also.)

- [ ] **Step 4: Verification check**

```bash
python3 build/workflows/check_wiki_links.py wiki/science/iridium-anomaly.md
grep -q "^## References" wiki/science/iridium-anomaly.md && echo "refs ok"
grep -n "\[\[" wiki/science/iridium-anomaly.md && echo "LEAKED" || echo "ok"
```
Expected: links to not-yet-created siblings will warn (expected pre-Task-11); `refs ok`; `ok`.

- [ ] **Step 5: Commit**

```bash
git add wiki/science/iridium-anomaly.md wiki/science/SOURCES.md
git commit -m "wiki/science: iridium anomaly (worked example, cited+verified)"
```

---

## Tasks 6–10: Science clusters

Each cluster is one task. For EACH page in the cluster, follow the same five-step rhythm as
Task 5: (1) WebSearch + WebFetch to verify every citation, (2) append to SOURCES.md, (3) write
the page using the science template, (4) run the verification check, (5) commit the cluster.
Use the exact science template from Task 5. Populate `In *Talosapien*` from the matching
lore/tech page so the link is reciprocal. These five clusters are independent and may run in
parallel (separate agents / separate commits).

### Task 6: K–Pg geology & impact cluster
**Files (create under `wiki/science/`):** `chicxulub-crater.md`, `deccan-traps.md`,
`tanis-deathbed-deposit.md`, `shocked-quartz.md`, `microtektites.md`, `impact-winter.md`,
`maastrichtian.md`, `kpg-boundary.md`, `radiometric-dating.md`,
`geomagnetic-polarity-stratigraphy.md`.
Anchor sources to verify (examples, not exhaustive — verify each before use): Hildebrand et al.
1991 (Chicxulub, *Geology*); Schoene et al. / Sprain et al. 2019 (Deccan dating, *Science*);
DePalma et al. 2019 (Tanis, *PNAS*); Bohor et al. 1984 (shocked quartz); Renne et al. 2013
(K–Pg ⁴⁰Ar/³⁹Ar age, *Science*). WebFetch each to confirm fields before citing.
- [ ] Verify + write + check + commit each page (Task-5 rhythm). Commit:
  `git commit -m "wiki/science: K–Pg geology & impact cluster (cited+verified)"`

### Task 7: K–Pg geochemistry cluster
**Files:** `d13c-d15n-excursions.md`, `transuranic-fission-isotopes.md`,
`haber-bosch-nitrogen-fixation.md`, `late-cretaceous-paleogeography.md`,
`cretaceous-hothouse-climate.md`.
Note: `transuranic-fission-isotopes.md` must be scrupulous — real isotope geochemistry
(what fission products / transuranics are, half-lives, how they'd appear) with the page's
`In *Talosapien*` clearly flagging that their presence in a 66 Ma layer is the novel's
fictional claim, not a real observation.
- [ ] Verify + write + check + commit. `git commit -m "wiki/science: K–Pg geochemistry cluster"`

### Task 8: Paleobiology & the Talos lineage cluster
**Files:** `troodontids.md`, `encephalization-quotient.md`, `feathered-dinosaurs.md`,
`russell-dinosauroid.md`, `avian-tetrachromacy.md`, `structural-color-signaling.md`,
`vestibular-balance-biology.md`, `dinosaur-communal-nesting.md`.
Anchor sources (verify each): troodontid brain size — e.g. work on *Troodon* EQ; Jerison on
encephalization quotient; avian UV/tetrachromacy vision papers; Russell & Séguin 1982
(dinosauroid, *Syllogeus*); feathered-dinosaur discoveries (e.g. *Sinosauropteryx*,
melanosome/structural-color papers). The `russell-dinosauroid.md` page must note the Talos are
deliberately NOT Russell's humanoid (anthropocentrism critique).
- [ ] Verify + write + check + commit. `git commit -m "wiki/science: paleobiology / Talos lineage cluster"`

### Task 9: Space engineering cluster
**Files:** `oneill-cylinders.md`, `artificial-gravity-rotation.md`, `asteroid-belt.md`,
`asteroid-mining.md`, `delta-v-orbital-mechanics.md`, `asteroid-deflection.md`.
Sources: O'Neill's *The High Frontier* / his 1974 *Physics Today* article (verify);
NASA/ESA planetary-defense pages and the DART mission result (Daly et al. 2023, *Nature*, on
the DART deflection — verify); standard orbital-mechanics reference for delta-v (Tsiolkovsky
rocket equation — cite a textbook/authoritative source, flag as established physics).
`asteroid-deflection.md` is the real-science basis for the in-world "redirect a Belt object"
premise; keep the fiction fenced.
- [ ] Verify + write + check + commit. `git commit -m "wiki/science: space engineering cluster"`

### Task 10: AI alignment & bio-risk cluster
**Files:** `specification-gaming.md`, `instrumental-convergence.md`,
`deceptive-alignment.md`, `alignment-control-problem.md`, `gain-of-function.md`,
`trophic-cascade.md`.
Sources: Bostrom *Superintelligence* (2014) for instrumental convergence / the control
problem; Stuart Russell *Human Compatible* (2019); the specification-gaming / reward-hacking
literature (e.g. Krakovna et al. DeepMind work; Amodei et al. 2016 "Concrete Problems in AI
Safety", arXiv — verify); Hubinger et al. 2019 "Risks from Learned Optimization" for deceptive
alignment (verify); for gain-of-function and trophic cascade, peer-reviewed reviews
(e.g. Estes et al. 2011 "Trophic Downgrading of Planet Earth", *Science* — verify). Note: some
alignment sources are books/arXiv preprints, not journal articles; cite them accurately as
what they are. The Vulnerable World Hypothesis goes in Task 12 (ideas), not here.
- [ ] Verify + write + check + commit. `git commit -m "wiki/science: AI alignment & bio-risk cluster"`

---

## Task 11: Ideas / scholarship pages

**Files (create under `wiki/ideas/`):** `silurian-hypothesis.md`, `fermi-paradox.md`,
`great-filter.md`, `drake-equation.md`, `future-generations-ethics.md`,
`non-identity-problem.md`, `deep-time.md`, `block-universe.md`, `cassandra.md`,
`ozymandias.md`, `vulnerable-world-hypothesis.md`.

Same template and citation discipline. For humanities pages, the "source" is the primary work
plus reputable scholarship; verify bibliographic details (e.g. that the Silurian Hypothesis is
Schmidt & Frank 2018, *International Journal of Astrobiology* 18(2):142–150,
doi:10.1017/S1473550418000095 — confirm via WebFetch) and that public-domain literary works are
correctly attributed (Aeschylus' *Agamemnon*; Shelley's "Ozymandias", 1818).

- [ ] **Step 1:** For each page: verify citation(s), append to SOURCES.md, write the page
  (science template; literary pages may rename `## The science` → `## The idea`).
- [ ] **Step 2:** Verification check on `wiki/ideas/*.md` (refs present, no leaked wikilinks, links resolve).
- [ ] **Step 3: Commit**
```bash
git add wiki/ideas/ wiki/science/SOURCES.md
git commit -m "wiki/ideas: scholarship & philosophy reference pages (cited+verified)"
```

---

## Task 12: Convert bundled files into curated hub/index pages

**Files:**
- Modify: `wiki/glossary.md`, `wiki/factions.md`, `wiki/tech/technology.md`,
  `wiki/philosophy/philosophy-map.md`
- Create: `wiki/science/00-science-index.md`, `wiki/ideas/00-ideas-index.md`
- Modify: `wiki/00-index.md`

- [ ] **Step 1: Rewrite each bundled file as a hub.** Keep the existing narrative overview
  prose (it is valuable), but convert each entry heading into a link to its atomized page.
  Example for `wiki/glossary.md`, the **the Line** entry becomes:
  `- **[the Line](lore/glossary/the-line.md)** — the iridium anomaly at the K–Pg boundary; ...`
  Do this for every entry in glossary.md, factions.md, technology.md, philosophy-map.md.

- [ ] **Step 2: Create section indexes** listing every page:
  `wiki/science/00-science-index.md` (grouped: K–Pg geology, geochemistry, paleobiology,
  space engineering, AI/bio-risk) and `wiki/ideas/00-ideas-index.md`.

- [ ] **Step 3: Rewrite `wiki/00-index.md`** master hub to add the new sections:
  Science (→ science/00-science-index.md), Ideas & Scholarship (→ ideas/00-ideas-index.md),
  and the Lore subfolders (glossary/factions/tech indexes). Keep existing
  Worlds/Characters/Craft sections.

- [ ] **Step 4: Verification check**
```bash
python3 build/workflows/check_wiki_links.py
```
Expected: `ALL LINKS RESOLVE`.

- [ ] **Step 5: Commit**
```bash
git add wiki/
git commit -m "wiki: convert bundled files to hubs, add section indexes, rewrite master index"
```

---

## Task 13: Cross-link pass on characters & world pages

**Files:**
- Modify: `wiki/characters/*.md` (10 files), `wiki/world/*.md` (3 files)

- [ ] **Step 1:** Add a `## Science basis` / `## See also` block to each character/world page
  linking the science/ideas/lore pages relevant to that entity. Examples:
  - `characters/iren.md` → lore/tech/the-augur.md, lore/tech/the-wheels-and-ark.md,
    science/oneill-cylinders.md, ideas/deep-time.md.
  - `characters/asha-rendel.md` → ideas/silurian-hypothesis.md, science/iridium-anomaly.md,
    ideas/cassandra.md, science/tanis-deathbed-deposit.md.
  - `characters/the-augur.md` / `characters/lodestar.md` → the four alignment science pages +
    ideas/vulnerable-world-hypothesis.md.
  - `world/the-talos.md` → science/troodontids.md, science/encephalization-quotient.md,
    science/avian-tetrachromacy.md, science/structural-color-signaling.md,
    science/dinosaur-communal-nesting.md.
  - `world/the-cretaceous-world.md` → science/deccan-traps.md, science/maastrichtian.md,
    science/late-cretaceous-paleogeography.md, science/tanis-deathbed-deposit.md.
  - `world/near-future.md` → the Triad's three science pages + ideas/silurian-hypothesis.md.
  Do NOT rewrite existing prose; only append cross-link sections.

- [ ] **Step 2: Verification check**
```bash
python3 build/workflows/check_wiki_links.py
grep -rn "\[\[" wiki/characters/ wiki/world/ && echo "LEAKED" || echo "ok"
```
Expected: `ALL LINKS RESOLVE`, `ok`.

- [ ] **Step 3: Commit**
```bash
git add wiki/characters/ wiki/world/
git commit -m "wiki: cross-link character & world pages to science/ideas/lore"
```

---

## Task 14: Final audit (the whole-project "test")

**Files:** none created; this verifies the whole tree.

- [ ] **Step 1: All links resolve across the entire wiki**
```bash
python3 build/workflows/check_wiki_links.py
```
Expected: `ALL LINKS RESOLVE`.

- [ ] **Step 2: Every science/ideas page has References**
```bash
for f in wiki/science/*.md wiki/ideas/*.md; do
  case "$f" in */00-*|*/SOURCES.md) continue;; esac
  grep -q "^## References" "$f" || echo "MISSING REFS: $f"
done
echo "refs audit done"
```
Expected: no `MISSING REFS` lines.

- [ ] **Step 3: No leaked internal wikilink syntax anywhere**
```bash
grep -rn "\[\[" wiki/ && echo "LEAKED" || echo "ok"
```
Expected: `ok`.

- [ ] **Step 4: Citation audit — every reference appears in SOURCES.md.**
  Collect every DOI/title cited in any page; confirm each has a matching `*verified*` entry in
  `wiki/science/SOURCES.md`. List any citation NOT in the ledger and any
  `[unverified — no source located]` markers. Report these to the user explicitly; do not
  claim completion while any load-bearing claim is unverified.

- [ ] **Step 5: Inventory check.** Confirm one page exists for every entry in the spec's
  inventory (§"Page inventory"). List any missing.

- [ ] **Step 6: Commit any audit fixes**
```bash
git add wiki/
git commit -m "wiki: final audit — links resolve, references present, citations verified"
```

---

## Self-review notes (author)

- **Spec coverage:** every inventory category (science ~37, ideas ~10, lore ~30, char/world
  cross-links) maps to a task (5–10 science, 11 ideas, 2–4 lore, 13 char/world, 12 hubs).
  Zero-hallucination discipline is enforced in Conventions + every research task + Task 14.
- **Ordering caveat:** lore pages forward-reference science pages. Recommended run order is
  6–10 → 11 → 2–4 → 12 → 13 → 14, so the link-checker is clean by Task 12. Tasks 2–4 may run
  earlier if forward-reference warnings are tolerated until Task 12.
- **Citation example caveat:** the DOIs shown in Tasks 5/11 (Alvarez 1980, Schmidt & Frank
  2018, etc.) are well-known but MUST still be WebFetch-confirmed during execution before being
  written — the plan is not a license to skip verification.
- **Parallelism:** Tasks 6–10 are independent and are the natural unit for parallel agents.
