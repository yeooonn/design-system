import type React from "react";
import {
  borderRadius,
  borderWidth,
  colors,
  fontSize,
  fontWeight,
  spacing,
  type Theme,
} from "@yeoooonn/ds-tokens";

export type ButtonVariant = "filled" | "outlined" | "ghost";
export type ButtonColor = "primary" | "dark" | "danger";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonColorScheme = "light" | "dark";
export type ButtonRound = keyof typeof borderRadius;

const buttonRoundValues = Object.keys(borderRadius) as ButtonRound[];

export function isButtonRound(value: unknown): value is ButtonRound {
  return (
    typeof value === "string" &&
    buttonRoundValues.includes(value as ButtonRound)
  );
}

export function resolveButtonRound(round: ButtonRound = "md"): number {
  return borderRadius[round];
}

export const buttonCircularSizeStyles: Record<ButtonSize, React.CSSProperties> =
  {
    sm: {
      width: 32,
      height: 32,
      minWidth: 32,
      minHeight: 32,
      padding: 0,
      fontSize: fontSize.sm,
    },
    md: {
      width: 44,
      height: 44,
      minWidth: 44,
      minHeight: 44,
      padding: 0,
      fontSize: fontSize.md,
    },
    lg: {
      width: 52,
      height: 52,
      minWidth: 52,
      minHeight: 52,
      padding: 0,
      fontSize: fontSize.lg,
    },
  };

export function resolveButtonSizeStyles(
  size: ButtonSize,
  round: ButtonRound,
  options: { iconOnly?: boolean } = {},
): React.CSSProperties {
  if (round === "full" && options.iconOnly) {
    return buttonCircularSizeStyles[size];
  }
  return buttonSizeStyles[size];
}

type ButtonColorTokens = {
  filled: { backgroundColor: string; color: string };
  outlined: { backgroundColor: string; color: string; borderColor: string };
  ghost: { backgroundColor: string; color: string };
};

function getButtonColorTokens(
  theme: Theme,
  _colorScheme: ButtonColorScheme,
): Record<ButtonColor, ButtonColorTokens> {
  const neutral = theme.button.neutral.text;
  const neutralFilled = theme.button.neutral.filled;

  return {
    primary: {
      filled: {
        backgroundColor: theme.action.primary,
        color: theme.text.inverse,
      },
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
      filled: {
        backgroundColor: neutralFilled,
        color: theme.text.inverse,
      },
      outlined: {
        backgroundColor: colors.transparent,
        color: neutral,
        borderColor: neutral,
      },
      ghost: {
        backgroundColor: colors.transparent,
        color: neutral,
      },
    },
    danger: {
      filled: {
        backgroundColor: theme.button.danger.filled,
        color: theme.text.inverse,
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
): React.CSSProperties {
  const tokens = getButtonColorTokens(theme, colorScheme)[color];
  const border = `${borderWidth.base}px solid`;

  if (variant === "filled") {
    return {
      backgroundColor: tokens.filled.backgroundColor,
      color: tokens.filled.color,
      border: `${border} ${colors.transparent}`,
    };
  }

  if (variant === "outlined") {
    return {
      backgroundColor: tokens.outlined.backgroundColor,
      color: tokens.outlined.color,
      border: `${border} ${tokens.outlined.borderColor}`,
    };
  }

  return {
    backgroundColor: tokens.ghost.backgroundColor,
    color: tokens.ghost.color,
    border: `${border} ${colors.transparent}`,
  };
}

export const buttonSizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: {
    paddingInline: spacing[3],
    paddingBlock: spacing[1],
    fontSize: fontSize.sm,
    minHeight: 32,
  },
  md: {
    paddingInline: spacing[4],
    paddingBlock: spacing[2],
    fontSize: fontSize.md,
    minHeight: 44,
  },
  lg: {
    paddingInline: spacing[6],
    paddingBlock: spacing[3],
    fontSize: fontSize.lg,
    minHeight: 52,
  },
};

export const buttonBaseStyles: React.CSSProperties = {
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
  borderRadius: borderRadius.md,
  fontWeight: fontWeight.semibold,
  transition: "opacity 0.15s, background-color 0.15s",
};

export const buttonIconGap = spacing[2];
