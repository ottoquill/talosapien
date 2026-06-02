# Artificial Gravity by Rotation

**Type:** science · **Used in:** the Wheels; the gyrealms · **Related:** O'Neill cylinders, the Ark

## Summary
A spinning habitat presses its occupants against the inner wall, mimicking gravity. The pseudo-gravity at radius *r* on a body spinning at angular velocity ω is a = ω²r, so a given "gravity level" can be reached either with a large radius and slow spin or a small radius and fast spin. The catch is the human inner ear: spinning faster than a few revolutions per minute makes ordinary head movements generate Coriolis cross-coupling that triggers motion sickness, which is why credible large-habitat designs choose big radii and slow rotation.

## The science
Astronauts in orbital free fall are weightless, and prolonged weightlessness causes a cascade of unwanted physiological adaptations — bone and muscle loss, cardiovascular deconditioning, fluid shifts — which is the medical motivation for providing some substitute gravity on long missions [bukley2007][hall1999]. Rotation is the only way to do this without continuous thrust.

The mechanism is simple Newtonian mechanics. To keep moving in a circle, a body of mass *m* at radius *r* must be accelerated toward the centre; the required centripetal force is F = mω²r, where ω is the angular velocity in radians per second [bukley2007]. In a frame rotating with the habitat this is felt as an outward "centrifugal" pull, indistinguishable in its action on a mass from real gravity; the effective gravity level is therefore **a = ω²r** [bukley2007]. Because *a* scales with the *square* of spin rate but only linearly with radius, designers can trade the two: 1 g can be produced by a small, fast-spinning centrifuge or by a huge, slowly-rotating habitat.

The constraint that breaks the symmetry is human physiology. When a person turns their head out of the plane of rotation, the rotation of the habitat combines with the head motion to produce a **Coriolis** acceleration that is sensed as a cross-coupled angular acceleration in the semicircular canals of the inner ear — the ear reports a tumbling that the eyes do not confirm, producing disorientation and motion sickness even at low rotation rates (below about 3 rpm) [bukley2007]. Classic centrifuge-adaptation studies summarised by Hall found that at about 1.0 rpm even susceptible subjects were essentially symptom-free; at ~3.0 rpm subjects had symptoms but could function; and higher rates were progressively harder to tolerate [hall1999]. For this reason most published comfort charts cap the angular velocity of a continuously-rotating habitat at roughly **6 rpm or less**, which — at 1 g — forces the radius up to the order of tens to a couple of hundred metres [hall1999]. Comfort also depends on tangential (rim) speed and on the head-to-foot gravity gradient (the difference in *a* between a standing person's feet and head), both of which improve as the radius grows [hall1999]. The practical conclusion is that a comfortable 1-g habitat wants a *large* radius and a *slow* spin — exactly the regime of the kilometre-scale [O'Neill cylinder](oneill-cylinders.md). Recent vestibular-training work suggests humans can adapt to much higher rates over weeks, but the classic comfort limits govern any design meant to be habitable on arrival [bukley2007].

## Established vs. open
**Established:** The mechanics (a = ω²r), the existence and direction of Coriolis cross-coupling, and the qualitative finding that low spin rates are more comfortable are all settled — they follow from physics and from decades of centrifuge experiments [bukley2007][hall1999].

**Open / debated:** The *exact* comfort boundary is not a single number. The literature gives a spread of proposed limits, and the threshold depends on the individual, on adaptation/training, on the task, and on the rest of the environmental design; Hall explicitly stresses the uncertainty in these boundaries [hall1999]. How quickly and how fully humans adapt to higher rates is an active research question.

## In *Talosapien*
> The Talos solved this problem at scale: **the Wheels** are large enough to spin slowly at 1-Talos-g (close to Earth-normal) and stay below the motion-sickness threshold, which is part of why they read as deliberate, comfortable habitats rather than improvised shelters. See [the Wheels](../lore/glossary/the-wheels.md) and [the Wheels and Ark (tech)](../lore/tech/the-wheels-and-ark.md).
> Humanity's near-future **gyrealms** are smaller and spin closer to the comfort limit, so characters who visit them describe the queasy, "the floor leans when you turn your head" Coriolis feeling that the body's builders had engineered away. This contrast is used in-story to underline how much further along the Talos were.
> The physics in the body above is real and unchanged; only the *scale of achievement* is fictional.

## See also
- [O'Neill cylinders](oneill-cylinders.md)
- [The asteroid belt](asteroid-belt.md)
- [Delta-v and orbital mechanics](delta-v-orbital-mechanics.md)

## References
1. Bukley, A., Paloski, W., Clément, G. (2007). "Physics of Artificial Gravity." Chapter 2 in: Clément, G., Bukley, A. (eds), *Artificial Gravity*, Space Technology Library vol. 20, pp. 33–58. Springer / Microcosm Press. ISBN 978-0-387-70712-9 — *verified 2026-06-02 (NTRS 20070001008)*
2. Hall, T.W. (1999). "Artificial Gravity and the Architecture of Orbital Habitats." *Journal of the British Interplanetary Society* 52(7/8):290–300. — *verified 2026-06-02*
