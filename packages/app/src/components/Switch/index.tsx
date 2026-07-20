import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { borderRadius, colors, spacing, type Theme } from "@yeoooonn/ds-tokens";
import { useTheme } from "../../theme/ThemeProvider";
import {
  resolveCheckboxRadioMeta,
  resolveCheckboxRadioState,
  type CheckboxRadioSize,
} from "../_shared/checkboxRadioStyles";

export type SwitchSize = CheckboxRadioSize;

const switchSizeStyles: Record<
  SwitchSize,
  {
    trackWidth: number;
    trackHeight: number;
    thumbSize: number;
    thumbInset: number;
  }
> = {
  sm: { trackWidth: 28, trackHeight: 16, thumbSize: 12, thumbInset: 2 },
  md: { trackWidth: 36, trackHeight: 20, thumbSize: 16, thumbInset: 2 },
  lg: { trackWidth: 44, trackHeight: 24, thumbSize: 20, thumbInset: 2 },
};

function resolveTrackBackground({
  theme,
  disabled,
  error,
  checked,
}: {
  theme: Theme;
  disabled: boolean;
  error: boolean;
  checked: boolean;
}) {
  if (disabled) {
    return theme.switch.track.disabled;
  }

  if (error && checked) return colors.error[400];

  if (error) {
    return theme.switch.track.error;
  }

  if (checked) return theme.action.primary;

  return theme.switch.track.unchecked;
}

export type SwitchProps = {
  size?: SwitchSize;
  label?: string;
  error?: boolean;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  checked?: boolean;
  /** RN 관례. onCheckedChange와 동일 */
  onPress?: (checked: boolean) => void;
  onCheckedChange?: (checked: boolean) => void;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
};

export function Switch({
  size = "md",
  label,
  error = false,
  helperText,
  errorMessage,
  disabled = false,
  checked = false,
  onPress,
  onCheckedChange,
    style,
  accessibilityLabel,
}: SwitchProps) {
  const { theme } = useTheme();
  const [focused, setFocused] = useState(false);
  const dims = switchSizeStyles[size];
  const isChecked = Boolean(checked);
  const thumbOffset = useRef(
    new Animated.Value(
      isChecked
        ? dims.trackWidth - dims.thumbSize - dims.thumbInset
        : dims.thumbInset,
    ),
  ).current;

  const hasLabel = Boolean(label);
  const hasError = error || Boolean(errorMessage);
  const showErrorMessage = hasError && Boolean(errorMessage);
  const description = showErrorMessage ? errorMessage : helperText;

  const state = resolveCheckboxRadioState({
    disabled,
    error: hasError,
    focused,
    checked: isChecked,
  });

  const {
    tokens,
    sizeStyles,
    messageHelperColor,
    messageErrorColor,
    disabledOpacity,
  } = resolveCheckboxRadioMeta(size, theme, state);

  useEffect(() => {
    Animated.timing(thumbOffset, {
      toValue: isChecked
        ? dims.trackWidth - dims.thumbSize - dims.thumbInset
        : dims.thumbInset,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [dims, isChecked, thumbOffset]);

  const trackBackgroundColor = resolveTrackBackground({
    theme,
    disabled,
    error: hasError,
    checked: isChecked,
  });

  return (
    <View
      style={[
        {
          // label이 있을 때만 가로로 늘어남. trailing용(아이콘만)일 땐 intrinsic width 유지
          width: hasLabel ? "100%" : undefined,
          alignSelf: hasLabel ? undefined : "flex-start",
          opacity: disabledOpacity,
        },
        style,
      ]}
    >
      <Pressable
        disabled={disabled}
        onPress={() => {
          const next = !isChecked;
          onPress?.(next);
          onCheckedChange?.(next);
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        accessibilityRole="switch"
        accessibilityState={{ checked: isChecked, disabled }}
        accessibilityLabel={accessibilityLabel ?? label}
        style={{
          width: hasLabel ? "100%" : undefined,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: hasLabel ? "space-between" : "center",
          gap: hasLabel ? sizeStyles.gap : 0,
        }}
      >
        {hasLabel ? (
          <Text
            style={{
              flex: 1,
              fontSize: sizeStyles.fontSize,
              color: tokens.labelColor,
              lineHeight: sizeStyles.fontSize * 1.5,
            }}
          >
            {label}
          </Text>
        ) : null}

        <View
          style={{
            width: dims.trackWidth,
            height: dims.trackHeight,
            borderRadius: borderRadius.full,
            backgroundColor: trackBackgroundColor,
            justifyContent: "center",
          }}
        >
          <Animated.View
            style={{
              position: "absolute",
              top: dims.thumbInset,
              left: thumbOffset,
              width: dims.thumbSize,
              height: dims.thumbSize,
              borderRadius: borderRadius.full,
              backgroundColor: colors.white,
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowRadius: 2,
              shadowOffset: { width: 0, height: 1 },
              elevation: 2,
            }}
          />
        </View>
      </Pressable>

      {description ? (
        <Text
          style={{
            marginTop: spacing[1],
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
