import React from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import { borderRadius, spacing } from "@yeoooonn/ds-tokens";
import { useTheme } from "../../theme/ThemeProvider";
import { cn } from "../../utils/cn";

type CardSectionProps = {
  children: React.ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
};

type CardProps = CardSectionProps & {
  boxShadow?: boolean;
};

function CardHeader({ children, className, style }: CardSectionProps) {
  return (
    <View
      className={cn(className)}
      style={[{ flexShrink: 0, padding: spacing[4] }, style]}
    >
      {children}
    </View>
  );
}

function CardContent({ children, className, style }: CardSectionProps) {
  return (
    <View
      className={cn(className)}
      style={[{ flex: 1, padding: spacing[4] }, style]}
    >
      {children}
    </View>
  );
}

function CardFooter({ children, className, style }: CardSectionProps) {
  return (
    <View
      className={cn(className)}
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
  className,
  style,
}: CardProps) {
  const { theme } = useTheme();
  const isElevatedSurface = theme.surface.elevated.borderWidth > 0;
  const surfaceColor = theme.surface.elevated.background;

  const surfaceStyle: StyleProp<ViewStyle> = {
    flexDirection: "column",
    overflow: "hidden",
    backgroundColor: surfaceColor,
    borderWidth: 1,
    borderColor: theme.border.default,
    borderRadius: borderRadius.lg,
  };

  const surface = (
    <View className={cn(className)} style={[surfaceStyle, style]}>
      {children}
    </View>
  );

  if (!boxShadow) {
    return surface;
  }

  // iOS: overflow:"hidden"은 그림자를 잘라낸다 → shadow는 바깥 View에만 적용
  // className/style은 surface(안쪽)에 적용. 그림자는 outer 전용.
  return (
    <View
      style={{
        borderRadius: borderRadius.lg,
        backgroundColor: surfaceColor,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: isElevatedSurface ? 8 : 4 },
        shadowOpacity: isElevatedSurface ? 0.55 : 0.12,
        shadowRadius: isElevatedSurface ? 20 : 8,
        elevation: isElevatedSurface ? 10 : 4,
      }}
    >
      {surface}
    </View>
  );
}

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter,
});
