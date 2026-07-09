import type React from "react";
import {
  borderRadius,
  borderWidth,
  colors,
  type Theme,
} from "@yeoooonn/ds-tokens";
import {
  resolveCheckboxRadioWrapperStyles,
  type CheckboxRadioColorScheme,
  type CheckboxRadioSize,
  type CheckboxRadioState,
} from "../_shared/checkboxRadioStyles";

export type CheckboxSize = CheckboxRadioSize;

export function resolveCheckboxStyles(
  size: CheckboxSize,
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
  input: React.CSSProperties;
  control: React.CSSProperties;
  checkIconColor: string;
  checkIconSize: number;
} {
  const {
    wrapper,
    label,
    labelText,
    message,
    messageHelperColor,
    messageErrorColor,
    tokens,
    sizeStyles,
  } = resolveCheckboxRadioWrapperStyles(size, theme, colorScheme, state);

  const isChecked = state === "checked" || state === "focus";

  return {
    wrapper,
    label,
    labelText,
    message,
    messageHelperColor,
    messageErrorColor,
    input: {
      position: "absolute",
      width: 1,
      height: 1,
      padding: 0,
      margin: -1,
      overflow: "hidden",
      clip: "rect(0, 0, 0, 0)",
      whiteSpace: "nowrap",
      border: 0,
    },
    control: {
      position: "relative",
      flexShrink: 0,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      boxSizing: "border-box",
      width: sizeStyles.controlSize,
      height: sizeStyles.controlSize,
      borderRadius: borderRadius.sm,
      border: `${borderWidth.base}px solid ${tokens.borderColor}`,
      backgroundColor: tokens.backgroundColor,
      boxShadow: `0 0 0 3px ${tokens.focusRingColor}`,
      transition:
        "border-color 0.15s, background-color 0.15s, box-shadow 0.15s",
    },
    checkIconColor: isChecked ? tokens.indicatorColor : colors.transparent,
    checkIconSize: sizeStyles.checkIconSize,
  };
}
