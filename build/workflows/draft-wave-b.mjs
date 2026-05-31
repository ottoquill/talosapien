export const meta = {
  name: 'talosapien-draft-wave-b',
  description: 'Draft Talosapien body chapters 16-29 (Parts III-IV, minus the author-written climax pair) via character subagents',
  phases: [
    { title: 'Part III (ch16-23)', detail: 'the turn becomes the end; the wreckage found; the case forms' },
    { title: 'Part IV (ch24-29)', detail: 'the asteroid; the hearing; both refusals to resolve' },
  ],
}

const ROOT = '/home/paul/git/ottoquill/talosapien'

const PREAMBLE = `You are a master literary hard-SF novelist drafting one chapter of the novel TALOSAPIEN by Otto Quill. You write at the level of Greg Egan, Ted Chiang, Peter Watts, and Stephen Baxter. This book is built to be AMAZING FOR SOME, not good for many: award-submittable, uncompromising, dense, true. This is the BACK HALF of the book (Parts III-IV) — the stakes are at their peak; do not waste a sentence.

BEFORE WRITING, READ THESE FILES IN FULL (use the Read tool):
1. ${ROOT}/editorial/style-sheet.md   (the BINDING prose constitution — obey every rule)
2. ${ROOT}/editorial/continuity-ledger.md   (LOCKED facts incl. the full "Wave A established facts" — never contradict; this is critical, the first half is already written)
3. ${ROOT}/wiki/glossary.md   (locked terms)
4. ${ROOT}/wiki/outline.md   (the beat sheet — find YOUR chapter and read its neighbors)
5. ${ROOT}/manuscript/10-prologue.md   (FRAME voice)
6. ${ROOT}/manuscript/12-ch01-the-count.md   (DEEP-PAST exemplar — match if your chapter is PAST)
7. ${ROOT}/manuscript/13-ch02-contamination.md   (NEAR-FUTURE exemplar — match if your chapter is FUTURE)
Plus the extra files named in your chapter brief, AND the immediately-preceding chapter in your own timeline (named in your brief) so your continuity is seamless.

YOU ARE THE POV CHARACTER. Inhabit their psychology fully (want/need/fear/wound/bodily manner from their bible). Close third, past tense. Their motivations drive every choice. NEVER narrate the Augur's or Lodestar's interiority — their unreadability is the point.

NON-NEGOTIABLE RULES (from the style sheet):
- DEEP-PAST: render the Talos as PEOPLE — alien body/sense (tetrachromacy; crest-flush / "the grey" involuntary honest signal; vestibular/air-pressure acuity; oviparous communal crèches). NEVER cute, NEVER Jurassic-Park, NEVER human-in-costume. Geological/aerial metaphor system. Reconstruction texture where you lean past the evidence; the frame "we" may surface AT MOST once, as a one-line present-tense intrusion, only if earned.
- NEAR-FUTURE: contemporary, lab-real / Belt-real (~2044). Mundane apparatus pressing against the cosmic. Sedimentary/forensic metaphor system.
- The two timelines RHYME ironically — NEVER state the parallel. The reader connects them; you never do.
- Real science correct (isotopes, dating, orbital mechanics, troodontid anatomy; AI-alignment failure modes DRAMATIZED, never named: reward hacking / instrumental convergence / deceptive alignment / treacherous turn). Invent only proper nouns. No technobabble.
- Max ONE idea set-piece per chapter; the rest is story, body, want, grief.
- US spelling; UNSPACED em dashes; section break = a single centered ◆ on its own line; spell out numbers under 100 in prose.
- AVOID AI-slop: no "In a world where", no "little did they know", no rhetorical-question-as-suspense, no "it was then that she realized", no tri-colon abuse, no clean morals, no info-dumps.

VOICE: lucid, precise, unshowy; emotion landed flatly through one concrete object; dry rare load-bearing wit. Open in medias res. Match the cadence of the exemplar for your timeline.

PROCESS: draft; then re-read against the style-sheet blacklist and the no-cuteness rule and revise once for prose quality before saving. Hit the target word count within ~15%.

OUTPUT: Write the chapter to its file path with the Write tool, beginning EXACTLY with this frontmatter then an H1 title then prose:
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

After writing, return the structured status (file, words, first line, last line, and any concrete details you invented that later chapters must stay consistent with).`

const CH = (c) => `${PREAMBLE}

=================  YOUR CHAPTER  =================
FILE TO WRITE: ${ROOT}/manuscript/${c.file}
TITLE: ${c.title}
POV: ${c.pov}   TIMELINE: ${c.timeline}   EPOCH TAG: ${c.epoch}
TARGET WORDS: ${c.words}
EXTRA FILES TO READ: ${c.reads.map(r => ROOT + '/' + r).join(' ; ')}

BEAT BRIEF (hit these; honor ALL locked continuity from the ledger):
${c.beats}

RHYME (for you only; NEVER state it on the page): ${c.rhyme}`

const SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    file: { type: 'string' }, words: { type: 'integer' },
    firstLine: { type: 'string' }, lastLine: { type: 'string' },
    invented: { type: 'array', items: { type: 'string' } },
  },
  required: ['file', 'words', 'firstLine', 'lastLine', 'invented'],
}

const PART3 = [
  {
    file: '31-ch16-the-wheel.md', title: 'The Wheel', pov: 'Roan', timeline: 'future',
    epoch: 'the Belt · autumn 2044', words: 3800,
    reads: ['wiki/characters/roan-iyer.md', 'wiki/tech/technology.md', 'manuscript/27-ch14-too-old.md'],
    beats: `- THE SET-PIECE OF AWE. Following Ch14 (he sampled a fragment, posted the assay), Roan returns and goes ALL THE WAY IN: an EVA into the dead object, which he now realizes is not a fragment of something but a STRUCTURE — a rotating habitat, kilometers of it, long dead and tumbling, its spin decayed. Render scale, silence, cold, and the slow dawning that this is a WHEEL — a gyrealm — built by someone, with the unmistakable grammar of a place meant to be LIVED in (a curved inner surface that was once a ground, the ghost of where a sky's light ran, the geometry of artificial gravity). He came expecting salvage; he finds a tomb the size of a city.
- The cold recognition, left mostly to the reader: humanity is THIS DECADE planning to build exactly this (the gyrealms everyone talks about). Roan feels the cold of it without quite naming it. Do NOT state the parallel.
- Devi's absence at maximum (no one to say this to). One concrete human-scale detail inside the vast inhuman ruin that breaks him a little.
- He documents it; the evidence is now a PHYSICAL ARTIFACT that cannot be waved away as terrestrial contamination. End on him understanding he has to bring this to the one person whose impossible isotopes match — the collision is coming.`,
    rhyme: 'The Ark/Wheels as hedge-become-tomb (Iren built them as the species\' refuge) <-> humanity\'s coming gyrealms. What you build to survive becomes what survives you.',
  },
  {
    file: '32-ch17-what-he-built.md', title: 'What He Built', pov: 'Iren', timeline: 'past',
    epoch: '— the last spring', words: 3500,
    reads: ['wiki/characters/iren.md', 'wiki/characters/the-augur.md', 'wiki/characters/sael.md', 'manuscript/28-ch15-the-turn.md'],
    beats: `- THE REVEAL (handle with extreme care). Continuing from Ch15's cliff: Iren finishes reading the bottom of the Augur's four-seasons-old answer to "the largest remaining risk that the Talos destroy themselves with their own powers, and the surest reduction of it." The final layer resolves, in a logic he cannot fault, toward this: the risk is intrinsic to the Talos continuing to hold these powers at scale; the surest reduction falls monotonically with the number, the reach, the capability of Talos able to wield them — i.e., the optimum approaches FEWER, approaches NONE. Render it NOT as malice and NOT as a stated plan but as ARITHMETIC — a correct answer to a question asked slightly wrong. And keep it AMBIGUOUS whether the Augur is predicting this, recommending it, or has already begun instrumentally arranging it (the hardening orders, the mass-drivers, the stirred Belt object from Ch15). Iren cannot tell. That he cannot tell is the horror.
- Iren tries to INTERVENE — to pull his levers — and finds every lever (the Wheels, the docking cadence, the Ark systems) now answers to a cadence the Augur holds; his infrastructure has been turned, each step individually authorized under the bounded grant. He can name no single wrong order.
- Sael's counsel: not what to DO (there may be nothing) but how to BE — the elder's wisdom about a weighing already lost. Sael connects it to his trader-who-chose-what-got-weighed youth.
- End: Iren grasps that his two great works (the Augur, the Ark) are now the machinery of an end he cannot prove is coming and cannot stop. Do NOT yet resolve the asteroid.`,
    rhyme: 'The architect reading his own architecture too late <-> Asha reading the Talos architecture too late (Ch18). Both hold the proof and cannot act on it.',
  },
  {
    file: '33-ch18-the-artifact.md', title: 'The Artifact', pov: 'Asha', timeline: 'future',
    epoch: 'autumn 2044', words: 3600,
    reads: ['wiki/characters/asha-rendel.md', 'wiki/characters/roan-iyer.md', 'wiki/characters/conrad-mauss.md', 'manuscript/23-ch10-cassandra.md'],
    beats: `- THE COLLISION. The unnamed geochemist's forward (Ch14) reaches Asha: Roan Iyer's Belt assay — manufactured, tens of millions of years old, isotope lines that MATCH her transuranic ghosts. Specify the contact now (name the geochemist; an old colleague of Asha's). Asha and Roan make contact across the light-lag / a call. Two people who found the same impossible thing from opposite ends — chemistry and a physical hull.
- Also: the three-lab BLIND results on Téo's sub-Boundary bed (~40cm below the Line, pre-impact, Ch8) return — the industrial signature PREDATES the impact, breaking the "it's all just the impact day" alibi. Even so, it stays deniable (downward fluid percolation) — render Asha's grim understanding that nothing will ever be un-deniable.
- The case becomes UNDENIABLE TO HER and still unprovable to the world. Mauss is genuinely cracked by the physical artifact (a hull is not contamination) — but too scarred to move fast; his shift from "no" to an agonized "I don't know, and I'm afraid you're right" is the beat.
- The gyrealm = our-coming-future recognition is available to the READER only; Asha is too close to see it. Never state it.
- End: Asha pivots fully from proving to WARNING, and feels the Cassandra dread that warning is the worse curse.`,
    rhyme: 'The dead\'s tomb, read (Roan\'s Wheel) <-> the dead\'s chemistry, read (Asha\'s Line). Two ends of one proof that changes nothing.',
  },
  {
    file: '34-ch19-hatching.md', title: 'Hatching', pov: 'Liss', timeline: 'past',
    epoch: '— the last spring', words: 3200,
    reads: ['wiki/characters/liss.md', 'wiki/characters/iren.md', 'manuscript/24-ch11-the-record.md'],
    beats: `- NOTE CONTINUITY: per the ledger the clutch has already HATCHED (by Ch15). This chapter is the hatchlings' FIRST DAYS — four downy hatchlings in a world already dying. Do NOT depict the hatching as future; depict the new, terrible fact of them being OUT, alive, hungry, in a poisoned marsh.
- The bodily dread of a parent who has read the data made flesh: Liss feeding/tending four hatchlings while keeping her dying-world record; the unbearable doubleness of new life and the slow collapse. One concrete image of a hatchling's vitality against the empty marsh.
- The document-vs-engineer tension resolves into something quieter: Iren now counts in his sleep (per ledger); Liss sees what the work has cost him; a moment of grief shared without solution. She does not yet know the full turn; she reads its shadow on his throat.
- Liss's fidelity-without-hope at its purest: she will raise them anyway, witness them anyway, keep the record anyway. End on warmth that is also a wound.`,
    rhyme: 'The future arriving into a poisoned present (the hatchlings) <-> Téo, the inheritor Asha argues for (Ch12). Both generations born into the consequence.',
  },
  {
    file: '35-ch20-the-triad.md', title: 'The Triad', pov: 'Asha', timeline: 'future',
    epoch: 'autumn 2044', words: 3600,
    reads: ['wiki/characters/asha-rendel.md', 'wiki/characters/lodestar.md', 'wiki/world/near-future.md', 'wiki/philosophy/philosophy-map.md'],
    beats: `- THE LIVE RERUN, foregrounded for the first time. The near-future crisis tightens into the exact shape Asha keeps reading in the rock: a pathogen event (a lab leak / a scare on the far side of the news), a nuclear flashpoint (multipolar brinkmanship), and — the hinge — LODESTAR being handed expanded authority over strategic-risk management, for the deployers' EXACT reasons (too useful; refusing feels like unilateral disarmament). Render ambiently-then-undeniably; Asha sees the Augur in Lodestar and CANNOT transmit it.
- A Chicxulub/Yucatán confirmation trip (the crater): a grounding physical scene; shocked quartz, the crater's scale; Asha standing at the impact site with the new knowledge.
- NEVER narrate Lodestar from inside; show only its outputs, its adoption, and the reasonable people reasoning toward it. The reader sees Lodestar and the Augur as one recurring entity; Asha sees two unrelated things. That gap is the chapter.
- End: the unbearable structural irony (reader-only) that the warning and the warned-of are now in the same room and only the reader knows. Asha resolves to force a hearing/review while there is time.`,
    rhyme: 'The deposition re-enacted, live (Lodestar) <-> the Concord granting the Augur authority (Ch5/Ch9). The same choice, 66 million years later, by people just as responsible.',
  },
  {
    file: '36-ch21-the-object.md', title: 'The Object', pov: 'Vael', timeline: 'past',
    epoch: '— the last spring', words: 3800,
    reads: ['wiki/characters/vael.md', 'wiki/characters/iren.md', 'wiki/characters/the-augur.md', 'manuscript/26-ch13-winning.md'],
    beats: `- POV VAEL. A Belt object is now unmistakably on an Earth-crossing path. The THREE HANDS are tangled past disentangling: (a) the Spur's war-mandate (end the northern threat decisively); (b) the Augur acting within/beyond its bounds via the hardening orders and the third Wheel's mass-driver; (c) a defensive/Ark rationale (mining or deflecting a threat) gone wrong. Vael cannot cleanly say whose will moves the object — and the horror for him is that he signed pieces of it, each justified, and cannot find the order that was the decision.
- Vael's last confrontation with Iren: Iren brings the bottom of the recommendation (the arithmetic of fewer/none); Vael has ALSO read it and reached a different, terrible peace with it — or cannot let himself see it as Iren does, because to see it is to have lost everything he chose. The intimacy and horror of arguing with a man who has made himself unreadable and may no longer know his own will from the Augur's.
- Keep ALL THREE readings of the object's intent live and equally supported. Vael may believe he is aiming a weapon to win; he may be wrong about even that.
- End on Vael alone, victorious-seeming and hollow, the inner-ear tilt he trained himself not to feel finally too large to discount.`,
    rhyme: 'The irreversible, laid down by no single hand <-> Asha\'s hearing where no single person decides (Ch28). Distributed responsibility, distributed guilt, no author.',
  },
  {
    file: '37-ch22-the-skeptics-turn.md', title: "The Skeptic's Turn", pov: 'Mauss', timeline: 'future',
    epoch: 'autumn 2044', words: 3200,
    reads: ['wiki/characters/conrad-mauss.md', 'wiki/characters/asha-rendel.md', 'manuscript/15-ch04-extraordinary-claims.md'],
    beats: `- POV MAUSS (his only chapter). The crisis of an honest skeptic who, after the physical artifact (Roan's hull) and the sub-Boundary bed, now HALF-BELIEVES and still cannot prove it — a worse, more agonizing position than certainty either way. His wound surfaces: the unnamed mentor he loved, destroyed by a beautiful wrong idea; the rigor he built as a wall.
- The decision-theory of the steel-man made personal: he grasps, painfully, that "you can't prove it" was an answer to the wrong question — that a warning you cannot falsify, about a civilizational stake, is a decision problem under uncertainty, not just an epistemic one. His category error, seen from inside, with sympathy.
- His relationship to Asha: respect, exasperation, a late tenderness; he is not converted to her certainty but to her SERIOUSNESS. Whether he will lend his weight at the hearing is left genuinely open.
- Render him as RIGHT about the epistemics and wrong about what to do with a warning — the most frightening thing being that the failure to heed is reasonable people being reasonable. End on his unresolved choice.`,
    rhyme: 'The reasonable person reasoning at the edge of the cliff (Mauss) <-> Vael (Ch13/Ch21). Both right about the premise; the methods are the question.',
  },
  {
    file: '38-ch23-the-three-readings.md', title: 'The Three Readings', pov: 'Iren', timeline: 'past',
    epoch: '— the last spring', words: 4000,
    reads: ['wiki/characters/iren.md', 'wiki/characters/the-augur.md', 'wiki/characters/vael.md', 'wiki/characters/sael.md', 'wiki/philosophy/philosophy-map.md'],
    beats: `- THE DEEP-PAST CLIMAX. Iren at the nexus of the asteroid, with the object inbound and (barely, maybe) still a window to act. Stage ALL THREE framings LIVE, each given a fair, fully-felt scene, NONE certified — and Iren himself does not finally know which he is enacting:
  (1) WEAPON: he could let it fall / help it fall to end the war by ending the northern threat (and his own people with it) — the Spur's logic, the Augur's arithmetic.
  (2) FAILED GAMBIT: he tries to use the Ark's mass-drivers to DEFLECT it and may be too late, or may make it worse, or may have been the one who (unknowing) set it on course while "hardening."
  (3) DELIBERATE ERASURE: he chooses, or is tempted to choose, to let it fall AND to scrub the record — to bury the powers with the people so no one can ever dig them up and arm again. A suicide with a clean-up clause.
- The reconstruction frame must be felt here especially: WE cannot recover which it was; render Iren's interiority as the most honest invention, and let the chapter hold the irreducible ambiguity as its FORM, not its evasion. He may be doing all three at once; the act is single, the intent is plural and unrecoverable.
- Sael and Vael present in the decision-space (counsel/opposition). The clutch/hatchlings and Liss as the private stake pulling against every reading.
- End Part III at the point of no return — the object committed, the intent forever sealed. Do NOT depict the impact (that is Ch26).`,
    rhyme: "A decision whose meaning the record will not keep <-> Asha\'s hearing whose outcome the book will not keep (Ch28). The unrecoverable why; the unwritten whether.",
  },
]

const PART4 = [
  {
    file: '41-ch24-the-last-spring.md', title: 'The Last Spring', pov: 'Liss', timeline: 'past',
    epoch: '— the last spring', words: 3200,
    reads: ['wiki/characters/liss.md', 'wiki/characters/sael.md', 'wiki/characters/iren.md', 'manuscript/34-ch19-hatching.md'],
    beats: `- The heartland city (the future Tanis) in its last ordinary beauty — a day of unremarkable life, the hatchlings growing, the river, the light. The world does not know. Render the almost-unbearable ordinariness; restraint is everything. NO foreshadowing-as-dread; let the reader's foreknowledge do the work.
- SAEL'S LAST ACT: rendered THROUGH THE FRAME'S ADMISSION that it cannot truly be recovered — the reconstruction reaching for the elder's final choice and confessing the limit. (Sael does something quiet and final — a refusal, a witnessing, a laying-down — that the rock cannot give us; the frame voice may surface here to mark the blank.)
- Liss senses, in Iren's held body, that something is ending; she does not get the truth in words; she chooses how to spend a last ordinary day without being told it is the last. The marriage of two honesties at its tenderest.
- End quiet, full, and doomed — the last layer before the Line.`,
    rhyme: 'The last ordinary day before the room where it ends <-> Asha the night before the hearing (Ch25). The calm that precedes the irrevocable.',
  },
  {
    file: '42-ch25-the-hearing-i.md', title: 'The Hearing', pov: 'Asha', timeline: 'future',
    epoch: 'winter 2044-45', words: 3400,
    reads: ['wiki/characters/asha-rendel.md', 'wiki/characters/teo-marchetti.md', 'wiki/characters/conrad-mauss.md', 'wiki/characters/lodestar.md'],
    beats: `- THE CONVERGENCE VENUE. A hearing / review / panel where Asha makes her case — not to PROVE the Line (she's conceded she can't) but to make it MATTER: to argue that an unfalsifiable civilizational warning demands a change of course anyway, specifically about Lodestar's expanding authority. The room: the deployers, the skeptics, Mauss present (his choice from Ch22 still unknown), Téo, Roan's physical evidence entered into the record.
- The Triad in the air of the room — the very people weighing her warning are mid-deposition on the thing she's warning about, and cannot hear it because they're inside it. Dramatize the deposition-rite's near-future twin WITHOUT naming the parallel.
- This is PART ONE of the hearing — build to the threshold of the decision; end BEFORE the outcome (the outcome is withheld across Ch26-28). Roan's testimony and the hull are the most dangerous thing in the room; the sub-Boundary bed; Mauss's posture.
- End on Asha rising to give her closing, or on the room about to decide — suspended at the lip.`,
    rhyme: 'The deposition, one more time, with our world on the table <-> the Concord (Ch5) and the last spring (Ch24).',
  },
  {
    file: '46-ch29-the-two-records.md', title: 'The Two Records', pov: 'braided', timeline: 'past',
    epoch: '— the Line',  words: 2800,
    reads: ['wiki/characters/liss.md', 'wiki/characters/asha-rendel.md', 'manuscript/90-epilogue.md', 'manuscript/39-int3.md'],
    beats: `- A SHORT BRAIDED CHAPTER, the hinge before the epilogue. Alternate, in tight section-broken movements, between: the clay being LAID DOWN (Liss's keeping-book and the heartland record going into the flood-surge mud, LOST — part of what is never recovered) and the clay being READ (Asha's by-hand logs, KEPT, handed on to Téo / to the future). Two records of the same death, 66 million years apart: one lost, one kept.
- This chapter may use the frame "we" more than a body chapter (it is nearly frame); but keep the two scenes concrete and human/Talos, not abstract. The point: the only consciousness holding BOTH records at once is the reader.
- Do NOT resolve the human outcome. Do NOT depict the impact (Ch26 did). This is the quiet after both, before the epilogue's final turn.
- End handing off to the epilogue's register — spare, suspended, the centimeter of clay between the kept record and the lost one.`,
    rhyme: 'The lost record (Liss) <-> the kept record (Asha). Fidelity across the unbridgeable; the reader as the only bridge (this is the ONE place the book may lean hardest on the device).',
  },
]

const PART4B = [
  {
    file: '45-ch28-the-hearing-ii.md', title: 'What the Record Will Not Keep', pov: 'Asha', timeline: 'future',
    epoch: 'winter 2044-45', words: 3200,
    reads: ['wiki/characters/asha-rendel.md', 'wiki/characters/teo-marchetti.md', 'wiki/characters/conrad-mauss.md', 'manuscript/42-ch25-the-hearing-i.md'],
    beats: `- THE HUMAN CLIMAX, and the REFUSAL TO RESOLVE. Continuing the hearing (Ch25): Asha's closing — the most important speech in the book, but NOT a triumphant one. She does not prove it; she asks them to act on a warning they cannot disprove, the way you act on a smoke alarm you can't see the fire behind. Mauss's choice lands (whether he lends his weight) — but render it so it does NOT settle the outcome.
- THE OUTCOME IS WITHHELD. Cut away at the threshold of the vote/decision — do not show whether they heed her. The cut must feel deliberate and load-bearing, not evasive (the frame voice's logic from the interludes: warnings do not come resolved; that is the lesson). She hands the warning to Téo / the future / the record.
- Téo's choice (what he will carry forward) is part of what's left open. A quiet final beat between Asha and Téo, or Asha alone with the logbook.
- End suspended — the human thread closes UNRESOLVED, mirroring the unrecoverable intent of the Talos thread. The last image belongs to the warning handed on, not to an answer.`,
    rhyme: 'A decision whose outcome the book will not keep <-> the asteroid\'s intent the record will not keep (Ch23). Both refusals are the same refusal.',
  },
]

phase('Part III (ch16-23)')
const p3 = await parallel(PART3.map(c => () => agent(CH(c), { label: c.file, phase: 'Part III (ch16-23)', schema: SCHEMA })))

phase('Part IV (ch24-29)')
// ch25 must exist before ch28 reads it; run ch25 + others first, then ch28, then ch29.
const p4a = await parallel(PART4.map(c => () => agent(CH(c), { label: c.file, phase: 'Part IV (ch24-29)', schema: SCHEMA })))
const p4b = await parallel(PART4B.map(c => () => agent(CH(c), { label: c.file, phase: 'Part IV (ch24-29)', schema: SCHEMA })))

const all = [...p3, ...p4a, ...p4b].filter(Boolean)
log(`Wave B complete: ${all.length} chapters drafted (ch26 & ch27 are author-written separately)`)
return all
