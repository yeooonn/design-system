import {
  borderRadius,
  borderWidth,
  colors,
  fontWeight,
  spacing,
  type Theme,
} from "@yeoooonn/ds-tokens";
import { appFontSize as fontSize } from "../../tokens/typography";

export type ButtonVariant = "filled" | "outlined" | "ghost";
export type ButtonColor = "primary" | "dark" | "danger";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonRound = keyof typeof borderRadius;

export function resolveButtonRound(round: ButtonRound = "md"): number {
  return borderRadius[round];
}

export const buttonCircularSize: Record<
  ButtonSize,
  { width: number; height: number; fontSize: number }
> = {
  sm: { width: 32, height: 32, fontSize: fontSize.sm },
  md: { width: 44, height: 44, fontSize: fontSize.md },
  lg: { width: 52, height: 52, fontSize: fontSize.lg },
};

export const buttonSizeMeta: Record<
  ButtonSize,
  {
    fontSize: number;
    minHeight: number;
    paddingHorizontal: number;
    paddingVertical: number;
  }
> = {
  sm: {
    fontSize: fontSize.sm,
    minHeight: 32,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
  },
  md: {
    fontSize: fontSize.md,
    minHeight: 44,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
  },
  lg: {
    fontSize: fontSize.lg,
    minHeight: 52,
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[3],
  },
};

type ButtonColorTokens = {
  filled: { backgroundColor: string; textColor: string };
  outlined: { backgroundColor: string; textColor: string; borderColor: string };
  ghost: { backgroundColor: string; textColor: string };
};

function getButtonColorTokens(
  theme: Theme,
): Record<ButtonColor, ButtonColorTokens> {
  const neutral = theme.button.neutral.text;
  const neutralFilled = theme.button.neutral.filled;

  return {
    primary: {
      filled: {
        backgroundColor: theme.action.primary,
        textColor: colors.white,
      },
      outlined: {
        backgroundColor: colors.transparent,
        textColor: theme.action.primary,
        borderColor: theme.action.primary,
      },
      ghost: {
        backgroundColor: colors.transparent,
        textColor: theme.action.primary,
      },
    },
    dark: {
      filled: { backgroundColor: neutralFilled, textColor: colors.white },
      outlined: {
        backgroundColor: colors.transparent,
        textColor: neutral,
        borderColor: neutral,
      },
      ghost: { backgroundColor: colors.transparent, textColor: neutral },
    },
    danger: {
      filled: {
        backgroundColor: theme.button.danger.filled,
        textColor: colors.white,
      },
      outlined: {
        backgroundColor: colors.transparent,
        textColor: theme.status.error,
        borderColor: theme.status.error,
      },
      ghost: {
        backgroundColor: colors.transparent,
        textColor: theme.status.error,
      },
    },
  };
}

export function resolveButtonStyles(
  variant: ButtonVariant = "filled",
  color: ButtonColor = "primary",
  theme: Theme,
) {
  const tokens = getButtonColorTokens(theme)[color];

  if (variant === "filled") {
    return {
      backgroundColor: tokens.filled.backgroundColor,
      textColor: tokens.filled.textColor,
      borderColor: colors.transparent,
      borderWidth: borderWidth.base,
    };
  }

  if (variant === "outlined") {
    return {
      backgroundColor: tokens.outlined.backgroundColor,
      textColor: tokens.outlined.textColor,
      borderColor: tokens.outlined.borderColor,
      borderWidth: borderWidth.base,
    };
  }

  return {
    backgroundColor: tokens.ghost.backgroundColor,
    textColor: tokens.ghost.textColor,
    borderColor: colors.transparent,
    borderWidth: borderWidth.base,
  };
}

export const buttonIconGap = spacing[2];
export const buttonFontWeight = fontWeight.semibold;
