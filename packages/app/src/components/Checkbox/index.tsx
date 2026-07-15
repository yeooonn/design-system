import React, { useState } from "react";
import {
  Pressable,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { borderRadius, borderWidth, colors, fontWeight, spacing } from "@yeoooonn/ds-tokens";
import { useTheme } from "../../theme/ThemeProvider";
import { cn } from "../../utils/cn";
import {
  resolveCheckboxRadioMeta,
  resolveCheckboxRadioState,
  type CheckboxRadioSize,
} from "../_shared/checkboxRadioStyles";

export type CheckboxSize = CheckboxRadioSize;

export type CheckboxProps = {
  size?: CheckboxSize;
  label?: React.ReactNode;
  error?: boolean;
  helperText?: string;
  errorMessage?: string;
  indeterminate?: boolean;
  disabled?: boolean;
  checked?: boolean;
  /** @deprecated Prefer onCheckedChange. Kept for RN-style convenience. */
  onPress?: (checked: boolean) => void;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
};

function CheckMark({
  color,
  size,
  indeterminate,
}: {
  color: string;
  size: number;
  indeterminate: boolean;
}) {
  return (
    <Text
      style={{
        color,
        fontSize: size,
        fontWeight: fontWeight.bold as "700",
        lineHeight: size,
        includeFontPadding: false,
      }}
    >
      {indeterminate ? "−" : "✓"}
    </Text>
  );
}

export function Checkbox({
  size = "md",
  label,
  error = false,
  helperText,
  errorMessage,
  indeterminate = false,
  disabled = false,
  checked = false,
  onPress,
  onCheckedChange,
  className,
  style,
  accessibilityLabel,
}: CheckboxProps) {
  const { theme, colorScheme } = useTheme();
  const [focused, setFocused] = useState(false);
  const hasError = error || Boolean(errorMessage);
  const showErrorMessage = hasError && Boolean(errorMessage);
  const description = showErrorMessage ? errorMessage : helperText;
  const isChecked = Boolean(checked);

  const state = resolveCheckboxRadioState({
    disabled,
    error: hasError,
    focused,
    checked: isChecked || indeterminate,
  });
  const {
    tokens,
    sizeStyles,
    messageHelperColor,
    messageErrorColor,
    disabledOpacity,
  } = resolveCheckboxRadioMeta(size, theme, colorScheme, state);
  const showIndicator = isChecked || indeterminate;
  const handleChange = onCheckedChange ?? onPress;

  return (
    <View
      className={cn(className)}
      style={[{ alignSelf: "flex-start", opacity: disabledOpacity }, style]}
    >
      <Pressable
        disabled={disabled}
        onPress={() => handleChange?.(!isChecked)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        accessibilityRole="checkbox"
        accessibilityState={{
          checked: indeterminate ? "mixed" : isChecked,
          disabled,
        }}
        accessibilityLabel={
          accessibilityLabel ?? (typeof label === "string" ? label : undefined)
        }
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: sizeStyles.gap,
        }}
      >
        <View
          style={{
            width: sizeStyles.controlSize,
            height: sizeStyles.controlSize,
            borderRadius: borderRadius.sm,
            borderWidth: borderWidth.base,
            borderColor: tokens.borderColor,
            backgroundColor: tokens.backgroundColor,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: tokens.focusRingColor,
            shadowOpacity: tokens.focusRingColor === colors.transparent ? 0 : 1,
            shadowRadius: 3,
            shadowOffset: { width: 0, height: 0 },
          }}
        >
          {showIndicator ? (
            <CheckMark
              color={tokens.indicatorColor}
              size={sizeStyles.checkIconSize}
              indeterminate={indeterminate}
            />
          ) : null}
        </View>
        {label != null ? (
          typeof label === "string" ? (
            <Text
              style={{
                fontSize: sizeStyles.fontSize,
                color: tokens.labelColor,
                lineHeight: sizeStyles.fontSize * 1.5,
              }}
            >
              {label}
            </Text>
          ) : (
            label
          )
        ) : null}
      </Pressable>
      {description ? (
        <Text
          style={{
            marginTop: spacing[1],
            marginLeft: sizeStyles.controlSize + sizeStyles.gap,
            fontSize: sizeStyles.labelFontSize,
            color: showErrorMessage ? messageErrorColor : messageHelperColor,
          }}
        >
          {description}
        </Text>
      ) : null}
    </View>
  );
}
