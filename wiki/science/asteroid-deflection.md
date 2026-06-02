# Asteroid Deflection

**Type:** science · **Used in:** the redirected-asteroid premise · **Related:** delta-v and orbital mechanics, the asteroid belt, the Chicxulub crater

## Summary
Planetary defense is the effort to keep a hazardous asteroid from striking Earth by changing its orbit ahead of time. The leading near-term method is the **kinetic impactor** — crashing a spacecraft into the asteroid to nudge it — supplemented by gentler, slower concepts such as the gravity tractor. In 2022 NASA's **DART** mission ran the first full-scale test: it struck the small moon Dimorphos of the binary asteroid (65803) Didymos and measurably shortened Dimorphos's orbital period by about **33 minutes**, with ejecta amplifying the push well beyond the spacecraft's own momentum. DART proved deflection is real, not just theoretical.

## The science
An asteroid on a collision course doesn't need to be stopped or destroyed — it only needs its orbit changed slightly, far enough in advance that the small change grows into a clean miss by the time it would have reached Earth. This is fundamentally a [delta-v](delta-v-orbital-mechanics.md) problem: impart a small velocity change to the asteroid early, and orbital mechanics turns it into a large position change later.

Several techniques have been proposed. The **kinetic impactor** delivers an abrupt velocity change by collision. The **gravity tractor** is the opposite extreme — a spacecraft station-keeps near the asteroid for years, using its own gravity to tow the body onto a new path with no contact at all. Other concepts include ion-beam shepherds and (for short-warning extremes) standoff nuclear devices. All trade speed, mass, and warning time against the achievable orbit change.

DART (Double Asteroid Redirection Test) tested the kinetic impactor on 26 September 2022, deliberately choosing a binary system so the effect would be easy to measure: rather than tracking a tiny change in Didymos's heliocentric orbit, observers measured the change in **Dimorphos's orbital period around Didymos** [daly2023]. The mission successfully and autonomously targeted and struck the ~160 m Dimorphos, demonstrating that the guidance and impact itself work as a planetary-defense technique [daly2023]. The measured result: Dimorphos's orbital period was shortened by **−33.0 ± 1.0 minutes** (3σ) [thomas2023]. Crucially, this far exceeded the ~7-minute change expected from the spacecraft's momentum alone in a simple inelastic collision: the impact blew off a large plume of ejecta, and the recoil from that ejecta multiplied the momentum delivered to Dimorphos [thomas2023]. The momentum-enhancement factor was measured at **β ≈ 3.6**, corresponding to an instantaneous reduction in Dimorphos's along-track orbital velocity of about **2.70 ± 0.10 mm/s** [cheng2023]. In other words, a few-millimetre-per-second nudge, applied far enough out, is enough to matter — and ejecta can make a kinetic impactor several times more effective than its raw momentum implies [cheng2023].

## Established vs. open
**Established:** Kinetic impaction works. DART measurably changed a real asteroid's orbit, the period change (~33 min) and velocity change (~2.7 mm/s) are peer-reviewed measurements, and ejecta-driven momentum enhancement (β ≈ 3.6 in this case) is a confirmed, important effect [daly2023][thomas2023][cheng2023].

**Open / debated:** The β factor is *body-specific* — it depends on the asteroid's structure, porosity, and surface, so it cannot simply be assumed for a different target; predicting it in advance for an unknown hazardous asteroid remains hard. The gravity tractor and other slow-push methods are unflown. And deflecting a much *larger* or short-warning object — or, conversely, the energetics of deliberately *redirecting* a sizeable body — is far beyond what has been demonstrated.

## In *Talosapien*
> DART is the real anchor the novel uses to make its central speculation feel "just barely" possible. If a millimetre-per-second nudge with years of lead time can move an asteroid, then — the book argues in-world — sufficiently advanced [Ark](../lore/glossary/the-ark.md)-scale infrastructure, applied over a long enough lead time to a well-chosen Belt body, could in principle do the reverse of planetary defense: place an object *onto* an Earth-crossing path.
> This is the novel's most speculative and deliberately unresolved thread: that the [Chicxulub](chicxulub-crater.md) impactor *may* have been a [Belt](../lore/glossary/the-belt.md) object redirected onto collision course using the same delta-v and deflection physics described above. The orbital mechanics is treated as barely within reach (see [delta-v and orbital mechanics](delta-v-orbital-mechanics.md)); the book never settles whether it was weapon, failed gambit, or erasure.
> The DART science here is real and measured; the redirected-impactor premise is fiction built on top of it, and is never confirmed within the story.

## See also
- [Delta-v and orbital mechanics](delta-v-orbital-mechanics.md)
- [The asteroid belt](asteroid-belt.md)
- [Asteroid mining](asteroid-mining.md)
- [Chicxulub crater](chicxulub-crater.md)

## References
1. Daly, R.T., Ernst, C.M., Barnouin, O.S., et al. (2023). "Successful kinetic impact into an asteroid for planetary defence." *Nature* 616(7957):443–447. doi:10.1038/s41586-023-05810-5 — *verified 2026-06-02*
2. Thomas, C.A., Naidu, S.P., Scheirich, P., et al. (2023). "Orbital period change of Dimorphos due to the DART kinetic impact." *Nature* 616(7957):448–451. doi:10.1038/s41586-023-05805-2 — *verified 2026-06-02*
3. Cheng, A.F., Agrusa, H.F., Barbee, B.W., et al. (2023). "Momentum transfer from the DART mission kinetic impact on asteroid Dimorphos." *Nature* 616(7957):457–460. doi:10.1038/s41586-023-05878-z — *verified 2026-06-02*
