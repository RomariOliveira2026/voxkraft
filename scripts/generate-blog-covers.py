"""Gera capas premium JPG para artigos do blog VoxKraft."""
from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "blog" / "covers"
W, H = 1200, 675

NAVY = (2, 11, 58)
NAVY_DEEP = (7, 11, 31)
BLUE_LIGHT = (59, 130, 246)
GOLD = (212, 168, 83)
GOLD_LIGHT = (240, 215, 140)
WHITE = (255, 255, 255)
SILVER = (200, 210, 230)


def lerp(a: int, b: int, t: float) -> int:
    return int(a + (b - a) * t)


def gradient_bg() -> Image.Image:
    img = Image.new("RGB", (W, H))
    px = img.load()
    for y in range(H):
        for x in range(W):
            t = y / max(H - 1, 1)
            u = x / max(W - 1, 1)
            r = lerp(NAVY_DEEP[0], NAVY[0], t * 0.65 + u * 0.2)
            g = lerp(NAVY_DEEP[1], NAVY[1], t * 0.65 + u * 0.2)
            b = lerp(NAVY_DEEP[2], 95, t * 0.55 + u * 0.15)
            px[x, y] = (r, g, b)
    return img.filter(ImageFilter.GaussianBlur(1))


def draw_waveform(draw: ImageDraw.ImageDraw, y: int, color: tuple[int, int, int], amp: int = 36) -> None:
    points: list[tuple[int, int]] = []
    for x in range(60, W - 60, 5):
        v = math.sin(x / 36) * amp + math.sin(x / 15) * (amp * 0.3)
        points.append((x, int(y + v)))
    if len(points) > 1:
        draw.line(points, fill=color, width=3)


def draw_mic(draw: ImageDraw.ImageDraw, cx: int, cy: int, scale: float = 1.0) -> None:
    s = scale
    draw.rounded_rectangle(
        (cx - 22 * s, cy - 55 * s, cx + 22 * s, cy + 15 * s),
        radius=int(20 * s),
        fill=BLUE_LIGHT,
        outline=SILVER,
        width=2,
    )
    draw.polygon(
        [
            (cx - 10 * s, cy - 30 * s),
            (cx, cy - 5 * s),
            (cx + 10 * s, cy - 30 * s),
        ],
        fill=GOLD,
    )
    draw.line((cx, cy + 15 * s, cx, cy + 45 * s), fill=SILVER, width=3)
    draw.line((cx - 18 * s, cy + 45 * s, cx + 18 * s, cy + 45 * s), fill=SILVER, width=3)


def draw_book(draw: ImageDraw.ImageDraw, x: int, y: int) -> None:
    draw.polygon([(x, y + 60), (x, y), (x + 70, y), (x + 70, y + 60)], fill=NAVY, outline=GOLD, width=2)
    draw.polygon(
        [(x + 70, y), (x + 130, y + 10), (x + 130, y + 70), (x + 70, y + 60)],
        fill=(10, 20, 50),
        outline=GOLD,
        width=2,
    )
    for i in range(4):
        draw.line((x + 82, y + 22 + i * 12, x + 118, y + 24 + i * 12), fill=GOLD_LIGHT, width=2)


def draw_youtube_play(draw: ImageDraw.ImageDraw, cx: int, cy: int, size: int = 80) -> None:
    draw.rounded_rectangle(
        (cx - size, cy - int(size * 0.6), cx + size, cy + int(size * 0.6)),
        radius=18,
        fill=(200, 35, 35),
        outline=WHITE,
        width=2,
    )
    draw.polygon(
        [
            (cx - int(size * 0.2), cy - int(size * 0.35)),
            (cx - int(size * 0.2), cy + int(size * 0.35)),
            (cx + int(size * 0.45), cy),
        ],
        fill=WHITE,
    )


def draw_chart(draw: ImageDraw.ImageDraw, x: int, y: int) -> None:
    bars = [40, 65, 50, 90, 75, 110]
    for i, h in enumerate(bars):
        color = BLUE_LIGHT if i % 2 == 0 else GOLD
        draw.rectangle((x + i * 28, y + 120 - h, x + i * 28 + 18, y + 120), fill=color)


def draw_headphones(draw: ImageDraw.ImageDraw, cx: int, cy: int) -> None:
    draw.arc((cx - 80, cy - 60, cx + 80, cy + 40), 200, 340, fill=SILVER, width=8)
    draw.rounded_rectangle((cx - 95, cy - 10, cx - 55, cy + 50), radius=12, fill=BLUE_LIGHT, outline=GOLD, width=2)
    draw.rounded_rectangle((cx + 55, cy - 10, cx + 95, cy + 50), radius=12, fill=BLUE_LIGHT, outline=GOLD, width=2)


def draw_compare_panels(draw: ImageDraw.ImageDraw, x: int, y: int) -> None:
    draw.rounded_rectangle((x, y, x + 150, y + 200), radius=16, fill=(10, 20, 50), outline=BLUE_LIGHT, width=2)
    draw.rounded_rectangle((x + 180, y, x + 330, y + 200), radius=16, fill=(10, 20, 50), outline=GOLD, width=3)
    draw.text((x + 62, y + 88), "A", fill=SILVER)
    draw.text((x + 232, y + 88), "VK", fill=GOLD)


def draw_text_to_audio(draw: ImageDraw.ImageDraw, x: int, y: int) -> None:
    draw.rounded_rectangle((x, y, x + 180, y + 220), radius=12, fill=(10, 20, 50), outline=SILVER, width=2)
    for i in range(5):
        draw.line((x + 20, y + 30 + i * 28, x + 150 - i * 10, y + 30 + i * 28), fill=SILVER, width=3)
    draw.polygon([(x + 220, y + 140), (x + 220, y + 200), (x + 290, y + 170)], fill=GOLD)


def draw_megaphone(draw: ImageDraw.ImageDraw, cx: int, cy: int) -> None:
    draw.polygon([(cx - 20, cy), (cx - 90, cy - 40), (cx - 90, cy + 40), (cx - 20, cy)], fill=GOLD)
    draw.rectangle((cx - 20, cy - 18, cx + 40, cy + 18), fill=BLUE_LIGHT, outline=SILVER, width=2)
    draw.ellipse((cx + 30, cy - 55, cx + 110, cy + 55), fill=GOLD_LIGHT, outline=GOLD, width=2)


def save_cover(name: str, draw_fn) -> None:
    img = gradient_bg()
    draw = ImageDraw.Draw(img)
    draw_waveform(draw, H // 2, GOLD_LIGHT, amp=28)
    draw_fn(draw)
    img = img.filter(ImageFilter.UnsharpMask(radius=1.2, percent=70, threshold=2))
    out = OUT_DIR / f"{name}.jpg"
    img.save(out, "JPEG", quality=86, optimize=True, progressive=True)
    print(f"Saved {out}")


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    save_cover("anuncios-voz-ia", lambda d: (
        draw_megaphone(d, 360, 340),
        draw_waveform(d, 380, GOLD),
        d.ellipse((760, 180, 1080, 500), outline=BLUE_LIGHT, width=2),
    ))
    save_cover("locucao-digital-empresas", lambda d: (
        draw_mic(d, 320, 350, 1.3),
        draw_chart(d, 700, 280),
        d.rounded_rectangle((680, 200, 1080, 520), radius=20, outline=GOLD, width=2),
    ))
    save_cover("monetizar-videos-ia", lambda d: (
        draw_youtube_play(d, 360, 340, 90),
        draw_waveform(d, 500, GOLD_LIGHT),
    ))
    save_cover("ferramentas-voz-ia", lambda d: (
        draw_mic(d, 280, 350, 1.1),
        d.rounded_rectangle((520, 240, 700, 420), radius=14, outline=BLUE_LIGHT, width=2),
        d.rounded_rectangle((730, 240, 910, 420), radius=14, outline=GOLD, width=2),
        d.rounded_rectangle((940, 240, 1120, 420), radius=14, outline=SILVER, width=2),
    ))
    save_cover("podcasts-com-ia", lambda d: (
        draw_headphones(d, 340, 340),
        draw_mic(d, 720, 360, 1.2),
    ))
    save_cover("audiobooks-com-ia", lambda d: (
        draw_book(d, 300, 290),
        draw_waveform(d, 520, GOLD),
    ))
    save_cover("elevenlabs-comparativo", lambda d: draw_compare_panels(d, 360, 250))
    save_cover("textos-em-audio-profissional", lambda d: draw_text_to_audio(d, 320, 250))
    save_cover("melhores-vozes-ia-youtube", lambda d: (
        draw_youtube_play(d, 300, 340, 75),
        draw_mic(d, 760, 360, 1.1),
    ))
    save_cover("narracoes-profissionais-ia-2026", lambda d: (
        draw_mic(d, 360, 350, 1.4),
        d.rounded_rectangle((620, 220, 1100, 520), radius=24, outline=BLUE_LIGHT, width=2),
        d.line((650, 480, 1070, 480), fill=GOLD, width=2),
    ))


if __name__ == "__main__":
    main()
