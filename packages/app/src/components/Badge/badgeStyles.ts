import { colors, spacing } from "@yeoooonn/ds-tokens";
import { appFontSize as fontSize } from "../../tokens/typography";

export type BadgeColor = "blue" | "green" | "red" | "orange" | "yellow";
export type BadgeVariant = "filled" | "soft";
export type BadgeSize = "sm" | "md" | "lg";

const badgeColorScales = {
  blue: colors.blue,
  green: colors.green,
  red: colors.red,
  orange: colors.orange,
  yellow: colors.yellow,
} as const;

export function resolveBadgeStyles(
  color: BadgeColor = "blue",
  variant: BadgeVariant = "soft",
) {
  const scale = badgeColorScales[color];
  if (variant === "filled") {
    return {
      backgroundColor: scale[600],
      textColor: colors.white,
    };
  }
  return {
    backgroundColor: scale[100],
    textColor: scale[700],
  };
}

export const badgeFontSize: Record<BadgeSize, number> = {
  sm: fontSize.xs,
  md: fontSize.sm,
  lg: fontSize.md,
};

export const badgePadding: Record<
  BadgeSize,
  { paddingVertical: number; paddingHorizontal: number }
> = {
  sm: { paddingVertical: 4, paddingHorizontal: spacing[2] },
  md: { paddingVertical: 6, paddingHorizontal: spacing[3] },
  lg: { paddingVertical: 8, paddingHorizontal: spacing[4] },
};
