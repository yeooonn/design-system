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
      filled: {
        backgroundColor: theme.action.primary,
        color: colors.white,
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
        color: colors.white,
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

export const buttonIconSizes: Record<ButtonSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
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
