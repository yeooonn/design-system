import React from "react";
import { Text, View, type StyleProp, type ViewStyle } from "react-native";
import { fontWeight } from "@yeoooonn/ds-tokens";
import { cn } from "../../utils/cn";
import {
  badgeFontSize,
  badgePadding,
  badgeVariants,
  resolveBadgeStyles,
  type BadgeColor,
  type BadgeSize,
  type BadgeVariant,
} from "./badgeStyles";

export type BadgeProps = {
  children: React.ReactNode;
  color?: BadgeColor;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  style?: StyleProp<ViewStyle>;
};

export function Badge({
  children,
  color = "blue",
  variant = "soft",
  size = "md",
  className,
  style,
}: BadgeProps) {
  const colorStyles = resolveBadgeStyles(color, variant);

  return (
    <View
      className={cn(badgeVariants({ size }), className)}
      style={[
        {
          ...badgePadding[size],
          backgroundColor: colorStyles.backgroundColor,
        },
        style,
      ]}
    >
      <Text
        style={{
          color: colorStyles.color,
          fontSize: badgeFontSize[size],
          fontWeight: fontWeight.semibold as "600",
          lineHeight: badgeFontSize[size],
        }}
      >
        {children}
      </Text>
    </View>
  );
}

export type { BadgeColor, BadgeSize, BadgeVariant };
