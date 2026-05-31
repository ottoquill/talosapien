#!/usr/bin/env python3
"""
Cover generator for *Talosapien* by Otto Quill.

The whole book in one image: a single luminous, faintly iridescent horizontal line
— the iridium Boundary, "one centimeter of clay" — laid across dark geological
strata, with the thin descending streak of the impactor in the dark sky above it,
and, almost too faint to see, the ring of a dead habitat. Tombstone or letter.

Requires: Pillow. Uses DejaVu fonts (bundled on most Linux systems).
Outputs: Talosapien-cover-master.png (2560x4096) and Talosapien-cover-ebook.png (1600x2560),
plus JPEG (KDP-preferred) and TIFF for each.
Deterministic (seeded).
"""
import math, os, random
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageChops

SEED = 6604  # locks the artwork (66.04 Ma, if you like)
random.seed(SEED)

HERE = os.path.dirname(os.path.abspath(__file__))
W, H = 1600, 2560                 # ebook target
SS = 2                            # supersample
MW, MH = W * SS, H * SS

LINE_Y = 0.60                     # the Boundary, fraction of height

FONTS = "/usr/share/fonts/truetype/dejavu"
def font(name, size):
    return ImageFont.truetype(os.path.join(FONTS, name), size)

# ---------- background: indigo sky above, warm-dark rock below ----------
def background():
    bg = Image.new("RGB", (MW, MH), (0, 0, 0))
    px = bg.load()
    line_y = int(MH * LINE_Y)
    sky_top = (4, 5, 13)
    sky_bot = (9, 10, 22)
    rock_top = (14, 11, 12)
    rock_bot = (6, 5, 6)
    for y in range(MH):
        if y < line_y:
            t = y / max(1, line_y)
            r = int(sky_top[0] + (sky_bot[0] - sky_top[0]) * t)
            g = int(sky_top[1] + (sky_bot[1] - sky_top[1]) * t)
            b = int(sky_top[2] + (sky_bot[2] - sky_top[2]) * t)
        else:
            t = (y - line_y) / max(1, MH - line_y)
            r = int(rock_top[0] + (rock_bot[0] - rock_top[0]) * t)
            g = int(rock_top[1] + (rock_bot[1] - rock_top[1]) * t)
            b = int(rock_top[2] + (rock_bot[2] - rock_top[2]) * t)
        for x in range(MW):
            px[x, y] = (r, g, b)
    return bg

# ---------- strata: faint horizontal sediment bands below the line ----------
def strata(canvas):
    d = ImageDraw.Draw(canvas, "RGBA")
    line_y = int(MH * LINE_Y)
    y = line_y + int(MH * 0.012)
    while y < MH:
        thick = random.randint(int(MH * 0.004), int(MH * 0.020))
        # warm grey-browns, low alpha, slightly varied
        base = random.randint(18, 46)
        warm = random.randint(0, 14)
        a = random.randint(22, 60)
        d.rectangle([0, y, MW, y + thick], fill=(base + warm, base, base - warm // 2, a))
        # an occasional thin darker parting
        if random.random() < 0.5:
            d.rectangle([0, y + thick, MW, y + thick + max(1, SS)], fill=(0, 0, 0, 70))
        y += thick + random.randint(int(MH * 0.002), int(MH * 0.012))
    # gentle dark vignette into the bottom
    return canvas

# ---------- the impactor: a thin descending streak in the sky ----------
def impactor(canvas):
    glow = Image.new("L", (MW, MH), 0)
    d = ImageDraw.Draw(glow)
    line_y = int(MH * LINE_Y)
    # entry high-right, descending toward a point on the line left-of-center
    x0, y0 = MW * 0.78, MH * 0.10
    x1, y1 = MW * 0.40, line_y - int(MH * 0.008)
    steps = 240
    for s in range(steps + 1):
        t = s / steps
        x = x0 + (x1 - x0) * t
        y = y0 + (y1 - y0) * t
        # taper: faint at entry, brighter approaching the line
        b = int(8 + 150 * (t ** 2.2))
        w = max(1, int(SS * (0.5 + 2.2 * t)))
        d.ellipse([x - w, y - w, x + w, y + w], fill=b)
    glow = glow.filter(ImageFilter.GaussianBlur(radius=1.4 * SS))
    soft = glow.filter(ImageFilter.GaussianBlur(radius=5 * SS))
    glow = ImageChops.lighter(glow, soft.point(lambda v: int(v * 0.8)))
    # warm-white streak
    r = glow.point(lambda v: min(255, int(v * 1.00)))
    g = glow.point(lambda v: min(255, int(v * 0.92)))
    b = glow.point(lambda v: min(255, int(v * 0.78)))
    streak = Image.merge("RGB", (r, g, b))
    return ImageChops.screen(canvas, streak)

# ---------- a faint dead ring (a Wheel) high in the dark ----------
def dead_ring(canvas):
    layer = Image.new("L", (MW, MH), 0)
    d = ImageDraw.Draw(layer)
    cx, cy = MW * 0.30, MH * 0.20
    rx, ry = MW * 0.085, MH * 0.018   # an ellipse: a ring seen near edge-on
    d.ellipse([cx - rx, cy - ry, cx + rx, cy + ry], outline=255, width=max(1, SS))
    layer = layer.filter(ImageFilter.GaussianBlur(radius=1.2 * SS))
    # very faint cool grey
    tint = layer.point(lambda v: int(v * 0.16))
    ring = Image.merge("RGB", (tint, tint.point(lambda v: int(v * 1.05)), tint.point(lambda v: int(v * 1.15))))
    return ImageChops.screen(canvas, ring)

# ---------- the Line: the luminous, faintly iridescent Boundary ----------
def boundary_line(canvas):
    line_y = int(MH * LINE_Y)
    # core glow buffer
    glow = Image.new("L", (MW, MH), 0)
    d = ImageDraw.Draw(glow)
    core_h = max(2, int(MH * 0.0016))
    d.rectangle([0, line_y - core_h, MW, line_y + core_h], fill=255)
    halo = glow.filter(ImageFilter.GaussianBlur(radius=int(MH * 0.010)))
    tight = glow.filter(ImageFilter.GaussianBlur(radius=int(MH * 0.002)))
    # iridescent tint: subtle horizontal spectral drift along the line
    irid = Image.new("RGB", (MW, MH), (0, 0, 0))
    ip = irid.load()
    span = int(MH * 0.030)
    htop = max(0, line_y - span)
    hbot = min(MH, line_y + span)
    for x in range(MW):
        phase = x / MW
        # gentle cyan -> white -> warm spectral shimmer
        rr = 0.55 + 0.45 * math.sin(2 * math.pi * (phase * 1.0 + 0.00))
        gg = 0.65 + 0.35 * math.sin(2 * math.pi * (phase * 1.0 + 0.33))
        bb = 0.70 + 0.30 * math.sin(2 * math.pi * (phase * 1.0 + 0.66))
        col = (int(210 * rr + 45), int(220 * gg + 35), int(235 * bb + 20))
        for y in range(htop, hbot):
            ip[x, y] = col
    # combine: halo (broad) + tight core, masked by the glow, tinted iridescent
    halo_rgb = Image.merge("RGB", (halo, halo, halo))
    base = ImageChops.multiply(halo_rgb, irid)
    canvas = ImageChops.screen(canvas, base)
    # bright near-white tight core on top
    core_rgb = Image.merge("RGB", (
        tight.point(lambda v: min(255, int(v * 1.0))),
        tight.point(lambda v: min(255, int(v * 1.0))),
        tight.point(lambda v: min(255, int(v * 0.98)))))
    canvas = ImageChops.screen(canvas, core_rgb)
    return canvas

def vignette(canvas):
    v = Image.new("L", (MW, MH), 0)
    d = ImageDraw.Draw(v)
    d.ellipse([-MW * 0.30, -MH * 0.16, MW * 1.30, MH * 1.16], fill=255)
    v = v.filter(ImageFilter.GaussianBlur(radius=min(MW, MH) * 0.09))
    dark = Image.new("RGB", (MW, MH), (0, 0, 0))
    return Image.composite(canvas, dark, v)

# ---------- typography ----------
def tracked(draw, text, cx, y, fnt, fill, track):
    widths = [draw.textlength(ch, font=fnt) for ch in text]
    total = sum(widths) + track * (len(text) - 1)
    x = cx - total / 2
    asc, desc = fnt.getmetrics()
    for ch, w in zip(text, widths):
        draw.text((x, y), ch, font=fnt, fill=fill)
        x += w + track
    return asc + desc

def compose():
    canvas = background()
    canvas = strata(canvas)
    canvas = dead_ring(canvas)
    canvas = impactor(canvas)
    canvas = boundary_line(canvas)
    canvas = vignette(canvas)

    draw = ImageDraw.Draw(canvas)
    cx = MW / 2
    # Title near top
    title_f = font("DejaVuSans-ExtraLight.ttf", int(122 * SS))
    h_used = tracked(draw, "TALOSAPIEN", cx, int(MH * 0.085), title_f, (231, 236, 248), track=int(12 * SS))
    rule_y = int(MH * 0.085) + h_used + int(26 * SS)
    rw = int(MW * 0.30)
    draw.line([(cx - rw / 2, rule_y), (cx + rw / 2, rule_y)], fill=(120, 138, 170), width=max(1, SS))
    sub_f = font("DejaVuSans.ttf", int(38 * SS))
    tracked(draw, "A   N O V E L", cx, rule_y + int(20 * SS), sub_f, (150, 166, 196), track=int(8 * SS))
    # Author at foot
    auth_f = font("DejaVuSans-ExtraLight.ttf", int(56 * SS))
    tracked(draw, "OTTO QUILL", cx, int(MH * 0.918), auth_f, (216, 224, 242), track=int(11 * SS))

    final = canvas.resize((W, H), Image.LANCZOS)
    return final, canvas

def _export(img, base):
    img = img.convert("RGB")
    img.save(base + ".png", "PNG")
    img.save(base + ".jpg", "JPEG", quality=95, dpi=(300, 300), optimize=True)
    img.save(base + ".tiff", "TIFF", compression="tiff_lzw", dpi=(300, 300))
    print("wrote", base + ".{png,jpg,tiff}", img.size)

def main():
    final, master = compose()
    master = master.resize((2560, 4096), Image.LANCZOS)
    _export(final, os.path.join(HERE, "Talosapien-cover-ebook"))
    _export(master, os.path.join(HERE, "Talosapien-cover-master"))

if __name__ == "__main__":
    main()
