import type React from "react";
import {
  borderWidth,
  colors,
  fontSize,
  fontWeight,
  spacing,
  type Theme,
} from "@yeoooonn/ds-tokens";
import { resolveButtonRound } from "../Button/buttonStyles";

export type InputVariant = "box" | "line";
export type InputSize = "sm" | "md" | "lg";
export type InputColorScheme = "light" | "dark";

export const inputSizeStyles: Record<
  InputSize,
  {
    minHeight: number;
    paddingInline: number;
    paddingBlock: number;
    fontSize: number;
    labelFontSize: number;
    gap: number;
    linePaddingBottom: number;
  }
> = {
  sm: {
    minHeight: 32,
    paddingInline: spacing[3],
    paddingBlock: spacing[1],
    fontSize: fontSize.sm,
    labelFontSize: fontSize.xs,
    gap: spacing[1],
    linePaddingBottom: spacing[1],
  },
  md: {
    minHeight: 44,
    paddingInline: spacing[4],
    paddingBlock: spacing[2],
    fontSize: fontSize.md,
    labelFontSize: fontSize.sm,
    gap: spacing[2],
    linePaddingBottom: spacing[2],
  },
  lg: {
    minHeight: 52,
    paddingInline: spacing[6],
    paddingBlock: spacing[3],
    fontSize: fontSize.lg,
    labelFontSize: fontSize.md,
    gap: spacing[2],
    linePaddingBottom: spacing[2],
  },
};

export type InputState = "default" | "focus" | "error" | "disabled";

export function resolveInputState({
  disabled,
  error,
  focused,
}: {
  disabled: boolean;
  error: boolean;
  focused: boolean;
}): InputState {
  if (disabled) return "disabled";
  if (error) return "error";
  if (focused) return "focus";
  return "default";
}

type InputStyleTokens = {
  backgroundColor: string;
  borderColor: string;
  color: string;
  labelColor: string;
  affixColor: string;
  placeholderColor: string;
};

function getInputStyleTokens(
  theme: Theme,
  colorScheme: InputColorScheme,
  state: InputState,
): InputStyleTokens {
  const isDisabled = state === "disabled";
  const isError = state === "error";
  const isFocus = state === "focus";

  if (isDisabled) {
    return {
      backgroundColor:
        colorScheme === "light" ? colors.gray[100] : colors.gray[800],
      borderColor: theme.border.default,
      color: theme.text.tertiary,
      labelColor: theme.text.tertiary,
      affixColor: theme.text.tertiary,
      placeholderColor: theme.text.tertiary,
    };
  }

  if (isError) {
    return {
      backgroundColor:
        colorScheme === "light" ? "#FEF2F2" : "rgba(243, 66, 66, 0.12)",
      borderColor: colors.error[400],
      color: theme.text.primary,
      labelColor: colors.error[400],
      affixColor: theme.text.primary,
      placeholderColor: theme.text.tertiary,
    };
  }

  if (isFocus) {
    return {
      backgroundColor:
        colorScheme === "light" ? colors.primary[50] : "rgba(37, 99, 235, 0.12)",
      borderColor: colors.primary[300],
      color: theme.text.primary,
      labelColor: theme.text.secondary,
      affixColor: theme.text.primary,
      placeholderColor: theme.text.tertiary,
    };
  }

  return {
    backgroundColor: theme.background.primary,
    borderColor: theme.border.default,
    color: theme.text.primary,
    labelColor: theme.text.secondary,
    affixColor: theme.text.primary,
    placeholderColor: theme.text.tertiary,
  };
}

export function resolveInputStyles(
  variant: InputVariant,
  size: InputSize,
  theme: Theme,
  colorScheme: InputColorScheme,
  state: InputState,
): {
  wrapper: React.CSSProperties;
  field: React.CSSProperties;
  input: React.CSSProperties;
  label: React.CSSProperties;
  affix: React.CSSProperties;
  message: React.CSSProperties;
  messageHelperColor: string;
  messageErrorColor: string;
  placeholderColor: string;
} {
  const tokens = getInputStyleTokens(theme, colorScheme, state);
  const sizeStyles = inputSizeStyles[size];
  const border = `${borderWidth.thin}px solid ${tokens.borderColor}`;

  const affix: React.CSSProperties = {
    flexShrink: 0,
    color: tokens.affixColor,
    fontSize: sizeStyles.fontSize,
    fontWeight: fontWeight.regular,
    lineHeight: 1.5,
  };

  const input: React.CSSProperties = {
    flex: 1,
    minWidth: 0,
    border: "none",
    outline: "none",
    backgroundColor: colors.transparent,
    color: tokens.color,
    fontSize: sizeStyles.fontSize,
    fontWeight: fontWeight.regular,
    lineHeight: 1.5,
    padding: 0,
    margin: 0,
    width: "100%",
  };

  const label: React.CSSProperties = {
    display: "block",
    marginBottom: spacing[1],
    fontSize: sizeStyles.labelFontSize,
    fontWeight: fontWeight.regular,
    color: tokens.labelColor,
    lineHeight: 1.5,
  };

  const message: React.CSSProperties = {
    marginTop: spacing[1],
    fontSize: sizeStyles.labelFontSize,
    fontWeight: fontWeight.regular,
    lineHeight: 1.5,
  };

  const messageHelperColor = theme.text.tertiary;
  const messageErrorColor = colors.error[400];

  if (variant === "line") {
    return {
      placeholderColor: tokens.placeholderColor,
      wrapper: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
      },
      field: {
        display: "flex",
        alignItems: "center",
        gap: sizeStyles.gap,
        boxSizing: "border-box",
        width: "100%",
        minHeight: sizeStyles.minHeight,
        paddingBottom: sizeStyles.linePaddingBottom,
        borderBottom: border,
        backgroundColor: colors.transparent,
        transition: "border-color 0.15s, background-color 0.15s",
      },
      input,
      label,
      affix,
      message,
      messageHelperColor,
      messageErrorColor,
    };
  }

  return {
    placeholderColor: tokens.placeholderColor,
    wrapper: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    field: {
      display: "flex",
      alignItems: "center",
      gap: sizeStyles.gap,
      boxSizing: "border-box",
      width: "100%",
      minHeight: sizeStyles.minHeight,
      paddingInline: sizeStyles.paddingInline,
      paddingBlock: sizeStyles.paddingBlock,
      borderRadius: resolveButtonRound("md"),
      border,
      backgroundColor: tokens.backgroundColor,
      transition: "border-color 0.15s, background-color 0.15s",
    },
    input,
    label,
    affix,
    message,
    messageHelperColor,
    messageErrorColor,
  };
}
