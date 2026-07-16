import {
  colors,
  spacing,
  type Theme,
} from "@yeoooonn/ds-tokens";
import { appFontSize as fontSize } from "../../tokens/typography";

export type CheckboxRadioSize = "sm" | "md" | "lg";
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

export type CheckboxRadioStyleTokens = {
  borderColor: string;
  backgroundColor: string;
  labelColor: string;
  indicatorColor: string;
  focusRingColor: string;
};

export function getCheckboxRadioStyleTokens(
  theme: Theme,
  state: CheckboxRadioState,
): CheckboxRadioStyleTokens {
  const isDisabled = state === "disabled";
  const isError = state === "error";
  const isFocus = state === "focus";
  const isChecked = state === "checked" || isFocus;

  if (isDisabled) {
    return {
      borderColor: theme.border.default,
      backgroundColor: theme.field.background.disabled,
      labelColor: theme.text.tertiary,
      indicatorColor: theme.text.tertiary,
      focusRingColor: colors.transparent,
    };
  }

  if (isError) {
    return {
      borderColor: colors.error[400],
      backgroundColor: theme.field.background.error,
      labelColor: isChecked ? theme.text.primary : colors.error[400],
      indicatorColor: colors.error[400],
      focusRingColor: isFocus ? theme.focusRing.error : colors.transparent,
    };
  }

  if (isChecked) {
    return {
      borderColor: theme.action.primary,
      backgroundColor: theme.action.primary,
      labelColor: theme.text.primary,
      indicatorColor: colors.white,
      focusRingColor: isFocus ? theme.focusRing.primary : colors.transparent,
    };
  }

  if (isFocus) {
    return {
      borderColor: colors.primary[300],
      backgroundColor: theme.field.background.focus,
      labelColor: theme.text.primary,
      indicatorColor: theme.action.primary,
      focusRingColor: theme.focusRing.primary,
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

export function resolveCheckboxRadioMeta(
  size: CheckboxRadioSize,
  theme: Theme,
  state: CheckboxRadioState,
) {
  const tokens = getCheckboxRadioStyleTokens(theme, state);
  const sizeStyles = checkboxRadioSizeStyles[size];

  return {
    tokens,
    sizeStyles,
    messageHelperColor: theme.text.tertiary,
    messageErrorColor: colors.error[400],
    disabledOpacity: state === "disabled" ? 0.6 : 1,
  };
}
