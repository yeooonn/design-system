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

export type TextareaSize = "sm" | "md" | "lg";
export type TextareaColorScheme = "light" | "dark";
export type TextareaState = "default" | "focus" | "error" | "disabled";

export const textareaSizeStyles: Record<
  TextareaSize,
  {
    paddingInline: number;
    paddingBlock: number;
    fontSize: number;
    labelFontSize: number;
  }
> = {
  sm: {
    paddingInline: spacing[3],
    paddingBlock: spacing[1],
    fontSize: fontSize.sm,
    labelFontSize: fontSize.xs,
  },
  md: {
    paddingInline: spacing[4],
    paddingBlock: spacing[2],
    fontSize: fontSize.md,
    labelFontSize: fontSize.sm,
  },
  lg: {
    paddingInline: spacing[6],
    paddingBlock: spacing[3],
    fontSize: fontSize.lg,
    labelFontSize: fontSize.md,
  },
};

const textareaMinHeights: Record<TextareaSize, number> = {
  sm: 80,
  md: 120,
  lg: 160,
};

const countAreaHeight = 24;

type TextareaStyleTokens = {
  backgroundColor: string;
  borderColor: string;
  color: string;
  labelColor: string;
  placeholderColor: string;
};

export function resolveTextareaState({
  disabled,
  error,
  focused,
}: {
  disabled: boolean;
  error: boolean;
  focused: boolean;
}): TextareaState {
  if (disabled) return "disabled";
  if (error) return "error";
  if (focused) return "focus";
  return "default";
}

function getTextareaStyleTokens(
  theme: Theme,
  colorScheme: TextareaColorScheme,
  state: TextareaState,
): TextareaStyleTokens {
  const isDisabled = state === "disabled";
  const isError = state === "error";
  const isFocus = state === "focus";

  if (isDisabled) {
    return {
      backgroundColor: theme.field.background.disabled,
      borderColor: theme.border.default,
      color: theme.text.tertiary,
      labelColor: theme.text.tertiary,
      placeholderColor: theme.text.tertiary,
    };
  }

  if (isError) {
    return {
      backgroundColor: theme.field.background.error,
      borderColor: colors.error[400],
      color: theme.text.primary,
      labelColor: colors.error[400],
      placeholderColor: theme.text.tertiary,
    };
  }

  if (isFocus) {
    return {
      backgroundColor: theme.field.background.focus,
      borderColor: colors.primary[300],
      color: theme.text.primary,
      labelColor: theme.text.secondary,
      placeholderColor: theme.text.tertiary,
    };
  }

  return {
    backgroundColor: theme.field.background.default,
    borderColor: theme.border.default,
    color: theme.text.primary,
    labelColor: theme.text.secondary,
    placeholderColor: theme.text.tertiary,
  };
}

export function resolveTextareaStyles(
  size: TextareaSize,
  theme: Theme,
  colorScheme: TextareaColorScheme,
  state: TextareaState,
  options: { showCount: boolean; countExceeded: boolean },
): {
  wrapper: React.CSSProperties;
  field: React.CSSProperties;
  textarea: React.CSSProperties;
  label: React.CSSProperties;
  exampleText: React.CSSProperties;
  count: React.CSSProperties;
  countCurrent: React.CSSProperties;
  countLimit: React.CSSProperties;
  countWarning: React.CSSProperties;
  placeholderColor: string;
} {
  const tokens = getTextareaStyleTokens(theme, colorScheme, state);
  const sizeStyles = textareaSizeStyles[size];
  const border = `${borderWidth.thin}px solid ${tokens.borderColor}`;
  const minHeight = textareaMinHeights[size];
  const paddingBottom = options.showCount
    ? sizeStyles.paddingBlock + countAreaHeight
    : sizeStyles.paddingBlock;

  const label: React.CSSProperties = {
    display: "block",
    marginBottom: spacing[1],
    fontSize: sizeStyles.labelFontSize,
    fontWeight: fontWeight.regular,
    color: tokens.labelColor,
    lineHeight: 1.5,
  };

  const textarea: React.CSSProperties = {
    position: "relative",
    zIndex: 1,
    width: "100%",
    minHeight: minHeight - sizeStyles.paddingBlock * 2 - (options.showCount ? countAreaHeight : 0),
    border: "none",
    outline: "none",
    backgroundColor: colors.transparent,
    color: tokens.color,
    fontSize: sizeStyles.fontSize,
    fontWeight: fontWeight.regular,
    lineHeight: 1.5,
    padding: 0,
    margin: 0,
    resize: "none",
    fontFamily: "inherit",
  };

  const exampleText: React.CSSProperties = {
    position: "absolute",
    top: sizeStyles.paddingBlock,
    left: sizeStyles.paddingInline,
    right: sizeStyles.paddingInline,
    bottom: paddingBottom,
    zIndex: 0,
    pointerEvents: "none",
    color: tokens.placeholderColor,
    fontSize: sizeStyles.fontSize,
    fontWeight: fontWeight.regular,
    lineHeight: 1.5,
    whiteSpace: "pre-wrap",
    overflow: "hidden",
  };

  const count: React.CSSProperties = {
    position: "absolute",
    right: sizeStyles.paddingInline,
    bottom: sizeStyles.paddingBlock,
    zIndex: 2,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.regular,
    lineHeight: 1.5,
    pointerEvents: "none",
  };

  const countCurrent: React.CSSProperties = {
    color: options.countExceeded ? colors.error[400] : tokens.color,
  };

  const countLimit: React.CSSProperties = {
    color: colors.error[400],
  };

  const countWarning: React.CSSProperties = {
    marginTop: spacing[1],
    fontSize: sizeStyles.labelFontSize,
    fontWeight: fontWeight.regular,
    color: colors.error[400],
    lineHeight: 1.5,
  };

  return {
    placeholderColor: tokens.placeholderColor,
    wrapper: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    field: {
      position: "relative",
      boxSizing: "border-box",
      width: "100%",
      minHeight,
      paddingInline: sizeStyles.paddingInline,
      paddingTop: sizeStyles.paddingBlock,
      paddingBottom,
      borderRadius: resolveButtonRound("md"),
      border,
      backgroundColor: tokens.backgroundColor,
      transition: "border-color 0.15s, background-color 0.15s",
    },
    textarea,
    label,
    exampleText,
    count,
    countCurrent,
    countLimit,
    countWarning,
  };
}
