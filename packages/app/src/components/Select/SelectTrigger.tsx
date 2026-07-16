import React from "react";
import { Pressable, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import {
  type FieldSize,
  type FieldVariant,
} from "../_shared/fieldStyles";
import type { SelectOption } from "./index";

const ICON_SIZE: Record<FieldSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
};

type ChevronIconProps = {
  size: FieldSize;
  color: string;
  open: boolean;
};

function ChevronIcon({ size, color, open }: ChevronIconProps) {
  const iconSize = ICON_SIZE[size];

  return (
    <View
      style={{ transform: [{ rotate: open ? "180deg" : "0deg" }] }}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <Svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none">
        <Path
          d="M6 9L12 15L18 9"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

type SelectTriggerProps = {
  variant: FieldVariant;
  size: FieldSize;
  disabled: boolean;
  open: boolean;
  placeholder: string;
  selectedOption?: SelectOption;
  accessibilityLabel: string;
  tokens: {
    color: string;
    placeholderColor: string;
    affixColor: string;
    borderColor: string;
    backgroundColor: string;
  };
  sizeStyles: {
    minHeight: number;
    gap: number;
    linePaddingBottom: number;
    paddingInline: number;
    paddingBlock: number;
    fontSize: number;
  };
  fieldRadius: number;
  fieldBorderWidth: number;
  onPress: () => void;
};

export function SelectTrigger({
  variant,
  size,
  disabled,
  open,
  placeholder,
  selectedOption,
  accessibilityLabel,
  tokens,
  sizeStyles,
  fieldRadius,
  fieldBorderWidth,
  onPress,
}: SelectTriggerProps) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ disabled, expanded: open }}
      accessibilityLabel={accessibilityLabel}
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        minHeight: sizeStyles.minHeight,
        gap: sizeStyles.gap,
        ...(variant === "line"
          ? {
              paddingBottom: sizeStyles.linePaddingBottom,
              borderBottomWidth: fieldBorderWidth,
              borderBottomColor: tokens.borderColor,
              backgroundColor: "transparent",
            }
          : {
              paddingHorizontal: sizeStyles.paddingInline,
              paddingVertical: sizeStyles.paddingBlock,
              borderRadius: fieldRadius,
              borderWidth: fieldBorderWidth,
              borderColor: tokens.borderColor,
              backgroundColor: tokens.backgroundColor,
            }),
      }}
    >
      <Text
        style={{
          flex: 1,
          minWidth: 0,
          color: selectedOption ? tokens.color : tokens.placeholderColor,
          fontSize: sizeStyles.fontSize,
        }}
        numberOfLines={1}
      >
        {selectedOption?.label ?? placeholder}
      </Text>
      <ChevronIcon size={size} color={tokens.affixColor} open={open} />
    </Pressable>
  );
}
