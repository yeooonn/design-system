import React from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { cn } from "../../utils/cn";

export type DividerOrientation = "horizontal" | "vertical";

export type DividerProps = {
  orientation?: DividerOrientation;
  className?: string;
  style?: StyleProp<ViewStyle>;
};

export function Divider({
  orientation = "horizontal",
  className,
  style,
}: DividerProps) {
  const { theme } = useTheme();
  const isHorizontal = orientation === "horizontal";

  return (
    <View
      className={cn(className)}
      accessibilityRole="none"
      style={[
        {
          backgroundColor: theme.border.default,
          ...(isHorizontal
            ? { height: 1, width: "100%", alignSelf: "stretch" }
            : { width: 1, alignSelf: "stretch", minHeight: 16 }),
        },
        style,
      ]}
    />
  );
}
