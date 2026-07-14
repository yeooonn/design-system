import {
  borderRadius,
  borderWidth,
  colors,
  fontWeight,
  spacing,
  type Theme,
} from "@yeoooonn/ds-tokens";
import { cva } from "class-variance-authority";
import { appFontSize as fontSize } from "../../tokens/typography";

export type ButtonVariant = "filled" | "outlined" | "ghost";
export type ButtonColor = "primary" | "dark" | "danger";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonColorScheme = "light" | "dark";
export type ButtonRound = keyof typeof borderRadius;

export const buttonVariants = cva(
  "relative flex-row items-center justify-center",
  {
    variants: {
      size: {
        sm: "min-h-8 px-3 py-1",
        md: "min-h-11 px-4 py-2",
        lg: "min-h-[52px] px-6 py-3",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

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
  { fontSize: number; minHeight: number; paddingHorizontal: number; paddingVertical: number }
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
  filled: { backgroundColor: string; color: string };
  outlined: { backgroundColor: string; color: string; borderColor: string };
  ghost: { backgroundColor: string; color: string };
};

function getButtonColorTokens(
  theme: Theme,
  colorScheme: ButtonColorScheme,
): Record<ButtonColor, ButtonColorTokens> {
  const neutral =
    colorScheme === "light" ? colors.gray[500] : colors.gray[300];
  const neutralFilled =
    colorScheme === "light" ? colors.gray[500] : colors.gray[600];

  return {
    primary: {
      filled: { backgroundColor: theme.action.primary, color: colors.white },
      outlined: {
        backgroundColor: colors.transparent,
        color: theme.action.primary,
        borderColor: theme.action.primary,
      },
      ghost: {
        backgroundColor: colors.transparent,
        color: theme.action.primary,
      },
    },
    dark: {
      filled: { backgroundColor: neutralFilled, color: colors.white },
      outlined: {
        backgroundColor: colors.transparent,
        color: neutral,
        borderColor: neutral,
      },
      ghost: { backgroundColor: colors.transparent, color: neutral },
    },
    danger: {
      filled: {
        backgroundColor:
          colorScheme === "light" ? colors.error[400] : theme.status.error,
        color: colors.white,
      },
      outlined: {
        backgroundColor: colors.transparent,
        color: theme.status.error,
        borderColor: theme.status.error,
      },
      ghost: {
        backgroundColor: colors.transparent,
        color: theme.status.error,
      },
    },
  };
}

export function resolveButtonStyles(
  variant: ButtonVariant = "filled",
  color: ButtonColor = "primary",
  theme: Theme,
  colorScheme: ButtonColorScheme = "light",
) {
  const tokens = getButtonColorTokens(theme, colorScheme)[color];

  if (variant === "filled") {
    return {
      backgroundColor: tokens.filled.backgroundColor,
      color: tokens.filled.color,
      borderColor: colors.transparent,
      borderWidth: borderWidth.base,
    };
  }

  if (variant === "outlined") {
    return {
      backgroundColor: tokens.outlined.backgroundColor,
      color: tokens.outlined.color,
      borderColor: tokens.outlined.borderColor,
      borderWidth: borderWidth.base,
    };
  }

  return {
    backgroundColor: tokens.ghost.backgroundColor,
    color: tokens.ghost.color,
    borderColor: colors.transparent,
    borderWidth: borderWidth.base,
  };
}

export const buttonIconGap = spacing[2];
export const buttonFontWeight = fontWeight.semibold;
