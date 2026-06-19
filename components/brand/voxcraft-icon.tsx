import { brand } from "@/lib/brand/colors";

type VoxKraftIconProps = {
  size?: number;
  className?: string;
  variant?: "dark" | "light";
};

/** Microfone aprovado + livro elegante ao lado. */
export function VoxKraftMicIcon({
  size = 40,
  className,
  variant = "dark",
}: VoxKraftIconProps) {
  const isDark = variant === "dark";
  const uid = isDark ? "dark" : "light";
  const bookFill = isDark ? "#0A1640" : "#E8EDF5";
  const bookPage = isDark ? "#061028" : "#DDE4F0";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 72 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id={`micBody-${uid}`} x1="18" y1="4" x2="18" y2="44">
          <stop offset="0%" stopColor={isDark ? brand.silver : brand.blueLight} />
          <stop offset="55%" stopColor={brand.blueLight} />
          <stop offset="100%" stopColor={brand.blue} />
        </linearGradient>
        <linearGradient id={`vGold-${uid}`} x1="14" y1="14" x2="22" y2="28">
          <stop offset="0%" stopColor={brand.goldLight} />
          <stop offset="100%" stopColor={brand.gold} />
        </linearGradient>
      </defs>

      {/* Microfone */}
      <path
        d="M18 46 L18 52 M12 52 L24 52"
        stroke={isDark ? brand.silverDim : brand.navy}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect
        x="8"
        y="4"
        width="20"
        height="40"
        rx="10"
        fill={`url(#micBody-${uid})`}
        stroke={isDark ? brand.silver : brand.navy}
        strokeWidth="1"
      />
      <ellipse
        cx="18"
        cy="16"
        rx="6"
        ry="2.5"
        stroke={isDark ? brand.silver : brand.white}
        strokeWidth="0.7"
        opacity="0.45"
        fill="none"
      />
      <path
        d="M12 14 L18 28 L24 14"
        stroke={`url(#vGold-${uid})`}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <line x1="11" y1="20" x2="25" y2="20" stroke={isDark ? brand.silver : brand.white} strokeWidth="0.5" opacity="0.3" />
      <line x1="11" y1="24" x2="25" y2="24" stroke={isDark ? brand.silver : brand.white} strokeWidth="0.5" opacity="0.3" />

      {/* Livro elegante ao lado */}
      <path
        d="M34 38 C34 34 38 32 42 32 L48 32 L48 50 C44 50 34 48 34 44 Z"
        fill={bookFill}
        stroke={brand.gold}
        strokeWidth="1"
      />
      <path
        d="M48 32 L54 32 C58 32 62 34 62 38 L62 46 C58 48 48 50 48 50 Z"
        fill={bookPage}
        stroke={brand.gold}
        strokeWidth="1"
      />
      <line x1="48" y1="32" x2="48" y2="50" stroke={brand.gold} strokeWidth="1.2" />
      <line x1="38" y1="36" x2="44" y2="36" stroke={brand.goldLight} strokeWidth="0.6" opacity="0.7" />
      <line x1="38" y1="40" x2="43" y2="40" stroke={brand.goldLight} strokeWidth="0.6" opacity="0.5" />
      <line x1="52" y1="36" x2="58" y2="36" stroke={brand.goldLight} strokeWidth="0.6" opacity="0.7" />
      <line x1="52" y1="40" x2="57" y2="40" stroke={brand.goldLight} strokeWidth="0.6" opacity="0.5" />
    </svg>
  );
}

export const VoxCraftIcon = VoxKraftMicIcon;
