import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { borderRadius, borderWidth } from "@yeoooonn/ds-tokens";
import { useTheme } from "../../theme/ThemeProvider";
import { cn } from "../../utils/cn";
import {
  resolveCheckboxRadioMeta,
  resolveCheckboxRadioState,
  type CheckboxRadioSize,
} from "../_shared/checkboxRadioStyles";

export type RadioSize = CheckboxRadioSize;

export type RadioProps = {
  size?: RadioSize;
  label?: React.ReactNode;
  error?: boolean;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  checked?: boolean;
  value?: string;
  onPress?: () => void;
  className?: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
};

export function Radio({
  size = "md",
  label,
  error = false,
  helperText,
  errorMessage,
  disabled = false,
  checked = false,
  onPress,
  className,
  style,
  accessibilityLabel,
}: RadioProps) {
  const { theme, colorScheme } = useTheme();
  const [focused, setFocused] = useState(false);
  const scale = useRef(new Animated.Value(checked ? 1 : 0)).current;
  const hasError = error || Boolean(errorMessage);
  const showErrorMessage = hasError && Boolean(errorMessage);
  const description = showErrorMessage ? errorMessage : helperText;
  const isChecked = Boolean(checked);

  const state = resolveCheckboxRadioState({
    disabled,
    error: hasError,
    focused,
    checked: isChecked,
  });
  const { tokens, sizeStyles, messageHelperColor, messageErrorColor, disabledOpacity } =
    resolveCheckboxRadioMeta(size, theme, colorScheme, state);

  useEffect(() => {
    Animated.timing(scale, {
      toValue: isChecked ? 1 : 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [isChecked, scale]);

  return (
    <View className={cn("self-start", className)} style={[{ opacity: disabledOpacity }, style]}>
      <Pressable
        disabled={disabled}
        onPress={onPress}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        accessibilityRole="radio"
        accessibilityState={{ checked: isChecked, disabled }}
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
            borderRadius: borderRadius.full,
            borderWidth: borderWidth.base,
            borderColor: tokens.borderColor,
            backgroundColor: isChecked
              ? theme.background.primary
              : tokens.backgroundColor,
          }}
        >
          <Animated.View
            style={{
              width: sizeStyles.radioDotSize,
              height: sizeStyles.radioDotSize,
              borderRadius: borderRadius.full,
              backgroundColor: theme.action.primary,
              opacity: scale,
              transform: [{ scale }],
            }}
          />
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
