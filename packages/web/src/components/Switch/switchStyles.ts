import type React from "react";
import { borderRadius, colors, type Theme } from "@yeoooonn/ds-tokens";
import {
  resolveCheckboxRadioWrapperStyles,
  type CheckboxRadioColorScheme,
  type CheckboxRadioSize,
  type CheckboxRadioState,
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

function resolveSwitchTrackTokens({
  theme,
  colorScheme,
  disabled,
  error,
  focused,
  checked,
}: {
  theme: Theme;
  colorScheme: CheckboxRadioColorScheme;
  disabled: boolean;
  error: boolean;
  focused: boolean;
  checked: boolean;
}): {
  trackBackgroundColor: string;
  focusRingColor: string;
} {
  if (disabled) {
    return {
      trackBackgroundColor: theme.switch.track.disabled,
      focusRingColor: colors.transparent,
    };
  }

  if (error) {
    return {
      trackBackgroundColor: checked
        ? colors.error[400]
        : theme.switch.track.error,
      focusRingColor: focused ? theme.focusRing.error : colors.transparent,
    };
  }

  if (checked) {
    return {
      trackBackgroundColor: theme.action.primary,
      focusRingColor: focused ? theme.focusRing.primary : colors.transparent,
    };
  }

  return {
    trackBackgroundColor: theme.switch.track.unchecked,
    focusRingColor: focused ? theme.focusRing.primary : colors.transparent,
  };
}

export function resolveSwitchStyles(
  size: SwitchSize,
  theme: Theme,
  colorScheme: CheckboxRadioColorScheme,
  state: CheckboxRadioState,
  {
    checked,
    disabled,
    error,
    focused,
  }: {
    checked: boolean;
    disabled: boolean;
    error: boolean;
    focused: boolean;
  },
): {
  wrapper: React.CSSProperties;
  label: React.CSSProperties;
  labelText: React.CSSProperties;
  message: React.CSSProperties;
  messageHelperColor: string;
  messageErrorColor: string;
  input: React.CSSProperties;
  track: React.CSSProperties;
  thumb: React.CSSProperties;
} {
  const {
    wrapper,
    label,
    labelText,
    message,
    messageHelperColor,
    messageErrorColor,
  } = resolveCheckboxRadioWrapperStyles(size, theme, colorScheme, state);

  const dims = switchSizeStyles[size];
  const trackTokens = resolveSwitchTrackTokens({
    theme,
    colorScheme,
    disabled,
    error,
    focused,
    checked,
  });

  const thumbOffset = checked
    ? dims.trackWidth - dims.thumbSize - dims.thumbInset
    : dims.thumbInset;

  return {
    wrapper: {
      ...wrapper,
      width: "100%",
    },
    label: {
      ...label,
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
    },
    labelText,
    message: {
      ...message,
      marginLeft: 0,
    },
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
    track: {
      position: "relative",
      flexShrink: 0,
      boxSizing: "border-box",
      width: dims.trackWidth,
      height: dims.trackHeight,
      borderRadius: borderRadius.full,
      backgroundColor: trackTokens.trackBackgroundColor,
      boxShadow: `0 0 0 3px ${trackTokens.focusRingColor}`,
      transition: "background-color 0.15s, box-shadow 0.15s",
    },
    thumb: {
      position: "absolute",
      top: dims.thumbInset,
      left: thumbOffset,
      width: dims.thumbSize,
      height: dims.thumbSize,
      borderRadius: borderRadius.full,
      backgroundColor: theme.text.inverse,
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
      transition: "left 0.15s",
      pointerEvents: "none",
    },
  };
}
