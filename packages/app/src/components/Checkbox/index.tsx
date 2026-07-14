import React, { useState } from "react";
import {
  Pressable,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { borderRadius, borderWidth, colors } from "@yeoooonn/ds-tokens";
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
  /** RN 관례. onCheckedChange와 동일 */
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
        fontWeight: "700",
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
  const { tokens, sizeStyles, messageHelperColor, messageErrorColor, disabledOpacity } =
    resolveCheckboxRadioMeta(size, theme, colorScheme, state);
  const showIndicator = isChecked || indeterminate;

  return (
    <View className={cn("self-start", className)} style={[{ opacity: disabledOpacity }, style]}>
      <Pressable
        disabled={disabled}
        onPress={() => {
          const next = !isChecked;
          onPress?.(next);
          onCheckedChange?.(next);
        }}
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
        className="flex-row items-center"
        style={{ gap: sizeStyles.gap }}
      >
        <View
          className="items-center justify-center"
          style={{
            width: sizeStyles.controlSize,
            height: sizeStyles.controlSize,
            borderRadius: borderRadius.sm,
            borderWidth: borderWidth.base,
            borderColor: tokens.borderColor,
            backgroundColor: tokens.backgroundColor,
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
            marginTop: 4,
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
