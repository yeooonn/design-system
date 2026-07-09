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

export type RadioSize = CheckboxRadioSize;

export function resolveRadioStyles(
  size: RadioSize,
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
  dot: React.CSSProperties;
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
      borderRadius: borderRadius.full,
      border: `${borderWidth.base}px solid ${tokens.borderColor}`,
      backgroundColor: isChecked
        ? theme.background.primary
        : tokens.backgroundColor,
      boxShadow: `0 0 0 3px ${tokens.focusRingColor}`,
      transition:
        "border-color 0.15s, background-color 0.15s, box-shadow 0.15s",
    },
    dot: {
      width: sizeStyles.radioDotSize,
      height: sizeStyles.radioDotSize,
      borderRadius: borderRadius.full,
      backgroundColor: isChecked ? theme.action.primary : colors.transparent,
      transition: "background-color 0.15s, transform 0.15s",
      transform: isChecked ? "scale(1)" : "scale(0)",
    },
  };
}
