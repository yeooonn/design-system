import React from "react";
import {
  Platform,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { borderRadius, spacing } from "@yeoooonn/ds-tokens";
import { useTheme } from "../../theme/ThemeProvider";
import { resolveCardShadowStyle } from "./cardStyles";

type CardSectionProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

type CardProps = CardSectionProps & {
  boxShadow?: boolean;
};

function CardHeader({ children, style }: CardSectionProps) {
  return (
    <View
      style={[{ flexShrink: 0, padding: spacing[4] }, style]}
    >
      {children}
    </View>
  );
}

function CardContent({ children, style }: CardSectionProps) {
  return (
    <View
      style={[{ flex: 1, padding: spacing[4] }, style]}
    >
      {children}
    </View>
  );
}

function CardFooter({ children, style }: CardSectionProps) {
  return (
    <View
      style={[
        {
          flexShrink: 0,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: spacing[2],
          padding: spacing[4],
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

function CardRoot({
  children,
  boxShadow = false,
  style,
}: CardProps) {
  const { theme } = useTheme();
  const surfaceColor = theme.surface.elevated.background;

  const surfaceStyle: StyleProp<ViewStyle> = {
    flexDirection: "column",
    overflow: "hidden",
    backgroundColor: surfaceColor,
    borderWidth: 1,
    borderColor: theme.border.default,
    borderRadius: borderRadius.lg,
  };

  if (!boxShadow) {
    return (
      <View style={[surfaceStyle, style]}>
        {children}
      </View>
    );
  }

  const shadowStyle = resolveCardShadowStyle(theme);

  // Web: boxShadow는 surface와 같은 View에 적용 (웹 cardStyles와 동일)
  if (Platform.OS === "web") {
    return (
      <View
        style={[surfaceStyle, shadowStyle, style]}
      >
        {children}
      </View>
    );
  }

  // Native: overflow:"hidden"은 shadow*를 잘라낸다 → shadow는 바깥 View에만 적용
  return (
    <View style={[{ borderRadius: borderRadius.lg }, shadowStyle, style]}>
      <View style={[surfaceStyle, { width: "100%" }]}>
        {children}
      </View>
    </View>
  );
}

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter,
});
