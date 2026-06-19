import Image from "next/image";
import Link from "next/link";
import {
  OFFICIAL_LOGO_DARK,
  OFFICIAL_LOGO_LIGHT,
} from "@/lib/brand/logo-asset";

type LogoVariant = "full" | "horizontal" | "icon";
type LogoTheme = "dark" | "light";

type LogoProps = {
  variant?: LogoVariant;
  theme?: LogoTheme;
  href?: string | false;
  className?: string;
  imageClassName?: string;
  height?: number;
  /** @deprecated use height */
  iconSize?: number;
  onClick?: () => void;
};

export function Logo({
  variant = "horizontal",
  theme = "dark",
  href = "/",
  className = "",
  imageClassName,
  height,
  iconSize,
  onClick,
}: LogoProps) {
  const asset = theme === "light" ? OFFICIAL_LOGO_LIGHT : OFFICIAL_LOGO_DARK;

  const displayHeight =
    height ??
    iconSize ??
    ({ icon: 40, horizontal: 52, full: 96 }[variant] as number);

  const displayWidth = Math.round(
    (displayHeight / asset.height) * asset.width,
  );

  const content = (
    <span className={`inline-flex shrink-0 items-center ${className}`}>
      <Image
        src={asset.src}
        alt={asset.alt}
        width={asset.width}
        height={asset.height}
        unoptimized
        className={imageClassName ?? "object-contain"}
        style={
          imageClassName
            ? undefined
            : { height: displayHeight, width: "auto", maxWidth: displayWidth }
        }
        priority
      />
    </span>
  );

  if (href !== false) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className="inline-flex shrink-0 transition opacity-95 hover:opacity-100"
      >
        {content}
      </Link>
    );
  }

  return (
    <span className={`inline-flex shrink-0 ${className}`} onClick={onClick}>
      {content}
    </span>
  );
}
