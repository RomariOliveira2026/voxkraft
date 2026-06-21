"""Gera arquivos MP3 de demonstração para a biblioteca pública de vozes."""

from __future__ import annotations

import asyncio
import sys
from pathlib import Path

try:
    import edge_tts
except ImportError:
    print("Instale edge-tts: pip install edge-tts", file=sys.stderr)
    sys.exit(1)

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "voices" / "demos"

VOICES = [
    ("lucio", "Lúcio", "pt-BR-AntonioNeural"),
    ("henrique", "Henrique", "pt-BR-AntonioNeural"),
    ("davi", "Davi", "pt-BR-AntonioNeural"),
    ("bruno", "Bruno", "pt-BR-AntonioNeural"),
    ("caio", "Caio", "pt-BR-AntonioNeural"),
    ("gustavo", "Gustavo", "pt-BR-AntonioNeural"),
    ("ze-do-mar", "Zé do Mar", "pt-BR-AntonioNeural"),
    ("aurora", "Aurora", "pt-BR-FranciscaNeural"),
    ("lara", "Lara", "pt-BR-FranciscaNeural"),
    ("beatriz", "Beatriz", "pt-BR-FranciscaNeural"),
    ("vitoria", "Vitória", "pt-BR-ThalitaNeural"),
    ("marina", "Marina", "pt-BR-ThalitaNeural"),
    ("isadora", "Isadora", "pt-BR-FranciscaNeural"),
    ("camila", "Camila", "pt-BR-ThalitaNeural"),
    ("iracema", "Iracema", "pt-BR-FranciscaNeural"),
    ("rafael", "Rafael", "pt-BR-AntonioNeural"),
]


def demo_text(name: str) -> str:
    return (
        f"Olá! Eu sou {name}. "
        "Esta é uma demonstração da minha voz no VoxKraft. "
        "Perfeita para o seu projeto em português do Brasil."
    )


async def generate_all() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    for slug, name, voice_id in VOICES:
        out_path = OUT_DIR / f"{slug}.mp3"
        communicate = edge_tts.Communicate(demo_text(name), voice_id)
        await communicate.save(str(out_path))
        print(f"OK {out_path.name}")


if __name__ == "__main__":
    asyncio.run(generate_all())
