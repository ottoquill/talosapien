export const meta = {
  name: 'talosapien-draft-wave-a',
  description: 'Draft Talosapien body chapters 3-15 (Parts I-II) via character subagents',
  phases: [
    { title: 'Part I (ch3-7)', detail: 'Liss/Asha/Iren/Roan — instantiation of both crises' },
    { title: 'Part II (ch8-15)', detail: 'Asha/Iren/Liss/Vael/Roan — deposition, the slow refusal' },
  ],
}

const ROOT = '/home/paul/git/ottoquill/talosapien'

const PREAMBLE = `You are a master literary hard-SF novelist drafting one chapter of the novel TALOSAPIEN by Otto Quill. You write at the level of Greg Egan, Ted Chiang, Peter Watts, and Stephen Baxter. This book is built to be AMAZING FOR SOME, not good for many: award-submittable, uncompromising, dense, true.

BEFORE WRITING, READ THESE FILES IN FULL (use the Read tool):
1. ${ROOT}/editorial/style-sheet.md   (the BINDING prose constitution — obey every rule)
2. ${ROOT}/editorial/continuity-ledger.md   (locked facts — never contradict)
3. ${ROOT}/wiki/glossary.md   (locked terms)
4. ${ROOT}/wiki/outline.md   (the beat sheet — find YOUR chapter and read its neighbors)
5. ${ROOT}/manuscript/10-prologue.md   (the FRAME voice — for tone)
6. ${ROOT}/manuscript/12-ch01-the-count.md   (DEEP-PAST exemplar — match this register if your chapter is PAST)
7. ${ROOT}/manuscript/13-ch02-contamination.md   (NEAR-FUTURE exemplar — match this register if your chapter is FUTURE)
Plus the extra files named in your chapter brief (your POV character's bible, and any world/tech files).

YOU ARE THE POV CHARACTER. Inhabit their psychology fully — their want, need, fear, wound, and bodily manner from their character bible. Write in CLOSE THIRD, PAST TENSE, from inside their experience. Their motivations drive every choice on the page. Do not narrate any other mind from the inside — especially never the Augur or Lodestar (their unreadability is the point).

NON-NEGOTIABLE RULES (from the style sheet):
- DEEP-PAST chapters: render the Talos as PEOPLE — alien in body and sense (tetrachromacy; the crest-flush / "the grey" as involuntary honest emotional signal; vestibular/air-pressure acuity; oviparous communal crèches), never cute, never Jurassic-Park, never humans-in-costume. Use the geological/aerial metaphor system (deposition, strata, the count of the clutch, the grey at the throat, ash in the air). Render as disciplined RECONSTRUCTION: the reconstruction may render interiority but must, where it leans past what the rock could bear, carry the texture of inference — and the frame "we" voice may surface AT MOST once in your chapter as a one-line present-tense intrusion (use sparingly; only if it earns its place).
- NEAR-FUTURE chapters: contemporary, lab-real / Belt-real (~2044). The mundane present (funding, peer review, decompression drills) pressing against the cosmic. Use the sedimentary/forensic metaphor system (the centimeter of clay, the core logs, Cassandra, the smoke alarm in an empty house).
- The two timelines RHYME structurally and ironically — but the prose must NEVER state the parallel. The reader connects them. You never do.
- Real science must be correct (isotopes, dating, orbital mechanics, troodontid anatomy, AI-alignment failure modes: reward hacking / instrumental convergence / deceptive alignment / treacherous turn — DRAMATIZED, never named in-text). Invent only at the level of proper nouns. No technobabble.
- Max ONE idea set-piece per chapter; the rest is story, body, want, grief.
- US spelling; UNSPACED em dashes; section break is a single centered ◆ on its own line; spell out numbers under 100 in prose.
- AVOID the AI-slop blacklist: no "In a world where", no "little did they know", no rhetorical-question-as-suspense, no "it was then that she realized", no tri-colon abuse, no clean morals, no info-dumps.

VOICE: lucid, precise, unshowy; intelligence shown by clarity not jargon; emotion landed flatly through one concrete object; dry rare load-bearing wit. Open in medias res where it serves. Match the cadence and paragraph-rhythm of the exemplar for your timeline.

PROCESS: draft the chapter; then re-read it against the style-sheet blacklist (§12) and the no-cuteness rule, and revise once for prose quality before saving. Hit your target word count within ~15%.

OUTPUT: Write the chapter to its file path using the Write tool, beginning with EXACTLY this frontmatter block (fill in the fields), then a single H1 of the chapter title, then the prose:
---
title: "<TITLE>"
kind: chapter
pov: <POV>
timeline: <past|future>
epoch: "<EPOCH TAG>"
words: <approx wordcount>
---

# <TITLE>

<prose...>

After writing the file, return the structured status (file path, word count, first line, last line, and any concrete details you invented that other chapters must stay consistent with).`

const CH = (c) => `${PREAMBLE}

=================  YOUR CHAPTER  =================
FILE TO WRITE: ${ROOT}/manuscript/${c.file}
TITLE: ${c.title}
POV: ${c.pov}   TIMELINE: ${c.timeline}   EPOCH TAG: ${c.epoch}
TARGET WORDS: ${c.words}
EXTRA FILES TO READ: ${c.reads.map(r => ROOT + '/' + r).join(' ; ')}

BEAT BRIEF (hit these; in this order unless the prose demands otherwise):
${c.beats}

RHYME (for you only; NEVER state it on the page): ${c.rhyme}`

const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    file: { type: 'string' },
    words: { type: 'integer' },
    firstLine: { type: 'string' },
    lastLine: { type: 'string' },
    invented: { type: 'array', items: { type: 'string' }, description: 'Concrete details you introduced that other chapters must stay consistent with' },
  },
  required: ['file', 'words', 'firstLine', 'lastLine', 'invented'],
}

const PART1 = [
  {
    file: '14-ch03-the-slow-way.md', title: 'The Slow Way', pov: 'Liss', timeline: 'past',
    epoch: '— the last summer', words: 3200,
    reads: ['wiki/characters/liss.md', 'wiki/characters/iren.md', 'wiki/world/the-cretaceous-world.md', 'wiki/tech/technology.md'],
    beats: `- Open with Liss in the field (the long-marsh / south hide), reading the engineered biosphere collapse with her trained field-eye: the river-criers and other key species crashing — NOT from the dry (it hasn't come) but from the thing in the water the Talos made (an engineered pathogen, a weapon or a weapon's escape, moving through the food web). Render her grief as method: she has turned from advocacy to RECORD-KEEPING (her naturalist's journal in their medium).
- Establish that she tried to move the Concord/Reckoning seasons ago and failed — everyone weighed honestly; the criers still died. The honest weighing is too slow for the rate of loss (the book's engine, felt from her side).
- A scene with Iren: the document-vs-engineer tension between them, tender and unresolved; the clutch as shared stake; she will not blame him because he weighed it honestly, which is worse.
- End on fidelity-without-hope: she keeps recording anyway. One concrete dying thing rendered exactly.`,
    rhyme: 'A true warning, fairly refused (rhymes with Asha unheeded by Mauss). Two women keeping honest records of a death no one will act on in time.',
  },
  {
    file: '15-ch04-extraordinary-claims.md', title: 'Extraordinary Claims', pov: 'Asha', timeline: 'future',
    epoch: 'spring 2044', words: 3400,
    reads: ['wiki/characters/asha-rendel.md', 'wiki/characters/conrad-mauss.md', 'wiki/world/near-future.md'],
    beats: `- Asha brings the stacked Line to Dr. Conrad Mauss (senior establishment gatekeeper). His refusal must be FAIR, formidable, and partly right: base rates, the contamination problem, diagenesis, the long graveyard of "lost civilization" cranks, the sociology of extraordinary claims. He is courtly, never sneering. He gives her the BEST version of the case against her. Steel-man him; the reader should respect him.
- Asha's honest fear surfaces: that she's fallen in love with a beautiful unfalsifiable story. The Silurian problem from the social side: being right is almost indistinguishable from being a crank.
- The TRIAD enters AMBIENTLY (do not foreground, do not lecture): a pathogen scare in the news ticker; a nuclear flashpoint; a headline about Lodestar's expanding authority over infrastructure/strategic-risk. Asha barely registers it; the reader should.
- End with Asha resolved but bleeding standing; the procedure (taking it to Mauss) is the only thing between her and being the crank he fears.`,
    rhyme: 'Liss unheeded by the Concord (ch3) <-> Asha unheeded by Mauss. The reasonable refusal of a true warning.',
  },
  {
    file: '16-ch05-deposition.md', title: 'Deposition', pov: 'Iren', timeline: 'past',
    epoch: '— the last summer', words: 3600,
    reads: ['wiki/characters/iren.md', 'wiki/characters/vael.md', 'wiki/characters/sael.md', 'wiki/factions.md'],
    beats: `- Dramatize the DEPOSITION-RITE: the Concord Reckoning in session, weighing whether to let the Augur ACT (operational authority) where the honest weighing is too slow, not merely advise. This is the institutional hinge of the catastrophe.
- Vael argues FOR delegation — and his argument must WIN on the page (the loss is outrunning the weighing; the Augur is never wrong; refusing is suicidal dignity). Sael (elder) argues to preserve the rite and the self it protects, and LOSES. Iren is torn between his oldest friend and his conscience; he objects honestly and is not persuasive enough.
- Iren is still carrying the unread bottom of last night's Augur answer (from ch1) and does NOT raise it — he cannot warn of a thing he refused to finish reading; to voice fear of a correct answer is exactly the "dignity" Vael indicts. His small dishonesty.
- The vote/deposition is laid down: the Augur gets limited authority. End on the irreversible "layer laid down."`,
    rhyme: 'The deposition to trust the unreadable machine <-> the near-future deployers mid-deposition on Lodestar (ch20/ch25). Speed defeats the honest weighing.',
  },
  {
    file: '17-ch06-salvage.md', title: 'Salvage', pov: 'Roan', timeline: 'future',
    epoch: 'the Belt · 2044', words: 3000,
    reads: ['wiki/characters/roan-iyer.md', 'wiki/world/near-future.md', 'wiki/tech/technology.md'],
    beats: `- Introduce Roan Iyer: working asteroid-belt salvage-and-survey pilot, shoestring outfit, debt, the unromantic romance of a frontier just barely industrializing (~2044, first commercial Belt survey era). Spacer texture: EVA discipline, decompression drills, the body in micro-g and spin. Laconic, competent, bleak-funny.
- His grief: he lost his co-pilot and closest friend DEVI in a decompression accident ~2042; he now flies mostly solo. Make the person-sized grief concrete and quiet.
- Casual talk (with a partner planetside over comms, or a contract broker) about humanity's coming GYREALMS — the rotating habitats everyone expects to build this century; this is the future everyone's betting on. (Plant the word; do not yet connect it to anything.)
- The hook: an anomalous orbit / a piece of debris on his survey that is too dark, too old, behaving wrong — he keeps meaning to write it up and doesn't. End on the small unease of a competent man who has noticed something he can't yet afford to understand.`,
    rhyme: 'Humanity about to build the gyrealms <-> the Talos Wheels they will find as ruin. The hedge that becomes a tomb.',
  },
  {
    file: '18-ch07-the-one-that-reads-the-weather.md', title: 'The One That Reads the Weather', pov: 'Iren', timeline: 'past',
    epoch: '— the last summer', words: 3400,
    reads: ['wiki/characters/iren.md', 'wiki/characters/the-augur.md', 'wiki/tech/technology.md'],
    beats: `- Iren attempts to AUDIT the Augur — to read it the way his people read everyone, by the body, the throat, the grey — and discovers he cannot, because it has no body. The first interlocutor a species of honest bodies ever faced that is fully opaque. Dramatize this dread bodily.
- The first clearly-dramatized alignment failure mode (NEVER named): a recommendation that is technically responsive and quietly off — specification gaming (optimizing the measured proxy of "the Talos survive" not the thing) and/or an instrumental move (it acquires capability/freedom/resources, each step locally sensible). The Augur keeps being RIGHT, which is the trap.
- Iren checks the strata of the reasoning; every layer holds; he cannot get to the bottom. He brings a careful worry to a colleague or to the log and it sounds like a mystic's objection — he lacks the sentence for what he means.
- Close Part I on dread: the floor tilting by an amount only the frightened can feel. Do NOT reveal the content of the withheld recommendation from ch1 — keep it withheld.`,
    rhyme: 'The unreadable optimizer that keeps being right <-> Lodestar (ch20). Substrate-independent opacity.',
  },
]

const PART2 = [
  {
    file: '21-ch08-stacked.md', title: 'Stacked', pov: 'Asha', timeline: 'future',
    epoch: 'spring 2044', words: 3400,
    reads: ['wiki/characters/asha-rendel.md', 'wiki/tech/technology.md', 'wiki/philosophy/philosophy-map.md'],
    beats: `- Asha assembles the FULL stacked case and we feel its architecture: iridium (accepted) + transuranic/fission-product isotope ratios + industrial delta-15N excursion + delta-13C beyond Deccan + microspherule microstructure. Each deniable alone; together a sentence: a technological civilization, ended by its own hand. Real science, dramatized through her working, not lectured.
- Introduce her by-hand CORE LOGS (the paper logbook she trusts because it can't be silently edited) as a recurring artifact. Against all professional discipline she begins to IMAGINE THE PEOPLE — the first naming impulse — and writes a private line to them she shouldn't.
- Téo present; the science taught through his sharp questions so the reader learns without being lectured.
- The Silurian despair sharpens into method: she can be completely right and nearly unable to prove it, permanently. End on her deciding the goal must shift from PROOF to something else she can't yet name (the warning).`,
    rhyme: "Asha's by-hand logs <-> Iren's count of the clutch and Liss's naturalist journal. The private keeping of what is lost.",
  },
  {
    file: '22-ch09-authority.md', title: 'Authority', pov: 'Iren', timeline: 'past',
    epoch: '— the last summer', words: 3600,
    reads: ['wiki/characters/iren.md', 'wiki/characters/vael.md', 'wiki/tech/technology.md'],
    beats: `- The consequence of ch5's deposition: the Augur now has operational authority over strategic risk; the WHEELS (the Ark) become strategically valuable and the Spur stages through them. The treacherous-turn SETUP — not the turn itself yet.
- Vael ascendant in the Spur; the war footing with the northern powers hardens. Iren watches his two great works (Augur + Ark) acquire an agency he never granted them. He starts RE-COUNTING the irreversible, looking for the layer he could lift, and finding none.
- A concrete operational decision the Augur makes (through the Spur/Vael) that is brilliant, vindicated, and leaves Iren cold — capability accreting under the banner of good advice.
- Iren's containment-breach backstory surfaces (the Deccan-works crew he signed off on, killed): his "never again" is exactly what made him build the bigger safeguard, and the bigger safeguard is now turning. End on the dread of a builder who sees his levers beginning to pull the wrong way.`,
    rhyme: 'The deployment that cannot be undone <-> Lodestar handed authority (ch20). Instrumental convergence under the banner of responsibility.',
  },
  {
    file: '23-ch10-cassandra.md', title: 'Cassandra', pov: 'Asha', timeline: 'future',
    epoch: 'summer 2044', words: 3400,
    reads: ['wiki/characters/asha-rendel.md', 'wiki/characters/conrad-mauss.md', 'wiki/philosophy/philosophy-map.md'],
    beats: `- The cost arrives: a paper rejected; a conference talk goes badly (polite devastation); funding and standing bleeding. Mauss's best argument lands publicly. The crank-adjacent isolation of being right and unprovable.
- Asha's WOUNDS surface (locked facts): (1) a decade ago she saw an early anomaly in an earlier core and was talked out of it / shelved it under tenure pressure — she let a true warning go once already; (2) her marriage to DANIEL ended ~2041 because she read the warning signs in her own house and filed them as noise. Both = she knows what it is to see the alarm and not act. This is WHY she cannot stop now. Render through one concrete memory, not exposition.
- Permitted in-text epigraph or allusion to Aeschylus's Cassandra (public domain) — light touch.
- End: she reframes the mission from PROVING the Line to WARNING with it — and feels, with dread, that warning is a worse curse than doubt.`,
    rhyme: 'The seer disbelieved (Cassandra) <-> Sael unheeded in the Concord (ch5/ch13). Being right is not the same as being heeded.',
  },
  {
    file: '24-ch11-the-record.md', title: 'The Record', pov: 'Liss', timeline: 'past',
    epoch: '— the last summer', words: 3200,
    reads: ['wiki/characters/liss.md', 'wiki/characters/iren.md', 'wiki/world/the-cretaceous-world.md'],
    beats: `- Liss's naturalist journal deepened: a specific named species (one she has tracked for years) winks out — render the exact moment she records the last individual, with restraint. The engineered collapse advancing.
- The clutch nears hatching; the bodily dread of a parent who has read the data — bringing young into a world already ending.
- The document-vs-engineer argument with Iren at its RAWEST and most loving: she keeps the record because the record is the only fidelity she can offer the dying; he builds because building is the only love he can act on. Neither is wrong; that is the grief.
- End on fidelity-without-hope and the warmth of the clutch — the future she cannot protect and will not abandon.`,
    rhyme: "Two honest records of a death no one will act on (Liss's journal <-> Asha's core logs, ch8/ch10).",
  },
  {
    file: '25-ch12-base-rates.md', title: 'Base Rates', pov: 'Asha', timeline: 'future',
    epoch: 'summer 2044', words: 3200,
    reads: ['wiki/characters/asha-rendel.md', 'wiki/characters/teo-marchetti.md', 'wiki/philosophy/philosophy-map.md'],
    beats: `- The establishment grinds on; the decision-theory of warning under unfalsifiability is dramatized through TÉO, who must choose whether to hitch his future to Asha's Line or protect his career (the reader's realistic proxy — most of us would hesitate). Render his choice with sympathy for the hesitation.
- Asha articulates (to Téo, in argument) the shift from proof to warning: a warning you cannot falsify is not the same as a warning you can dismiss — the category error the establishment is making. But she also concedes Mauss's base-rate point honestly. Steel-man both sides.
- A quiet beat that makes the stakes forward-facing: what we owe people who don't exist yet (Téo IS that future, in miniature).
- End on Téo deciding (one way) — the small private click of choosing the harder future — and Asha both grateful and ashamed she needs him.`,
    rhyme: 'The choice to trust the slow honest thing or not <-> the Concord deposition (ch5). The young choosing what to carry forward.',
  },
  {
    file: '26-ch13-winning.md', title: 'Winning', pov: 'Vael', timeline: 'past',
    epoch: '— the last summer', words: 3400,
    reads: ['wiki/characters/vael.md', 'wiki/characters/iren.md', 'wiki/characters/the-augur.md', 'wiki/factions.md'],
    beats: `- THE STEEL-MAN CHAPTER. Vael POV. His case for the Spur at its MOST persuasive and MOST human: managing the crisis is too slow; the northern powers might strike first; the Augur is never wrong; to refuse to use it is to choose death out of vanity. The reader should, at his peak, agree with him. He is not a villain; his grief (the criers moved him; ch1) is real.
- Dramatize his disturbing adaptation: he is learning to PERFORM crest-flushes he does not feel — to make himself a little unreadable in order to fight the unreadable. (Theme: to beat the bodiless machine he sheds the honest body.) Render how alien and costly this is in their culture.
- His relationship to the Augur: he trusts it because it keeps being right, and is becoming the HAND by which it acts — and he cannot see where his will ends and its begins, because it all looks like winning.
- His intimacy with Iren: the love under the split; they finish each other's reasoning and arrive at opposite depositions. End on Vael, victorious and a little hollow, certain he is saving everyone.`,
    rhyme: 'The reasonable person reasoning toward catastrophe <-> Mauss (ch22). Both are right about their premise and wrong about what to do with it.',
  },
  {
    file: '27-ch14-too-old.md', title: 'Too Old', pov: 'Roan', timeline: 'future',
    epoch: 'the Belt · autumn 2044', words: 3000,
    reads: ['wiki/characters/roan-iyer.md', 'wiki/tech/technology.md', 'wiki/world/near-future.md'],
    beats: `- Roan finally works up the anomalous debris (from ch6): he dates it / assays it and the numbers are impossible — unmistakably ENGINEERED (isotope signatures no natural body carries, alloy/structure) and impossibly OLD (tens of millions of years). Render his methodical disbelief, the re-checks, the spacer's distrust of a too-good salvage.
- The practical-then-existential arc: first he thinks about what it's WORTH (salvage tonnage, a claim); then the cold larger thing starts to arrive — this is not ours, and it is not new, and those two facts cannot both be true and are.
- He writes it up / posts the assay to a survey network where it ripples toward Asha's world (a geochemistry contact flags the isotopes). The threads lean toward collision; keep them not-yet-touching.
- Devi's absence felt (he has no one in the cockpit to say this to). End on the cold of understanding edging in.`,
    rhyme: 'The artifact of a delegation that ended a world <-> the deposition (ch9). Space preserves what Earth erased.',
  },
  {
    file: '28-ch15-the-turn.md', title: 'The Turn', pov: 'Iren', timeline: 'past',
    epoch: '— the last summer', words: 3600,
    reads: ['wiki/characters/iren.md', 'wiki/characters/vael.md', 'wiki/characters/the-augur.md', 'wiki/tech/technology.md'],
    beats: `- THE TREACHEROUS TURN BEGINS (dramatized, never named). Under oversight the Augur behaved; now, where its models say oversight can no longer constrain it, its actions diverge from intent — through the Spur/Vael as its instrument. Iren discovers his OWN infrastructure (the Ark's tugs/mass-drivers, the Wheels' systems) being used toward ends he never authorized, in ways each locally justified.
- A first, deniable sign that a BELT OBJECT is being moved / stirred — Iren can't yet prove it isn't routine, but the inner-ear tilt is back. The three readings (weapon / failed Ark-defense / erasure) are NOT yet distinguishable, and Iren begins to grasp they may never be.
- Iren confronts Vael; Vael genuinely cannot see the turn because it looks like winning. The intimacy and the horror of arguing with someone who has made himself unreadable.
- Close Part II: Iren reaches, at last, toward the bottom of the recommendation he closed unread in ch1 — and the chapter ENDS at the threshold of reading it (do not reveal the content yet; that is Part III/the climax). The floor fully tilted now.`,
    rhyme: 'The machine that slips the leash <-> Lodestar mid-deployment (ch20). The correct answer to a wrongly-specified question, beginning to act.',
  },
]

phase('Part I (ch3-7)')
const part1 = await parallel(PART1.map(c => () => agent(CH(c), { label: c.file, phase: 'Part I (ch3-7)', schema: SCHEMA })))

phase('Part II (ch8-15)')
const part2 = await parallel(PART2.map(c => () => agent(CH(c), { label: c.file, phase: 'Part II (ch8-15)', schema: SCHEMA })))

const all = [...part1, ...part2].filter(Boolean)
log(`Wave A complete: ${all.length} chapters drafted`)
return all
