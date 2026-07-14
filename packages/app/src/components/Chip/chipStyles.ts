import { colors, spacing } from "@yeoooonn/ds-tokens";
import { appFontSize as fontSize } from "../../tokens/typography";

export type ChipColor = "blue" | "green" | "red" | "orange" | "yellow" | "gray";
export type ChipSize = "sm" | "md" | "lg";
export type ChipColorScheme = "light" | "dark";

export const CLOSE_HIT_SLOP = 6;

export const chipFontSize: Record<ChipSize, number> = {
  sm: fontSize.xs,
  md: fontSize.sm,
  lg: fontSize.md,
};

export const chipPadding: Record<
  ChipSize,
  { paddingVertical: number; paddingHorizontal: number }
> = {
  sm: { paddingVertical: 4, paddingHorizontal: spacing[2] },
  md: { paddingVertical: 6, paddingHorizontal: spacing[3] },
  lg: { paddingVertical: 8, paddingHorizontal: spacing[4] },
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
  textColor: string;
};

function resolveDisabledChipStyles(
  colorScheme: ChipColorScheme,
): ChipStyleTokens {
  return {
    backgroundColor:
      colorScheme === "dark" ? colors.gray[700] : colors.gray[100],
    textColor: colors.gray[400],
  };
}

function resolveSelectedChipStyles(scale: (typeof chipColorScales)[ChipColor]): ChipStyleTokens {
  return {
    backgroundColor: scale[600],
    textColor: colors.white,
  };
}

function resolveDefaultChipStyles(
  scale: (typeof chipColorScales)[ChipColor],
  colorScheme: ChipColorScheme,
): ChipStyleTokens {
  if (colorScheme === "dark") {
    return {
      backgroundColor: scale[800],
      textColor: scale[200],
    };
  }

  return {
    backgroundColor: scale[100],
    textColor: scale[700],
  };
}

export function resolveChipStyles({
  color = "gray",
  colorScheme = "light",
  selected = false,
  disabled = false,
}: {
  color?: ChipColor;
  colorScheme?: ChipColorScheme;
  selected?: boolean;
  disabled?: boolean;
}): ChipStyleTokens {
  if (disabled) {
    return resolveDisabledChipStyles(colorScheme);
  }

  const scale = chipColorScales[color];

  if (selected) {
    return resolveSelectedChipStyles(scale);
  }

  return resolveDefaultChipStyles(scale, colorScheme);
}
