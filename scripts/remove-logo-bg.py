"""Gera logos PNG transparentes (dark + light) a partir do asset premium."""
from __future__ import annotations

from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ASSET_CANDIDATES = [
    Path(
        r"C:\Users\Windows\.cursor\projects"
        r"\c-Grupo-O-Especialista-CONTENTFY-Aplicativos-Voxkraft"
        r"\assets\logo-horizontal-dark-v2.png"
    ),
    ROOT / "public" / "brand" / "logo-horizontal-dark.png",
]
OUT_DARK = ROOT / "public" / "brand" / "logo-horizontal-dark.png"
OUT_LIGHT = ROOT / "public" / "brand" / "logo-horizontal-light.png"
TARGET_WIDTH = 492
LIGHT_TEXT = np.array([2, 11, 58], dtype=np.uint8)


def sample_background(data: np.ndarray) -> np.ndarray:
    h, w = data.shape[:2]
    samples: list[np.ndarray] = []
    for x in range(w):
        samples.append(data[0, x, :3])
        samples.append(data[h - 1, x, :3])
    for y in range(h):
        samples.append(data[y, 0, :3])
        samples.append(data[y, w - 1, :3])
    return np.median(np.array(samples, dtype=float), axis=0)


def chroma(rgb: np.ndarray) -> np.ndarray:
    return rgb.max(axis=-1) - rgb.min(axis=-1)


def is_background(rgb: np.ndarray, bg: np.ndarray) -> np.ndarray:
    d = np.linalg.norm(rgb.astype(float) - bg, axis=-1)
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    c = chroma(rgb)
    return (
        (d <= 72)
        | ((r < 58) & (g < 78) & (b < 128) & (c < 52) & (d <= 95))
        | ((r < 42) & (g < 58) & (b < 108) & (c < 38))
    )


def is_logo_pixel(rgb: np.ndarray) -> np.ndarray:
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    c = chroma(rgb)
    return (
        (r > 145)
        | (g > 135)
        | ((r > 105) & (g > 78) & (b < 125))
        | ((r > 85) & (g > 95) & (b > 125))
        | (c > 58)
    )


def flood_remove_background(data: np.ndarray, bg: np.ndarray) -> np.ndarray:
    h, w = data.shape[:2]
    bg_mask = is_background(data[:, :, :3], bg)
    visited = np.zeros((h, w), dtype=bool)
    queue: deque[tuple[int, int]] = deque()

    for x in range(w):
        for y in (0, h - 1):
            if bg_mask[y, x]:
                visited[y, x] = True
                queue.append((y, x))
    for y in range(h):
        for x in (0, w - 1):
            if not visited[y, x] and bg_mask[y, x]:
                visited[y, x] = True
                queue.append((y, x))

    while queue:
        y, x = queue.popleft()
        data[y, x, 3] = 0
        for dy in (-1, 0, 1):
            for dx in (-1, 0, 1):
                if dy == 0 and dx == 0:
                    continue
                ny, nx = y + dy, x + dx
                if (
                    0 <= ny < h
                    and 0 <= nx < w
                    and not visited[ny, nx]
                    and bg_mask[ny, nx]
                ):
                    visited[ny, nx] = True
                    queue.append((ny, nx))
    return data


def peel_halo(data: np.ndarray, bg: np.ndarray, passes: int = 14) -> np.ndarray:
    h, w = data.shape[:2]
    rgb = data[:, :, :3]
    logo = is_logo_pixel(rgb)

    for _ in range(passes):
        alpha = data[:, :, 3]
        transparent = alpha == 0
        remove = np.zeros((h, w), dtype=bool)

        for y in range(h):
            for x in range(w):
                if alpha[y, x] == 0 or logo[y, x]:
                    continue
                neighbors = 0
                for dy in (-1, 0, 1):
                    for dx in (-1, 0, 1):
                        if dy == 0 and dx == 0:
                            continue
                        ny, nx = y + dy, x + dx
                        if 0 <= ny < h and 0 <= nx < w and transparent[ny, nx]:
                            neighbors += 1
                if neighbors >= 1 and is_background(rgb[y, x], bg):
                    remove[y, x] = True

        if not remove.any():
            break
        data[remove, 3] = 0

    margin = 2
    data[:margin, :, 3] = 0
    data[-margin:, :, 3] = 0
    data[:, :margin, 3] = 0
    data[:, -margin:, 3] = 0
    return data


def crop_to_content(data: np.ndarray, pad: int = 10) -> np.ndarray:
    alpha = data[:, :, 3]
    ys, xs = np.where(alpha > 0)
    if len(xs) == 0:
        return data
    x0, x1 = max(0, xs.min() - pad), min(data.shape[1] - 1, xs.max() + pad)
    y0, y1 = max(0, ys.min() - pad), min(data.shape[0] - 1, ys.max() + pad)
    return data[y0 : y1 + 1, x0 : x1 + 1]


def resize_output(data: np.ndarray) -> Image.Image:
    img = Image.fromarray(data)
    w, h = img.size
    target_h = max(1, round(h * (TARGET_WIDTH / w)))
    return img.resize((TARGET_WIDTH, target_h), Image.Resampling.LANCZOS)


def make_light_variant(dark: Image.Image) -> Image.Image:
    data = np.array(dark.convert("RGBA"))
    rgb = data[:, :, :3]
    alpha = data[:, :, 3]
    white = (
        (alpha > 0)
        & (rgb[:, :, 0].astype(int) + rgb[:, :, 1].astype(int) + rgb[:, :, 2].astype(int) > 620)
        & (chroma(rgb) < 40)
    )
    data[white, :3] = LIGHT_TEXT
    return Image.fromarray(data)


def write_svg_exports(width: int, height: int) -> None:
    dark_svg = f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
  viewBox="0 0 {width} {height}" width="{width}" height="{height}" fill="none">
  <image xlink:href="logo-horizontal-dark.png" width="{width}" height="{height}" preserveAspectRatio="xMidYMid meet"/>
</svg>
"""
    light_svg = f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
  viewBox="0 0 {width} {height}" width="{width}" height="{height}" fill="none">
  <image xlink:href="logo-horizontal-light.png" width="{width}" height="{height}" preserveAspectRatio="xMidYMid meet"/>
</svg>
"""
    (ROOT / "public" / "brand" / "logo-horizontal-dark.svg").write_text(
        dark_svg, encoding="utf-8"
    )
    (ROOT / "public" / "brand" / "logo-horizontal-light.svg").write_text(
        light_svg, encoding="utf-8"
    )


def resolve_source() -> Path:
    for candidate in ASSET_CANDIDATES:
        if candidate.exists():
            return candidate
    raise FileNotFoundError("Logo source not found")


def main() -> None:
    source = resolve_source()
    data = np.array(Image.open(source).convert("RGBA"))
    bg = sample_background(data)

    data = flood_remove_background(data, bg)
    data = peel_halo(data, bg)

    rgb = data[:, :, :3]
    residual = (data[:, :, 3] > 0) & is_background(rgb, bg) & ~is_logo_pixel(rgb)
    data[residual, 3] = 0

    data = crop_to_content(data)
    dark = resize_output(data)
    light = make_light_variant(dark)

    dark.save(OUT_DARK, optimize=True)
    light.save(OUT_LIGHT, optimize=True)
    write_svg_exports(dark.size[0], dark.size[1])

    alpha = np.array(dark)[:, :, 3]
    print(f"Source: {source.name}")
    print(f"Dark:  {OUT_DARK} ({dark.size[0]}x{dark.size[1]})")
    print(f"Light: {OUT_LIGHT} ({light.size[0]}x{light.size[1]})")
    print(f"Transparent: {(alpha == 0).sum() / alpha.size * 100:.1f}%")


if __name__ == "__main__":
    main()
