import React from "react";
import {
  ActivityIndicator,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { cn } from "../../utils/cn";

export type SpinnerSize = "sm" | "md" | "lg";

/** RN ActivityIndicator는 small/large만 지원하므로 scale로 sm·md를 구분한다. */
const spinnerVisual: Record<
  SpinnerSize,
  { nativeSize: "small" | "large"; scale: number }
> = {
  sm: { nativeSize: "small", scale: 0.85 },
  md: { nativeSize: "small", scale: 1 },
  lg: { nativeSize: "large", scale: 1 },
};

export type SpinnerProps = {
  size?: SpinnerSize;
  color?: string;
  className?: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
};

export function Spinner({
  size = "md",
  color,
  className,
  style,
  accessibilityLabel = "Loading",
}: SpinnerProps) {
  const { theme } = useTheme();
  const visual = spinnerVisual[size];

  return (
    <View
      className={cn(className)}
      style={[
        {
          alignItems: "center",
          justifyContent: "center",
          transform: [{ scale: visual.scale }],
        },
        style,
      ]}
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
    >
      <ActivityIndicator
        size={visual.nativeSize}
        color={color ?? theme.action.primary}
      />
    </View>
  );
}
