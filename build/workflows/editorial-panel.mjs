export const meta = {
  name: 'talosapien-editorial-panel',
  description: 'Multi-perspective editorial critique of the full Talosapien manuscript',
  phases: [
    { title: 'Critique', detail: 'six referees read the full manuscript along their dimension' },
  ],
}

const ROOT = '/home/paul/git/ottoquill/talosapien'

const COMMON = `You are an elite editorial referee for the hard-SF novel TALOSAPIEN by Otto Quill. The book's mandate is to be AMAZING FOR SOME, not good for many: award-submittable, uncompromising. You are reviewing the FULL manuscript for your specific dimension only.

READ (use Read; the manuscript is the source of truth):
- ${ROOT}/editorial/style-sheet.md  (the binding prose constitution)
- ${ROOT}/editorial/continuity-ledger.md  (locked facts and motif ledger)
- ${ROOT}/wiki/glossary.md  and  ${ROOT}/wiki/outline.md
- ALL chapter files: ${ROOT}/manuscript/*.md  (read every 1*, 2*, 3*, 4*, 9* file; they sort into reading order: prologue, part dividers, ch01-29, interludes, epilogue)

Be specific and ruthless but fair. Report ONLY real problems worth an author's time — do not pad. For each finding give: the chapter file, a short quote or location, the severity, the precise issue, and a concrete suggested fix. Severity scale: "blocker" (breaks the book / a hard rule / a continuity contradiction / makes the dinosaurs ridiculous), "major" (notably weakens a chapter), "minor" (worth fixing), "nit" (optional polish). Prefer fewer high-confidence findings over many speculative ones. Also note 1-3 genuine STRENGTHS so the author knows what not to touch.`

const SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    dimension: { type: 'string' },
    overall: { type: 'string', description: 'one-paragraph verdict' },
    strengths: { type: 'array', items: { type: 'string' } },
    findings: {
      type: 'array',
      items: {
        type: 'object', additionalProperties: false,
        properties: {
          chapter: { type: 'string' },
          severity: { type: 'string', enum: ['blocker', 'major', 'minor', 'nit'] },
          location: { type: 'string', description: 'short quote or beat locator' },
          issue: { type: 'string' },
          fix: { type: 'string' },
        },
        required: ['chapter', 'severity', 'location', 'issue', 'fix'],
      },
    },
  },
  required: ['dimension', 'overall', 'strengths', 'findings'],
}

const CRITICS = [
  { key: 'hard-sf-rigor', brief: `HARD-SF SCIENCE RIGOR. Check that all real science is used correctly and never as magic: the K-Pg iridium anomaly, transuranic/fission-product isotopes and their decay clocks, delta-13C/delta-15N excursions, shocked quartz, microspherules/microtektites, the Tanis seiche-surge mechanism, radiometric dating with two-clock cross-checks, the orbital mechanics of redirecting a Belt object (delta-v, timeframes), and the AI-alignment failure modes (reward hacking, instrumental convergence, deceptive alignment, treacherous turn) — which must be DRAMATIZED, never named in-text, and never cartoonish. Flag any claim that is physically wrong, any technobabble, any place a real mechanism is fumbled, and any spot where the Augur or Lodestar is narrated from the inside (forbidden).` },
  { key: 'paleo-geochem', brief: `PALEONTOLOGY & DEEP-TIME PLAUSIBILITY. Check the troodontid-derived biology (feathers, tetrachromacy, vestibular acuity, oviparity/communal crèches, the crest-flush), the Maastrichtian setting (paleogeography, Deccan Traps, the inland sea), and above all the SILURIAN-HYPOTHESIS RECOVERABILITY BUDGET: nothing should be claimed as recoverable from 66 Ma that could not be (per the style sheet's "hard rule"), and the frame voice must flag where it leans past evidence. Flag any anachronism, any taxon/site/date error, and any violation of the reconstruction's epistemic discipline.` },
  { key: 'literary-prose', brief: `LITERARY PROSE & THE "AMAZING FOR SOME" BAR. Judge voice, cadence, restraint, and whether each chapter clears the bar set by the prologue, ch01 (deep-past exemplar) and ch02 (near-future exemplar). Hunt the AI-slop blacklist (style sheet §12): "In a world where", "little did they know", rhetorical-question-as-suspense, "it was then that she realized", tri-colon abuse, omniscient sentimentality, clean morals, info-dumps. Flag flat/generic passages, voice drift between the two registers, over-explaining, and any chapter that merely competently hits beats without singing. Name the weakest chapters explicitly.` },
  { key: 'continuity', brief: `CONTINUITY & STRUCTURE. Verify every locked fact in the continuity ledger holds across all chapters (the clutch count and hatching timing; the crier decline 40->11->4; Iren's Deccan-works/foreman wound; the third Wheel/mass-driver/stirred-object; the withheld-then-revealed Augur recommendation; Asha's 41 runs, Carolina-margin 2034 wound, Daniel, the evidence board; Roan's Margin/Devi/the open-board posting; Mauss age 71 and the funding-cut; Teo's fellowship; the sub-Boundary bed and the three-lab blind results; the naming device). Flag contradictions, timeline errors, dropped threads, and — critically — any place the structural RHYME between timelines is STATED OUTRIGHT (it must never be; that is a blocker).` },
  { key: 'premise-failure-mode', brief: `THE PREMISE'S FAILURE MODE: DINOSAUR SILLINESS & EARNED AMBIGUITY. Your job is to catch any sentence that makes a serious reader smirk at "sapient dinosaurs" — cuteness, Jurassic-Park beats, humans-in-costume, anthropomorphic cliche (hearts sinking, eyebrows raised), or tonal slippage that cheapens the Talos. Separately, judge whether the book EARNS its two refusals (the asteroid's unresolved intent; the unshown human-hearing outcome) or whether either reads as a cop-out — and whether the deep-past extinction lands with real grief. Flag the riskiest passages for ridicule and any place the ambiguity feels evasive rather than honest.` },
  { key: 'philosophy-skeptic', brief: `PHILOSOPHY & THE STEEL-MAN. Check that the ideas are accurate and fairly staged (the Silurian Hypothesis, the Great Filter, the Vulnerable World Hypothesis, Parfit/Scheffler on obligation to the future, Cassandra, alignment). MOST IMPORTANTLY: is Dr. Conrad Mauss (the skeptic) genuinely STEEL-MANNED — does his case (base rates, contamination, diagenesis, unfalsifiability, the sociology of extraordinary claims) win on the page where it should — and is Vael's pro-delegation argument as persuasive as it must be? Flag any strawmanning, any place the book stacks the deck, any philosophical idea bungled or over-explained, and whether the ending's "act under unprovable uncertainty" thesis is dramatized rather than preached.` },
]

phase('Critique')
const reports = await parallel(CRITICS.map(c => () =>
  agent(`${COMMON}\n\n=================  YOUR DIMENSION  =================\n${c.brief}`,
        { label: c.key, phase: 'Critique', schema: SCHEMA })))

const all = reports.filter(Boolean)
log(`Editorial panel complete: ${all.length} reports`)
return all
