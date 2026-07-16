import type React from "react";
import {
  borderRadius,
  borderWidth,
  colors,
  fontWeight,
  spacing,
  type Theme,
} from "@yeoooonn/ds-tokens";
import { resolveButtonRound } from "../Button/buttonStyles";
import {
  inputSizeStyles,
  resolveInputState,
  type InputSize,
  type InputState,
  type InputVariant,
} from "../Input/inputStyles";

export type SelectVariant = InputVariant;
export type SelectSize = InputSize;
export type SelectColorScheme = "light" | "dark";

export { resolveInputState as resolveSelectState };

type SelectStyleTokens = {
  backgroundColor: string;
  borderColor: string;
  color: string;
  labelColor: string;
  chevronColor: string;
  placeholderColor: string;
};

function getSelectStyleTokens(
  theme: Theme,
  colorScheme: SelectColorScheme,
  state: InputState,
): SelectStyleTokens {
  const isDisabled = state === "disabled";
  const isError = state === "error";
  const isFocus = state === "focus";

  if (isDisabled) {
    return {
      backgroundColor: theme.field.background.disabled,
      borderColor: theme.border.default,
      color: theme.text.tertiary,
      labelColor: theme.text.tertiary,
      chevronColor: theme.text.tertiary,
      placeholderColor: theme.text.tertiary,
    };
  }

  if (isError) {
    return {
      backgroundColor: theme.field.background.error,
      borderColor: colors.error[400],
      color: theme.text.primary,
      labelColor: colors.error[400],
      chevronColor: theme.text.primary,
      placeholderColor: theme.text.tertiary,
    };
  }

  if (isFocus) {
    return {
      backgroundColor: theme.field.background.focus,
      borderColor: colors.primary[300],
      color: theme.text.primary,
      labelColor: theme.text.secondary,
      chevronColor: theme.text.primary,
      placeholderColor: theme.text.tertiary,
    };
  }

  return {
    backgroundColor: theme.field.background.default,
    borderColor: theme.border.default,
    color: theme.text.primary,
    labelColor: theme.text.secondary,
    chevronColor: theme.text.primary,
    placeholderColor: theme.text.tertiary,
  };
}

export function resolveSelectListStyles(
  size: SelectSize,
  theme: Theme,
  colorScheme: SelectColorScheme,
): {
  listbox: React.CSSProperties;
  option: React.CSSProperties;
  optionLabel: React.CSSProperties;
  optionSelected: React.CSSProperties;
  optionHighlighted: React.CSSProperties;
  optionDisabled: React.CSSProperties;
  checkIcon: React.CSSProperties;
  checkIconColor: string;
} {
  const sizeStyles = inputSizeStyles[size];
  const isDark = colorScheme === "dark";

  return {
    listbox: {
      position: "absolute",
      top: "calc(100% + 4px)",
      left: 0,
      right: 0,
      zIndex: 20,
      margin: 0,
      padding: spacing[1],
      listStyle: "none",
      boxSizing: "border-box",
      maxHeight: 240,
      overflowX: "hidden",
      overflowY: "auto",
      backgroundColor: theme.surface.elevated.background,
      border: `${borderWidth.thin}px solid ${theme.border.default}`,
      borderRadius: borderRadius.md,
      boxShadow: isDark
        ? "0 12px 32px rgba(0, 0, 0, 0.45)"
        : "0 10px 24px rgba(17, 24, 39, 0.12), 0 4px 8px rgba(17, 24, 39, 0.06)",
    },
    option: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: spacing[2],
      width: "100%",
      minWidth: 0,
      boxSizing: "border-box",
      minHeight: size === "sm" ? 32 : size === "md" ? 40 : 44,
      paddingInline: spacing[3],
      paddingBlock: spacing[2],
      border: "none",
      borderRadius: borderRadius.sm,
      backgroundColor: colors.transparent,
      color: theme.text.primary,
      fontSize: sizeStyles.fontSize,
      fontWeight: fontWeight.regular,
      lineHeight: 1.5,
      textAlign: "left",
      cursor: "pointer",
      overflow: "hidden",
      transition: "background-color 0.12s, color 0.12s",
    },
    optionLabel: {
      flex: 1,
      minWidth: 0,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    optionSelected: {
      backgroundColor: theme.field.background.focus,
      color: isDark ? colors.primary[300] : theme.action.primaryHover,
      fontWeight: fontWeight.regular,
    },
    optionHighlighted: {
      backgroundColor: theme.background.tertiary,
    },
    optionDisabled: {
      color: theme.text.tertiary,
      cursor: "not-allowed",
      backgroundColor: colors.transparent,
    },
    checkIcon: {
      flexShrink: 0,
      display: "inline-flex",
    },
    checkIconColor: theme.action.primary,
  };
}

export function resolveSelectStyles(
  variant: SelectVariant,
  size: SelectSize,
  theme: Theme,
  colorScheme: SelectColorScheme,
  state: InputState,
  open = false,
): {
  root: React.CSSProperties;
  wrapper: React.CSSProperties;
  field: React.CSSProperties;
  trigger: React.CSSProperties;
  triggerLabel: React.CSSProperties;
  label: React.CSSProperties;
  chevron: React.CSSProperties;
  message: React.CSSProperties;
  messageHelperColor: string;
  messageErrorColor: string;
  placeholderColor: string;
} {
  const tokens = getSelectStyleTokens(theme, colorScheme, state);
  const sizeStyles = inputSizeStyles[size];
  const border = `${borderWidth.thin}px solid ${tokens.borderColor}`;
  const isDisabled = state === "disabled";

  const trigger: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: sizeStyles.gap,
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
    textAlign: "left",
    cursor: isDisabled ? "not-allowed" : "pointer",
  };

  const triggerLabel: React.CSSProperties = {
    flex: 1,
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };

  const chevron: React.CSSProperties = {
    flexShrink: 0,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: tokens.chevronColor,
    transition: "transform 0.15s ease",
    transform: open ? "rotate(180deg)" : "rotate(0deg)",
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

  const root: React.CSSProperties = {
    position: "relative",
    width: "100%",
  };

  if (variant === "line") {
    return {
      placeholderColor: tokens.placeholderColor,
      root,
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
      trigger,
      triggerLabel,
      label,
      chevron,
      message,
      messageHelperColor,
      messageErrorColor,
    };
  }

  return {
    placeholderColor: tokens.placeholderColor,
    root,
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
    trigger,
    triggerLabel,
    label,
    chevron,
    message,
    messageHelperColor,
    messageErrorColor,
  };
}
