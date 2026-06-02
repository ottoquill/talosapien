# Delta-v and Orbital Mechanics

**Type:** science · **Used in:** moving Belt material; the redirected-asteroid premise · **Related:** asteroid deflection, the asteroid belt, asteroid mining

## Summary
"Delta-v" (Δv) is the change in velocity a spacecraft must produce to perform a maneuver, and it is the true currency of spaceflight: every burn, transfer, and orbit change has a delta-v price, and a vehicle carries a fixed delta-v budget set by its propellant. The Tsiolkovsky rocket equation, Δv = v_e·ln(m₀/m_f), ties that budget to only two things — exhaust velocity and the ratio of fuelled to dry mass — and shows why large velocity changes demand exponentially more propellant. Moving an object between orbits (e.g., a Hohmann transfer) or nudging an asteroid onto a new path therefore costs a specific, calculable amount of delta-v.

## The science
Because a rocket loses mass as it burns propellant, its velocity change is governed by the **ideal (Tsiolkovsky) rocket equation**. NASA Glenn states it as Δv = V_eq · ln(mass ratio), where V_eq is the equivalent exhaust velocity and the mass ratio is the fuelled mass divided by the empty mass — equivalently **Δv = v_e · ln(m₀ / m_f)** with m₀ the initial (wet) mass and m_f the final (dry) mass [nasarocketeq][tsiolkovsky1903]. The decisive feature is that delta-v depends *only* on exhaust velocity and the mass ratio, not on engine size or burn duration [nasarocketeq]. Because the relationship is logarithmic, each additional increment of delta-v requires an exponentially larger propellant fraction: doubling your delta-v at fixed exhaust velocity squares the mass ratio. Konstantin Tsiolkovsky published this relation in 1903, and it has governed every rocket since [tsiolkovsky1903].

Delta-v is therefore the natural "cost" unit for orbital maneuvers. To move between two circular, coplanar orbits, the classic minimum-propellant maneuver is the **Hohmann transfer**: a single elliptical transfer orbit tangent to both the starting and target orbits, executed with **two impulsive burns** — one to leave the first orbit onto the ellipse, a second at the far side to circularize into the target orbit [hohmann1925]. Walter Hohmann showed in 1925 that this two-impulse transfer is the lowest-energy (lowest delta-v) way to connect two circular orbits in the idealized case [hohmann1925]. Each burn's size is a specific delta-v, computed from the orbital velocities involved.

This is why "just moving things around" in space is expensive. Changing an object's orbit — raising or lowering it, changing its plane, or shifting its perihelion so it crosses another body's orbit — requires imparting a definite delta-v to the whole mass of that object. For a small probe this is modest; for a kilometre-scale asteroid the momentum (and thus the delta-v delivery problem) is enormous, which is exactly why deflecting or redirecting an asteroid is hard (see [asteroid deflection](asteroid-deflection.md)). The delta-v required scales with how much you need to change the orbit and is largely independent of how slowly you do it — small, well-timed nudges far from the target, applied over a long lead time, translate into large positional changes later, which is the principle behind both gentle deflection schemes and the [asteroid belt's](asteroid-belt.md) sensitivity to perturbation.

## Established vs. open
**Established:** The rocket equation and Hohmann transfer are textbook, century-old results, experimentally confirmed by every spaceflight; delta-v as the conserved "cost currency" of maneuvers is uncontested [nasarocketeq][tsiolkovsky1903][hohmann1925].

**Open / debated:** Nothing in the fundamental physics. What is engineering-hard (not physics-open) is *delivering* large delta-v to large masses: high-exhaust-velocity propulsion, in-space refuelling, and the practicality of moving very massive objects. For a given hazardous asteroid, the *required* delta-v to deflect it is a real open calculation that depends on the object's mass, the warning time, and where in its orbit the push is applied.

## In *Talosapien*
> The rocket equation is the hard floor the novel respects. The Talos's Belt operations — building and stationing [the Wheels](../lore/glossary/the-wheels.md), towing [asteroid](../lore/tech/the-asteroid.md) feedstock — are all framed as delta-v budgets, not magic; the [Ark](../lore/glossary/the-ark.md) is an industrial answer to the rocket equation, not an exemption from it.
> The book's most speculative thread turns on exactly this math: the idea that the Chicxulub impactor *may* have been a Belt body redirected onto an Earth-crossing path. The novel treats the delta-v to do so as "just barely" within reach of Ark-scale infrastructure given a long lead time and a well-chosen, low-relative-velocity body — plausible-sounding, never demonstrated, and deliberately left unresolved (weapon, failed gambit, or erasure). The orbital mechanics is real; whether it was *done*, and why, is the open question the book never closes. See [asteroid deflection](asteroid-deflection.md).
> The equations above are unaltered established physics; only the question of who once applied them, and to what end, is fiction.

## See also
- [Asteroid deflection](asteroid-deflection.md)
- [The asteroid belt](asteroid-belt.md)
- [Asteroid mining](asteroid-mining.md)
- [O'Neill cylinders](oneill-cylinders.md)

## References
1. NASA Glenn Research Center, *Beginner's Guide to Rockets*. "Ideal Rocket Equation." www1.grc.nasa.gov/beginners-guide-to-aeronautics/ideal-rocket-equation/ — *verified 2026-06-02*
2. Tsiolkovsky, K.E. (1903). "Investigation of Outer Space by Means of Reaction Devices" (Исследование мировых пространств реактивными приборами). *Nauchnoe Obozrenie* (The Science Review), St. Petersburg. — *bibliographic fields verified 2026-06-02; equation form corroborated via NASA Glenn*
3. Hohmann, W. (1925). *Die Erreichbarkeit der Himmelskörper* (*The Attainability of Celestial Bodies*). R. Oldenbourg, Munich/Berlin. — *bibliographic fields verified 2026-06-02*
