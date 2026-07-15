import React from "react";
import {
  Image,
  Text,
  View,
  type ImageSourcePropType,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { borderRadius, colors, fontWeight } from "@yeoooonn/ds-tokens";
import { appFontSize as fontSize } from "../../tokens/typography";
import { useTheme } from "../../theme/ThemeProvider";
import { cn } from "../../utils/cn";

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
  className?: string;
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
  className,
  style,
  accessibilityLabel,
}: AvatarProps) {
  const { colorScheme } = useTheme();
  const { box, text } = avatarSize[size];
  const label = accessibilityLabel ?? name ?? "Avatar";

  return (
    <View
      className={cn(className)}
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
          backgroundColor:
            colorScheme === "light" ? colors.primary[100] : colors.primary[800],
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
            color:
              colorScheme === "light"
                ? colors.primary[700]
                : colors.primary[200],
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
