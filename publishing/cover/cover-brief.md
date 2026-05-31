# Cover Brief — *Talosapien*

## Concept
**The Line itself.** One luminous, faintly iridescent horizontal seam — the iridium Boundary, the
"centimeter of clay" the whole book turns on — laid across dark geological strata, with the thin
descending streak of the impactor in the indigo sky above it, and, almost too faint to see in the
upper dark, the ring of a dead habitat (a Wheel / gyrealm). It states the book in one image: deep
time as strata; the single bright line that is either a tombstone or a letter; the falling stone;
the turning world that stopped turning. The iridescence on the line is literal — iridium's namesake
shimmer — and quietly signals "the anomaly that should not be there."

## Style
- Literary hard-SF minimalism. Near-black field; indigo sky above the line, warm-dark rock below;
  no faces, no creatures, no chrome, no spectacle. Restraint signals "ideas, not a monster movie" —
  essential given the premise's failure mode is silliness.
- Cool spectral shimmer on the Line; a single warm-white impactor streak; everything else held down.
- Title in extra-light, widely letter-spaced sans (DejaVu Sans ExtraLight); author small at the foot.
- The Line reads as a thumbnail — the single horizontal bar of light is the icon.

## Specs (Amazon KDP)
- **Ebook cover:** 1600 × 2560 px (1:1.6), RGB, 300 dpi. KDP accepts **JPEG or TIFF** (not PNG).
  - Upload **`Talosapien-cover-ebook.jpg`** (preferred). TIFF and PNG also provided.
- **High-res master:** 2560 × 4096 px — `Talosapien-cover-master.{jpg,tiff,png}`.
- All exports are flattened RGB (no alpha, no ICC profile, no CMYK) per KDP requirements.

## Files delivered (per size)
`Talosapien-cover-ebook.{jpg,tiff,png}` and `Talosapien-cover-master.{jpg,tiff,png}`.
**Upload to KDP:** `Talosapien-cover-ebook.jpg`.

## Reproduce
```bash
python3 publishing/cover/generate_cover.py
```
Deterministic (seeded 6604 — for 66.04 Ma). Writes PNG + JPEG + TIFF for both sizes into
`publishing/cover/`.
