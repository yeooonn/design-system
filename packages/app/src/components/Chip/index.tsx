import React from "react";
import {
  Pressable,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { borderRadius, fontWeight, spacing } from "@yeoooonn/ds-tokens";
import { useTheme } from "../../theme/ThemeProvider";
import { cn } from "../../utils/cn";
import {
  chipFontSize,
  chipPadding,
  CLOSE_HIT_SLOP,
  resolveChipStyles,
  type ChipColor,
  type ChipSize,
} from "./chipStyles";

export type ChipProps = {
  children: React.ReactNode;
  color?: ChipColor;
  size?: ChipSize;
  selected?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  onClose?: () => void;
  className?: string;
  style?: StyleProp<ViewStyle>;
};

type ChipContentProps = {
  children: React.ReactNode;
  size: ChipSize;
  colorStyles: ReturnType<typeof resolveChipStyles>;
  disabled: boolean;
  onClose?: () => void;
  className?: string;
  style?: StyleProp<ViewStyle>;
};

function ChipContent({
  children,
  size,
  colorStyles,
  disabled,
  onClose,
  className,
  style,
}: ChipContentProps) {
  const labelStyle = {
    color: colorStyles.textColor,
    fontSize: chipFontSize[size],
    fontWeight: fontWeight.medium as "500",
    lineHeight: chipFontSize[size],
  };

  return (
    <View
      className={cn("flex-row items-center self-start rounded-full", className)}
      style={[
        {
          ...chipPadding[size],
          gap: spacing[1],
          backgroundColor: colorStyles.backgroundColor,
          opacity: disabled ? 0.6 : 1,
          borderRadius: borderRadius.full,
        },
        style,
      ]}
    >
      <Text style={labelStyle}>{children}</Text>
      {onClose ? (
        <Pressable
          onPress={disabled ? undefined : onClose}
          disabled={disabled}
          hitSlop={CLOSE_HIT_SLOP}
          accessibilityRole="button"
          accessibilityLabel="Remove"
        >
          <Text style={labelStyle}>✕</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export function Chip({
  children,
  color = "gray",
  size = "md",
  selected = false,
  disabled = false,
  onPress,
  onClose,
  className,
  style,
}: ChipProps) {
  const { colorScheme } = useTheme();
  const colorStyles = resolveChipStyles({ color, colorScheme, selected, disabled });
  const isInteractive = Boolean(onPress) && !disabled;

  const content = (
    <ChipContent
      size={size}
      colorStyles={colorStyles}
      disabled={disabled}
      onClose={onClose}
      className={className}
      style={style}
    >
      {children}
    </ChipContent>
  );

  if (!isInteractive) {
    return content;
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ selected, disabled }}
    >
      {content}
    </Pressable>
  );
}

export type { ChipColor, ChipSize };
