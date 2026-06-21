"use client";

import { useEffect, useRef, useState } from "react";

type VoiceDemoPlayerProps = {
  src: string;
  voiceName: string;
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function VoiceDemoPlayer({ src, voiceName }: VoiceDemoPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    };
    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
    };
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onError = () => setError(true);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("error", onError);
    };
  }, [src]);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio || error) return;

    if (isPlaying) {
      audio.pause();
    } else {
      document.querySelectorAll("audio[data-voice-demo]").forEach((el) => {
        if (el !== audio) (el as HTMLAudioElement).pause();
      });
      void audio.play();
    }
  }

  function handleSeek(e: React.MouseEvent<HTMLDivElement>) {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * audio.duration;
  }

  return (
    <div className="mt-4 rounded-xl border border-white/10 bg-[#0B102A]/80 p-3">
      <audio ref={audioRef} src={src} preload="metadata" data-voice-demo />

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={togglePlay}
          disabled={error}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label={isPlaying ? `Pausar demonstração de ${voiceName}` : `Ouvir demonstração de ${voiceName}`}
        >
          {isPlaying ? (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" />
            </svg>
          ) : (
            <svg className="h-4 w-4 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-slate-400">Demonstração</p>
          <div
            role="slider"
            aria-label={`Progresso da demonstração de ${voiceName}`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
            tabIndex={0}
            onClick={handleSeek}
            onKeyDown={(e) => {
              const audio = audioRef.current;
              if (!audio?.duration) return;
              if (e.key === "ArrowRight") audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
              if (e.key === "ArrowLeft") audio.currentTime = Math.max(0, audio.currentTime - 5);
            }}
            className="mt-1.5 h-1.5 cursor-pointer rounded-full bg-white/10"
          >
            <div
              className="h-full rounded-full bg-blue-500 transition-[width]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <span className="shrink-0 text-xs tabular-nums text-slate-400">
          {error ? "—" : `${formatTime(currentTime)} / ${formatTime(duration)}`}
        </span>
      </div>
    </div>
  );
}
