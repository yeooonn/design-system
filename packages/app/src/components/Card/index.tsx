import React from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { cn } from "../../utils/cn";
import { borderRadius } from "@yeoooonn/ds-tokens";

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
    <View className={cn("shrink-0 p-4", className)} style={style}>
      {children}
    </View>
  );
}

function CardContent({ children, className, style }: CardSectionProps) {
  return (
    <View
      className={cn("flex-1 p-4", className)}
      style={[{ flex: 1 }, style]}
    >
      {children}
    </View>
  );
}

function CardFooter({ children, className, style }: CardSectionProps) {
  return (
    <View
      className={cn(
        "shrink-0 flex-row items-center justify-between gap-2 p-4",
        className,
      )}
      style={style}
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

  return (
    <View
      className={cn("flex-col overflow-hidden rounded-lg", className)}
      style={[
        {
          backgroundColor: theme.background.primary,
          borderWidth: 1,
          borderColor: theme.border.default,
          borderRadius: borderRadius.lg,
          ...(boxShadow
            ? {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.08,
                shadowRadius: 6,
                elevation: 3,
              }
            : null),
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter,
});
