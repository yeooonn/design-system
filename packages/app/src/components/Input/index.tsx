import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from "react-native";
import { spacing } from "@yeoooonn/ds-tokens";
import { useTheme } from "../../theme/ThemeProvider";
import { cn } from "../../utils/cn";
import {
  FIELD_DISABLED_OPACITY,
  resolveFieldState,
  resolveFieldTokens,
  type FieldSize,
  type FieldVariant,
} from "../_shared/fieldStyles";

export type InputSize = FieldSize;
export type InputVariant = FieldVariant;

export type InputProps = Omit<TextInputProps, "style"> & {
  variant?: InputVariant;
  size?: InputSize;
  label?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  error?: boolean;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
  inputClassName?: string;
};

export function Input({
  variant = "box",
  size = "md",
  label,
  prefix,
  suffix,
  error = false,
  helperText,
  errorMessage,
  disabled = false,
  editable,
  className,
  style,
  inputClassName,
  onFocus,
  onBlur,
  ...inputProps
}: InputProps) {
  const { theme, colorScheme } = useTheme();
  const [focused, setFocused] = useState(false);
  const isDisabled = disabled || editable === false;
  const hasError = error || Boolean(errorMessage);
  const showErrorMessage = hasError && Boolean(errorMessage);
  const description = showErrorMessage ? errorMessage : helperText;

  const state = resolveFieldState({
    disabled: isDisabled,
    error: hasError,
    focused,
  });
  const { tokens, sizeStyles, borderRadius, borderWidth, messageHelperColor, messageErrorColor } =
    resolveFieldTokens(variant, size, theme, colorScheme, state);

  const metaLineHeight = Math.round(sizeStyles.labelFontSize * 1.5);

  return (
    <View
      className={cn(className)}
      style={[
        {
          width: "100%",
          flexDirection: "column",
          opacity: isDisabled ? FIELD_DISABLED_OPACITY : 1,
        },
        style,
      ]}
    >
      <View style={{ minHeight: metaLineHeight, marginBottom: spacing[1] }}>
        {label ? (
          <Text
            style={{
              fontSize: sizeStyles.labelFontSize,
              color: tokens.labelColor,
              lineHeight: metaLineHeight,
            }}
          >
            {label}
          </Text>
        ) : null}
      </View>

      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          minHeight: sizeStyles.minHeight,
          gap: sizeStyles.gap,
          ...(variant === "line"
            ? {
                paddingBottom: sizeStyles.linePaddingBottom,
                borderBottomWidth: borderWidth,
                borderBottomColor: tokens.borderColor,
                backgroundColor: "transparent",
              }
            : {
                paddingHorizontal: sizeStyles.paddingInline,
                paddingVertical: sizeStyles.paddingBlock,
                borderRadius,
                borderWidth,
                borderColor: tokens.borderColor,
                backgroundColor: tokens.backgroundColor,
              }),
        }}
      >
        {prefix ? (
          <View style={{ flexShrink: 0 }}>
            {typeof prefix === "string" ? (
              <Text style={{ color: tokens.affixColor, fontSize: sizeStyles.fontSize }}>
                {prefix}
              </Text>
            ) : (
              prefix
            )}
          </View>
        ) : null}

        <TextInput
          {...inputProps}
          editable={!isDisabled}
          placeholderTextColor={tokens.placeholderColor}
          className={inputClassName}
          style={{
            flex: 1,
            minWidth: 0,
            color: tokens.color,
            fontSize: sizeStyles.fontSize,
            padding: 0,
            margin: 0,
          }}
          accessibilityState={{ disabled: isDisabled }}
          onFocus={(event) => {
            setFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            onBlur?.(event);
          }}
        />

        {suffix ? (
          <View style={{ flexShrink: 0 }}>
            {typeof suffix === "string" ? (
              <Text style={{ color: tokens.affixColor, fontSize: sizeStyles.fontSize }}>
                {suffix}
              </Text>
            ) : (
              suffix
            )}
          </View>
        ) : null}
      </View>

      <View style={{ minHeight: metaLineHeight, marginTop: spacing[1] }}>
        {description ? (
          <Text
            style={{
              fontSize: sizeStyles.labelFontSize,
              lineHeight: metaLineHeight,
              color: showErrorMessage ? messageErrorColor : messageHelperColor,
            }}
          >
            {description}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

