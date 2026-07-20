import React from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import { spacing } from "@yeoooonn/ds-tokens";
import { useTheme } from "../../theme/ThemeProvider";

export type DividerOrientation = "horizontal" | "vertical";

export type DividerProps = {
  orientation?: DividerOrientation;
  style?: StyleProp<ViewStyle>;
};

export function Divider({
  orientation = "horizontal",
    style,
}: DividerProps) {
  const { theme } = useTheme();
  const isHorizontal = orientation === "horizontal";

  return (
    <View
      accessibilityRole="none"
      style={[
        {
          backgroundColor: theme.border.default,
          ...(isHorizontal
            ? { height: 1, width: "100%", alignSelf: "stretch" }
            : { width: 1, alignSelf: "stretch", minHeight: spacing[4] }),
        },
        style,
      ]}
    />
  );
}
