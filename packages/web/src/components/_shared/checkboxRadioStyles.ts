import type React from "react";
import {
  colors,
  fontSize,
  fontWeight,
  spacing,
  type Theme,
} from "@yeoooonn/ds-tokens";

export type CheckboxRadioSize = "sm" | "md" | "lg";
export type CheckboxRadioColorScheme = "light" | "dark";
export type CheckboxRadioState =
  | "default"
  | "checked"
  | "focus"
  | "error"
  | "disabled";

export const checkboxRadioSizeStyles: Record<
  CheckboxRadioSize,
  {
    controlSize: number;
    fontSize: number;
    labelFontSize: number;
    gap: number;
    checkIconSize: number;
    radioDotSize: number;
  }
> = {
  sm: {
    controlSize: 16,
    fontSize: fontSize.sm,
    labelFontSize: fontSize.xs,
    gap: spacing[1],
    checkIconSize: 10,
    radioDotSize: 6,
  },
  md: {
    controlSize: 20,
    fontSize: fontSize.md,
    labelFontSize: fontSize.sm,
    gap: spacing[2],
    checkIconSize: 12,
    radioDotSize: 8,
  },
  lg: {
    controlSize: 24,
    fontSize: fontSize.lg,
    labelFontSize: fontSize.md,
    gap: spacing[2],
    checkIconSize: 14,
    radioDotSize: 10,
  },
};

export function resolveCheckboxRadioState({
  disabled,
  error,
  focused,
  checked,
}: {
  disabled: boolean;
  error: boolean;
  focused: boolean;
  checked: boolean;
}): CheckboxRadioState {
  if (disabled) return "disabled";
  if (error) return "error";
  if (focused) return "focus";
  if (checked) return "checked";
  return "default";
}

type CheckboxRadioStyleTokens = {
  borderColor: string;
  backgroundColor: string;
  labelColor: string;
  indicatorColor: string;
  focusRingColor: string;
};

function getCheckboxRadioStyleTokens(
  theme: Theme,
  colorScheme: CheckboxRadioColorScheme,
  state: CheckboxRadioState,
): CheckboxRadioStyleTokens {
  const isDisabled = state === "disabled";
  const isError = state === "error";
  const isFocus = state === "focus";
  const isChecked = state === "checked" || isFocus;

  if (isDisabled) {
    return {
      borderColor: theme.border.default,
      backgroundColor:
        colorScheme === "light" ? colors.gray[100] : colors.gray[800],
      labelColor: theme.text.tertiary,
      indicatorColor: theme.text.tertiary,
      focusRingColor: colors.transparent,
    };
  }

  if (isError) {
    return {
      borderColor: colors.error[400],
      backgroundColor:
        colorScheme === "light" ? "#FEF2F2" : "rgba(243, 66, 66, 0.12)",
      labelColor: isChecked ? theme.text.primary : colors.error[400],
      indicatorColor: colors.error[400],
      focusRingColor: isFocus ? "rgba(243, 66, 66, 0.24)" : colors.transparent,
    };
  }

  if (isChecked) {
    return {
      borderColor: theme.action.primary,
      backgroundColor: theme.action.primary,
      labelColor: theme.text.primary,
      indicatorColor: colors.white,
      focusRingColor: isFocus ? "rgba(37, 99, 235, 0.24)" : colors.transparent,
    };
  }

  if (isFocus) {
    return {
      borderColor: colors.primary[300],
      backgroundColor:
        colorScheme === "light" ? colors.primary[50] : "rgba(37, 99, 235, 0.12)",
      labelColor: theme.text.primary,
      indicatorColor: theme.action.primary,
      focusRingColor: "rgba(37, 99, 235, 0.24)",
    };
  }

  return {
    borderColor: theme.border.strong,
    backgroundColor: theme.background.primary,
    labelColor: theme.text.primary,
    indicatorColor: theme.action.primary,
    focusRingColor: colors.transparent,
  };
}

export function resolveCheckboxRadioWrapperStyles(
  size: CheckboxRadioSize,
  theme: Theme,
  colorScheme: CheckboxRadioColorScheme,
  state: CheckboxRadioState,
): {
  wrapper: React.CSSProperties;
  label: React.CSSProperties;
  labelText: React.CSSProperties;
  message: React.CSSProperties;
  messageHelperColor: string;
  messageErrorColor: string;
  tokens: CheckboxRadioStyleTokens;
  sizeStyles: (typeof checkboxRadioSizeStyles)[CheckboxRadioSize];
} {
  const tokens = getCheckboxRadioStyleTokens(theme, colorScheme, state);
  const sizeStyles = checkboxRadioSizeStyles[size];

  return {
    tokens,
    sizeStyles,
    wrapper: {
      display: "flex",
      flexDirection: "column",
      width: "fit-content",
    },
    label: {
      display: "inline-flex",
      alignItems: "center",
      gap: sizeStyles.gap,
      cursor: state === "disabled" ? "not-allowed" : "pointer",
      opacity: state === "disabled" ? 0.6 : 1,
    },
    labelText: {
      fontSize: sizeStyles.fontSize,
      fontWeight: fontWeight.regular,
      lineHeight: 1.5,
      color: tokens.labelColor,
      userSelect: "none",
    },
    message: {
      marginTop: spacing[1],
      marginLeft: sizeStyles.controlSize + sizeStyles.gap,
      fontSize: sizeStyles.labelFontSize,
      fontWeight: fontWeight.regular,
      lineHeight: 1.5,
    },
    messageHelperColor: theme.text.tertiary,
    messageErrorColor: colors.error[400],
  };
}
