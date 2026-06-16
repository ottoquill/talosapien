# Conversion Brief — The Earnest Edition

You are revising *Talosapien*, a hard-SF novel, into a shortened edition written on Ernest
Hemingway's principles. Two jobs at once, on every file assigned to you:

1. **Cut to ~half.** Each file's new word count must be **45–55% of the original.** This is not
   optional trimming; it is a ruthless halving. The original `words:` value is in the frontmatter.
2. **Convert the prose to Hemingway.** Short declarative sentences. Concrete nouns and active verbs.
   The iceberg: state the surface, let the meaning sit under it. Trust the reader.

## Hemingway's principles (apply to every sentence)

- **Short, plain, declarative.** One thought per sentence. Subject, verb, object. Break the long
  recursive sentences into hard, separate sentences. Earn a long sentence rarely, for rhythm only.
- **Cut adjectives and adverbs.** Especially "-ly" adverbs and abstract modifiers. Let the noun and
  verb carry it. "He counted the eggs" not "he was overwhelmed by despair."
- **Concrete over abstract.** Render feeling through one physical object or action, never through a
  named emotion. Delete sentences that explain a feeling already shown.
- **The iceberg / omission.** Cut what the reader can infer. Cut throat-clearing, hedging,
  restatement, the sentence that explains the sentence before it. If a paragraph makes a point and
  the next paragraph makes it again, keep the stronger and delete the other.
- **No editorializing.** Let actions and dialogue carry judgment. Trim narrator commentary on what
  things "meant."
- **Dialogue is lean.** Trust "said." Cut adverbs on speech tags. Let exchanges run in short lines.
  Keep the best lines; cut the connective dialogue around them.
- **Repetition is a tool, not a tic.** Hemingway repeats a plain word for weight ("and the river,
  and the rain"). Keep at most the strongest instance of any recurring image; delete echoes.
- **Rhythm.** Vary sentence length, but the baseline is short. A long sentence lands because the
  three before it were short.

## Calibration example (do this)

Original:
> It is not impressive to look at. In the best exposures it is a centimeter of clay, sometimes less,
> a dark seam between two paler beds of stone, and you could put your thumb over the whole of it and
> hide it from the sun. Above the line, the world is one thing. Below it, the world is another. It
> is the same world. It is sixty-six million years apart from itself, and the distance is the width
> of your thumb.

Hemingway:
> It is not much to look at. A centimeter of clay, sometimes less. A dark seam between two paler
> beds of stone. You can put your thumb over it and hide it from the sun. Above the line is one
> world. Below it is another. It is the same world, sixty-six million years apart from itself. The
> distance is the width of your thumb.

That shows the register. For the halving, go further: also delete whole sentences and passages that
restate, hedge, or explain.

## What you MUST preserve

- **The frontmatter block** at the top of each file (between `---` fences). Keep every field. Update
  only the `words:` value to the new actual count.
- **The `# Title` line** and any **epigraph**.
- **POV and tense.** Deep-past chapters: close third on the named POV, past tense. Near-future:
  close third on the named POV, past tense. Frame matter (prologue/interludes/epilogue): first-
  person-plural, present tense, italic feel. Do not change whose head we are in.
- **Every plot beat and every named character.** Read `wiki/outline.md` for your chapters and their
  neighbors so you cut connective tissue, never load-bearing beats. Compress scenes; do not delete
  events. Keep the chapter's one decisive image/idea set-piece.
- **In-world terms exactly** (see `editorial/style-sheet.md` §8 and `wiki/glossary.md`): the Concord,
  the Reckoning, the Spur, the Augur, the Ark, the Wheels, the gyrealms, the clutch, the crèche,
  crest-flush, the deposition; the Boundary, the Line, the Rendel core, Lodestar, the Belt, Tanis.
- **The Talos physiology rules** (§6): emotion shown as crest flattening, throat going grey, the
  inner ear reading the floor tilt — never human-body clichés ("his heart sank"). Keep these; just
  say them in fewer words.
- **The hard rule** (§3): the deep-past narrative never asserts what the fossil record could not
  recover; the frame voice flags its inventions. Keep any such flags; do not invent new asserted
  facts while cutting.
- **Real science correct** where used (isotopes, dating, orbital mechanics, alignment failure modes,
  troodontid anatomy). Don't garble a fact while compressing.
- **Section break glyph:** a single centered `◆`. You may merge or drop sections, but use this glyph
  for breaks you keep. Em dashes are unspaced `—`. US spelling.

## The frame voice (prologue, interludes, epilogue) — special care

This voice is the book's triumph: a plural "we," melancholy, confessional, present tense. Hemingway-
ize it — break the rolling sentences into short ones, cut the restatement — but keep its content and
its humility intact. It still confesses what is invented vs. found. Shorter sentences, same soul.
Example target: "We do not know their names. We gave them names. We wrote them the way you write a
name on a stone over a grave you cannot open."

## Output

Rewrite each assigned file **in place** (overwrite it). Return a one-line report per file:
`filename: OLD_WORDS -> NEW_WORDS`. Do not touch any file not assigned to you. Do not touch the
4 part-divider files (`11-part-1.md`, `20-part-2.md`, `30-part-3.md`, `40-part-4.md`).
