export function formatDuration(seconds: number) {
  const total = Math.max(0, Math.round(seconds));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const secs = total % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}min`;
  }

  if (minutes > 0) {
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  }

  return `0:${secs.toString().padStart(2, "0")}`;
}

export function formatMinutesUsed(minutes: number) {
  const total = Math.max(0, minutes);
  const hours = Math.floor(total / 60);
  const mins = Math.round(total % 60);

  if (hours > 0) {
    return `${hours}h ${mins}min`;
  }

  return `${Math.round(total)} min`;
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function formatRelativeUpdate(date: string) {
  const now = new Date();
  const target = new Date(date);
  const diffMs = now.getTime() - target.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Atualizado hoje";
  if (diffDays === 1) return "Atualizado ontem";

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(target);
}

export function getInitials(name: string | null | undefined) {
  if (!name?.trim()) return "VK";
  const parts = name.trim().split(/\s+/);
  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function estimateDurationSeconds(text: string, speed = 1) {
  const charsPerSecond = 14 * speed;
  return Math.max(1, Math.ceil(text.trim().length / charsPerSecond));
}

export function estimateDurationLabel(text: string, speed = 1) {
  const seconds = estimateDurationSeconds(text, speed);
  return `~${formatDuration(seconds)} estimados`;
}
