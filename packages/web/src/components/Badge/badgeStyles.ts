import type React from "react";
import {
  borderRadius,
  colors,
  fontSize,
  fontWeight,
  spacing,
} from "@yeoooonn/ds-tokens";

export type BadgeColor = "blue" | "green" | "red" | "orange" | "yellow";
export type BadgeVariant = "filled" | "soft";
export type BadgeSize = "sm" | "md" | "lg";

type BadgeColorScale = {
  50: string;
  100: string;
  500: string;
  600: string;
  700: string;
};

const badgeColorScales: Record<BadgeColor, BadgeColorScale> = {
  blue: colors.blue,
  green: colors.green,
  red: colors.red,
  orange: colors.orange,
  yellow: colors.yellow,
};

export const badgeBaseStyles: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
  borderRadius: borderRadius.full,
  fontWeight: fontWeight.semibold,
  whiteSpace: "nowrap",
  lineHeight: 1,
  verticalAlign: "middle",
};

export const badgeLabelStyles: React.CSSProperties = {
  display: "block",
  lineHeight: 1,
};

// 균등 padding + flex center (이전 top 편향이 텍스트를 너무 아래로 내림)
export const badgeSizeStyles: Record<BadgeSize, React.CSSProperties> = {
  sm: {
    paddingBlock: 4,
    paddingInline: spacing[2],
    fontSize: fontSize.xs,
  },
  md: {
    paddingBlock: 6,
    paddingInline: spacing[3],
    fontSize: fontSize.sm,
  },
  lg: {
    paddingBlock: 8,
    paddingInline: spacing[4],
    fontSize: fontSize.md,
  },
};

export function resolveBadgeStyles(
  color: BadgeColor = "blue",
  variant: BadgeVariant = "soft",
): React.CSSProperties {
  const scale = badgeColorScales[color];

  if (variant === "filled") {
    return {
      backgroundColor: scale[600],
      color: colors.white,
    };
  }

  return {
    backgroundColor: scale[100],
    color: scale[700],
  };
}
