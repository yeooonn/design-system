import React from "react";
import { Text, View, type StyleProp, type ViewStyle } from "react-native";
import { borderRadius, fontWeight } from "@yeoooonn/ds-tokens";
import { cn } from "../../utils/cn";
import {
  badgeFontSize,
  badgePadding,
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
  const labelFontSize = badgeFontSize[size];

  return (
    <View
      className={cn(className)}
      style={[
        {
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "flex-start",
          borderRadius: borderRadius.full,
          ...badgePadding[size],
          backgroundColor: colorStyles.backgroundColor,
        },
        style,
      ]}
    >
      <Text
        style={{
          color: colorStyles.textColor,
          fontSize: labelFontSize,
          fontWeight: fontWeight.semibold as "600",
          lineHeight: labelFontSize,
        }}
      >
        {children}
      </Text>
    </View>
  );
}

export type { BadgeColor, BadgeSize, BadgeVariant };
