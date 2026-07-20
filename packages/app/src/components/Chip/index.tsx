import React from "react";
import {
  Pressable,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { borderRadius, fontWeight, spacing } from "@yeoooonn/ds-tokens";
import { useTheme } from "../../theme/ThemeProvider";
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
  style?: StyleProp<ViewStyle>;
};

function isTextChild(node: React.ReactNode): boolean {
  return (
    typeof node === "string" ||
    typeof node === "number" ||
    node == null ||
    typeof node === "boolean"
  );
}

function isTextOnlyChildren(children: React.ReactNode): boolean {
  return React.Children.toArray(children).every(isTextChild);
}

function ChipLabel({
  children,
  labelStyle,
}: {
  children: React.ReactNode;
  labelStyle: TextStyle;
}) {
  if (isTextOnlyChildren(children)) {
    return <Text style={labelStyle}>{children}</Text>;
  }

  return (
    <>
      {React.Children.map(children, (child) =>
        typeof child === "string" || typeof child === "number" ? (
          <Text style={labelStyle}>{child}</Text>
        ) : (
          child
        ),
      )}
    </>
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
    style,
}: ChipProps) {
  const { theme } = useTheme();
  const colorStyles = resolveChipStyles({
    color,
    theme,
    selected,
    disabled,
  });
  const isInteractive = Boolean(onPress) && !disabled;
  const labelFontSize = chipFontSize[size];
  const labelStyle: TextStyle = {
    color: colorStyles.textColor,
    fontSize: labelFontSize,
    fontWeight: fontWeight.medium as "500",
    lineHeight: labelFontSize,
  };

  const label = <ChipLabel labelStyle={labelStyle}>{children}</ChipLabel>;

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "flex-start",
          borderRadius: borderRadius.full,
          ...chipPadding[size],
          gap: spacing[1],
          backgroundColor: colorStyles.backgroundColor,
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
    >
      {isInteractive ? (
        <Pressable
          onPress={onPress}
          disabled={disabled}
          accessibilityRole="button"
          accessibilityState={{ selected, disabled }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: spacing[1],
          }}
        >
          {label}
        </Pressable>
      ) : (
        label
      )}
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

export type { ChipColor, ChipSize };
