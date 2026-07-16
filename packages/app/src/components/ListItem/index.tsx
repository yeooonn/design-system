import React from "react";
import { Pressable, View, type StyleProp, type ViewStyle } from "react-native";
import { spacing } from "@yeoooonn/ds-tokens";
import { useTheme } from "../../theme/ThemeProvider";
import { cn } from "../../utils/cn";
import { Typography } from "../Typography";

export type ListItemProps = {
  title: string;
  description?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  disabled?: boolean;
  onPress?: () => void;
  className?: string;
  style?: StyleProp<ViewStyle>;
};

export function ListItem({
  title,
  description,
  leading,
  trailing,
  disabled = false,
  onPress,
  className,
  style,
}: ListItemProps) {
  const { theme } = useTheme();

  const content = (
    <View
      className={cn(className)}
      style={[
        {
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          gap: spacing[3],
          paddingVertical: spacing[3],
          opacity: disabled ? 0.5 : 1,
          backgroundColor: theme.background.primary,
        },
        style,
      ]}
    >
      {leading != null && (
        <View
          style={{
            flexShrink: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {leading}
        </View>
      )}
      <View style={{ flex: 1, gap: spacing[1], minWidth: 0 }}>
        <Typography.P1 numberOfLines={1}>{title}</Typography.P1>
        {description && (
          <Typography.P2 color="secondary" numberOfLines={2}>
            {description}
          </Typography.P2>
        )}
      </View>
      {trailing && (
        <View
          style={{
            flexShrink: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {trailing}
        </View>
      )}
    </View>
  );

  if (!onPress) return content;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
    >
      {content}
    </Pressable>
  );
}
