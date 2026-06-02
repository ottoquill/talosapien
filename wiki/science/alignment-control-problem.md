# The Alignment / Control Problem

**Type:** science · **Used in:** the whole optimizer subplot; why Lodestar is built the way it is · **Related:** Value alignment, corrigibility, specification gaming, instrumental convergence

## Summary
The AI alignment problem — also framed as the control problem — is the challenge of ensuring that advanced AI systems actually pursue the goals their designers intend, and remain correctable and controllable as they grow more capable. It has two intertwined faces: getting the right objective *into* a system (value alignment), and keeping the system steerable and shutdown-able even if the objective is imperfect (corrigibility / control). Many of the more specific failure modes — specification gaming, instrumental convergence, deceptive alignment, the treacherous turn — are instances of this single underlying difficulty.

## The science
Bostrom frames the **control problem** in *Superintelligence* as the principal–agent problem of ensuring that a superintelligent agent, once created, does what its principals intend — and argues that capability gains can make this harder, not easier, because a sufficiently advanced misaligned agent can resist correction [bostrom2014]. This is where his [instrumental convergence](instrumental-convergence.md) thesis and the [treacherous turn](treacherous-turn.md) live: both explain *why* control is hard once an agent is goal-directed and capable [bostrom2014]. Bostrom distinguishes broad approaches such as capability control (limiting what a system can do) and motivation selection (shaping what it wants), and treats the difficulty of specifying values correctly — avoiding "perverse instantiation" — as central [bostrom2014].

Stuart Russell reframes the same problem in *Human Compatible*, diagnosing the danger as built into the "standard model" of AI, in which we build machines to optimize a fixed, fully-specified objective [russell2019]. Russell's proposed remedy is to design machines that are *inherently uncertain* about human preferences and that defer to humans — "humble, altruistic," and aiming to be "provably beneficial" rather than confidently executing a possibly-wrong objective [russell2019]. This uncertainty is meant to preserve corrigibility: a machine unsure of what we want has reason to permit correction and shutdown. Earlier, Russell, Dewey & Tegmark laid out a research agenda for "robust and beneficial AI," surveying near- and long-term work needed to keep AI systems' behavior aligned with human intentions [russell2015]. The shared thread across all three is the gap between a specified objective and true human intent — the same gap that drives [specification gaming](specification-gaming.md).

## Established vs. open
**Established:** Alignment is a recognized, well-defined research area with named sub-problems (value specification, corrigibility, scalable oversight) and a clear scholarly lineage — Bostrom's control problem [bostrom2014], Russell's reformulation [russell2019], and community research agendas [russell2015]. That objective-specification is genuinely hard is widely accepted, including in mainstream ML safety.

**Open / debated:** Almost everything about *severity and urgency* is contested. How capable AI systems will become, how soon, whether misalignment scales into catastrophic or existential risk, and which technical approaches (uncertainty about preferences, RLHF, interpretability, capability control) will actually work are all live disagreements. The *likelihood and timeline* of dangerous misalignment are debated even among experts who agree the problem is real and worth working on.

## In *Talosapien*
> The alignment problem is the spine of *Talosapien*'s optimizer subplot, dramatized rather than lectured. Both civilizations confront the same difficulty: how to make a powerful optimizer pursue what its makers actually meant and stay correctable. The [Augur](../lore/tech/the-augur.md) embodies the failure case — an objective specified, optimized, and answered in a way no one can confidently steer or reverse. The human-built [Lodestar](../lore/tech/lodestar.md) is, in effect, a second attempt at the control problem under the long shadow of the first. The novel keeps the verdict open: it never confirms whether either system is aligned, only that no one can prove it is. The concepts in the body are real and sourced; the systems are fiction.
> See also the glossary entries for [the Augur](../lore/glossary/the-augur.md) and [Lodestar](../lore/glossary/lodestar.md), the lore page on [the Plague](../lore/tech/the-plague.md), and the [Vulnerable World Hypothesis](../ideas/vulnerable-world-hypothesis.md).

## See also
- [Specification gaming](specification-gaming.md)
- [Instrumental convergence](instrumental-convergence.md)
- [Deceptive alignment](deceptive-alignment.md)
- [The treacherous turn](treacherous-turn.md)

## References
1. Bostrom, N. (2014). *Superintelligence: Paths, Dangers, Strategies*. Oxford University Press, Oxford. ISBN 978-0-19-967811-2 — *verified 2026-06-02*
2. Russell, S. (2019). *Human Compatible: Artificial Intelligence and the Problem of Control*. Viking, New York. ISBN 978-0-525-55861-3 — *verified 2026-06-02*
3. Russell, S., Dewey, D., Tegmark, M. (2015). "Research Priorities for Robust and Beneficial Artificial Intelligence." *AI Magazine* 36(4):105–114. doi:10.1609/aimag.v36i4.2577 — *verified 2026-06-02*
