import React from "react";
import {
  Image,
  Text,
  View,
  type ImageSourcePropType,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { borderRadius, fontWeight } from "@yeoooonn/ds-tokens";
import { appFontSize as fontSize } from "../../tokens/typography";
import { useTheme } from "../../theme/ThemeProvider";

export type AvatarSize = "sm" | "md" | "lg" | "xl";

const avatarSize: Record<AvatarSize, { box: number; text: number }> = {
  sm: { box: 24, text: fontSize.xs },
  md: { box: 32, text: fontSize.sm },
  lg: { box: 40, text: fontSize.md },
  xl: { box: 56, text: fontSize.lg },
};

export type AvatarProps = {
  src?: ImageSourcePropType;
  name?: string;
  size?: AvatarSize;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
};

function getInitials(name?: string) {
  if (!name?.trim()) return "?";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

export function Avatar({
  src,
  name,
  size = "md",
    style,
  accessibilityLabel,
}: AvatarProps) {
  const { theme } = useTheme();
  const { box, text } = avatarSize[size];
  const label = accessibilityLabel ?? name ?? "Avatar";

  return (
    <View
      accessibilityRole="image"
      accessibilityLabel={label}
      style={[
        {
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          width: box,
          height: box,
          borderRadius: borderRadius.full,
          backgroundColor: theme.avatar.background,
        },
        style,
      ]}
    >
      {src ? (
        <Image
          source={src}
          style={{ width: box, height: box }}
          resizeMode="cover"
          accessibilityIgnoresInvertColors
        />
      ) : (
        <Text
          style={{
            color: theme.avatar.text,
            fontSize: text,
            fontWeight: fontWeight.semibold as "600",
            lineHeight: text,
          }}
        >
          {getInitials(name)}
        </Text>
      )}
    </View>
  );
}
