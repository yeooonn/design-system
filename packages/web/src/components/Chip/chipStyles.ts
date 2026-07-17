import type React from "react";
import {
  colors,
  fontSize,
  fontWeight,
  spacing,
  type Theme,
} from "@yeoooonn/ds-tokens";

export type ChipColor = "blue" | "green" | "red" | "orange" | "yellow" | "gray";
export type ChipSize = "sm" | "md" | "lg";

export const chipFontSize: Record<ChipSize, number> = {
  sm: fontSize.xs,
  md: fontSize.sm,
  lg: fontSize.md,
};

export const chipPadding: Record<
  ChipSize,
  Pick<React.CSSProperties, "paddingBlock" | "paddingInline">
> = {
  sm: { paddingBlock: 4, paddingInline: spacing[2] },
  md: { paddingBlock: 6, paddingInline: spacing[3] },
  lg: { paddingBlock: 8, paddingInline: spacing[4] },
};

const chipColorScales = {
  blue: colors.blue,
  green: colors.green,
  red: colors.red,
  orange: colors.orange,
  yellow: colors.yellow,
  gray: colors.gray,
} as const;

type ChipStyleTokens = {
  backgroundColor: string;
  color: string;
};

function isDarkTheme(theme: Theme): boolean {
  return theme.surface.elevated.borderWidth > 0;
}

function resolveDisabledChipStyles(theme: Theme): ChipStyleTokens {
  return {
    backgroundColor: theme.chip.disabled.background,
    color: theme.chip.disabled.text,
  };
}

function resolveSelectedChipStyles(
  scale: (typeof chipColorScales)[ChipColor],
): ChipStyleTokens {
  return {
    backgroundColor: scale[600],
    color: colors.white,
  };
}

function resolveDefaultChipStyles(
  scale: (typeof chipColorScales)[ChipColor],
  color: ChipColor,
  theme: Theme,
): ChipStyleTokens {
  if (color === "gray") {
    return {
      backgroundColor: theme.chip.gray.background,
      color: theme.chip.gray.text,
    };
  }

  if (isDarkTheme(theme)) {
    return {
      backgroundColor: scale[800],
      color: scale[200],
    };
  }

  return {
    backgroundColor: scale[100],
    color: scale[700],
  };
}

export function resolveChipStyles({
  color = "gray",
  theme,
  selected = false,
  disabled = false,
}: {
  color?: ChipColor;
  theme: Theme;
  selected?: boolean;
  disabled?: boolean;
}): ChipStyleTokens {
  if (disabled) {
    return resolveDisabledChipStyles(theme);
  }

  const scale = chipColorScales[color];

  if (selected) {
    return resolveSelectedChipStyles(scale);
  }

  return resolveDefaultChipStyles(scale, color, theme);
}

export const chipBaseStyles: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  alignSelf: "flex-start",
  gap: spacing[1],
  borderRadius: 9999,
  fontWeight: fontWeight.medium,
  lineHeight: 1,
  boxSizing: "border-box",
};

export const chipCloseButtonStyles: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  margin: 0,
  border: "none",
  background: "transparent",
  cursor: "pointer",
  font: "inherit",
  lineHeight: 1,
};
