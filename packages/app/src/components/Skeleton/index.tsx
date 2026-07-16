import React, { useEffect, useRef } from "react";
import { Animated, type StyleProp, type ViewStyle } from "react-native";
import { borderRadius as radii } from "@yeoooonn/ds-tokens";
import { useTheme } from "../../theme/ThemeProvider";
import { cn } from "../../utils/cn";

export type SkeletonProps = {
  width?: number | `${number}%` | "100%";
  height?: number;
  rounded?: keyof typeof radii;
  className?: string;
  style?: StyleProp<ViewStyle>;
};

export function Skeleton({
  width = "100%",
  height = 16,
  rounded = "md",
  className,
  style,
}: SkeletonProps) {
  const { theme, colorScheme } = useTheme();
  const opacity = useRef(new Animated.Value(0.45)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.45,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      className={cn(className)}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[
        {
          width,
          height,
          borderRadius: radii[rounded],
          backgroundColor:
            colorScheme === "light"
              ? theme.background.tertiary
              : theme.background.secondary,
          opacity,
        },
        style,
      ]}
    />
  );
}
