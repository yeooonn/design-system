import {
  borderWidth,
  colors,
  fontWeight,
  spacing,
  type Theme,
} from "@yeoooonn/ds-tokens";
import { appFontSize as fontSize } from "../../tokens/typography";
import { resolveButtonRound } from "../Button/buttonStyles";

export type TextareaSize = "sm" | "md" | "lg";
export type TextareaState = "default" | "focus" | "error" | "disabled";

export const textareaSizeStyles: Record<
  TextareaSize,
  {
    paddingInline: number;
    paddingBlock: number;
    fontSize: number;
    labelFontSize: number;
    minHeight: number;
  }
> = {
  sm: {
    paddingInline: spacing[3],
    paddingBlock: spacing[3],
    fontSize: fontSize.sm,
    labelFontSize: fontSize.xs,
    minHeight: 80,
  },
  md: {
    paddingInline: spacing[4],
    paddingBlock: spacing[4],
    fontSize: fontSize.md,
    labelFontSize: fontSize.sm,
    minHeight: 120,
  },
  lg: {
    paddingInline: spacing[6],
    paddingBlock: spacing[6],
    fontSize: fontSize.lg,
    labelFontSize: fontSize.md,
    minHeight: 160,
  },
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

function getTextareaStyleTokens(theme: Theme, state: TextareaState) {
  if (state === "disabled") {
    return {
      backgroundColor: theme.field.background.disabled,
      borderColor: theme.border.default,
      color: theme.text.tertiary,
      labelColor: theme.text.tertiary,
      placeholderColor: theme.text.tertiary,
    };
  }

  if (state === "error") {
    return {
      backgroundColor: theme.field.background.error,
      borderColor: colors.error[400],
      color: theme.text.primary,
      labelColor: colors.error[400],
      placeholderColor: theme.text.tertiary,
    };
  }

  if (state === "focus") {
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

export function resolveTextareaTokens(
  size: TextareaSize,
  theme: Theme,
  state: TextareaState,
  options: { countExceeded: boolean },
) {
  const tokens = getTextareaStyleTokens(theme, state);
  const sizeStyles = textareaSizeStyles[size];
  const messageErrorColor = colors.error[400];

  return {
    tokens,
    sizeStyles,
    borderRadius: resolveButtonRound("md"),
    borderWidth: borderWidth.thin,
    countColor: options.countExceeded ? messageErrorColor : tokens.color,
    countLimitColor: theme.text.tertiary,
    countWarningColor: messageErrorColor,
    fontWeight: fontWeight.regular,
  };
}
