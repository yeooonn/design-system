import React from "react";
import {
  borderRadius,
  fontSize,
  fontWeight,
  type Theme,
} from "@yeoooonn/ds-tokens";
import { useTheme } from "../../theme/ThemeProvider";

export type AvatarSize = "sm" | "md" | "lg" | "xl";

const avatarSize: Record<AvatarSize, { box: number; text: number }> = {
  sm: { box: 24, text: fontSize.xs },
  md: { box: 32, text: fontSize.sm },
  lg: { box: 40, text: fontSize.md },
  xl: { box: 56, text: fontSize.lg },
};

export type AvatarProps = {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  className?: string;
  style?: React.CSSProperties;
};

function getInitials(name?: string) {
  if (!name?.trim()) return "?";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

function resolveAvatarColors(theme: Theme) {
  return {
    backgroundColor: theme.avatar.background,
    color: theme.avatar.text,
  };
}

export function Avatar({
  src,
  alt,
  name,
  size = "md",
  className,
  style,
}: AvatarProps) {
  const { theme } = useTheme();
  const { box, text } = avatarSize[size];
  const colors = resolveAvatarColors(theme);
  const label = alt ?? name ?? "Avatar";

  return (
    <span
      className={className}
      role="img"
      aria-label={label}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        flexShrink: 0,
        width: box,
        height: box,
        borderRadius: borderRadius.full,
        backgroundColor: colors.backgroundColor,
        ...style,
      }}
    >
      {src ? (
        <img
          src={src}
          alt={label}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      ) : (
        <span
          style={{
            color: colors.color,
            fontSize: text,
            fontWeight: fontWeight.semibold,
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          {getInitials(name)}
        </span>
      )}
    </span>
  );
}
