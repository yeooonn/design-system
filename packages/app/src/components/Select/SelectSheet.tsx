import React from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import Animated, { type AnimatedStyle } from "react-native-reanimated";
import { borderRadius, fontWeight, spacing, type Theme } from "@yeoooonn/ds-tokens";
import { appFontSize as fontSize } from "../../tokens/typography";
import {
  OPTION_DISABLED_OPACITY,
  resolveFieldActiveBackgroundColor,
} from "../_shared/fieldStyles";
import type { SelectOption } from "./index";

const SHEET_MAX_HEIGHT = "55%";

type RenderSelectOptionItemParams = {
  option: SelectOption;
  selected: boolean;
  fontSize: number;
  theme: Theme;
  onSelect: (value: string) => void;
};

function renderSelectOptionItem({
  option,
  selected,
  fontSize,
  theme,
  onSelect,
}: RenderSelectOptionItemParams) {
  const selectedBackgroundColor = selected
    ? resolveFieldActiveBackgroundColor(theme)
    : "transparent";

  return (
    <Pressable
      disabled={option.disabled}
      onPress={() => onSelect(option.value)}
      style={{
        paddingHorizontal: spacing[4],
        paddingVertical: spacing[3],
        backgroundColor: selectedBackgroundColor,
        opacity: option.disabled ? OPTION_DISABLED_OPACITY : 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text
        style={{
          fontSize,
          color: selected ? theme.action.primary : theme.text.primary,
        }}
      >
        {option.label}
      </Text>
      {selected ? (
        <Text style={{ color: theme.action.primary }}>✓</Text>
      ) : null}
    </Pressable>
  );
}

type SelectSheetProps = {
  mounted: boolean;
  sheetTitle: string;
  options: SelectOption[];
  selectedValue: string;
  fontSize: number;
  theme: Theme;
  backdropAnimatedStyle: AnimatedStyle<{ opacity: number }>;
  sheetAnimatedStyle: AnimatedStyle<{ transform: { translateY: number }[] }>;
  onClose: () => void;
  onSelect: (value: string) => void;
};

export function SelectSheet({
  mounted,
  sheetTitle,
  options,
  selectedValue,
  fontSize: optionFontSize,
  theme,
  backdropAnimatedStyle,
  sheetAnimatedStyle,
  onClose,
  onSelect,
}: SelectSheetProps) {
  return (
    <Modal
      visible={mounted}
      transparent
      animationType="none"
      presentationStyle="overFullScreen"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Animated.View
          style={[
            {
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundColor: theme.overlay.backdrop,
            },
            backdropAnimatedStyle,
          ]}
        >
          <Pressable
            style={{ flex: 1 }}
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="닫기"
          />
        </Animated.View>

        <Animated.View
          style={[
            {
              maxHeight: SHEET_MAX_HEIGHT,
              width: "100%",
              backgroundColor: theme.background.primary,
              borderTopLeftRadius: borderRadius.lg,
              borderTopRightRadius: borderRadius.lg,
              // top만 주면 직선만 그려짐. 좌·우도 있어야 라운드를 따라감
              borderWidth: 1,
              borderBottomWidth: 0,
              borderColor: theme.border.strong,
              paddingVertical: spacing[6],
              overflow: "hidden",
            },
            sheetAnimatedStyle,
          ]}
        >
          <View
            style={{
              marginHorizontal: spacing[4],
              marginBottom: spacing[2],
              paddingBottom: spacing[4],
              borderBottomWidth: 1,
              borderBottomColor: theme.border.default,
            }}
          >
            <Text
              style={{
                fontSize: fontSize.lg,
                color: theme.text.primary,
                fontWeight: fontWeight.semibold,
              }}
            >
              {sheetTitle}
            </Text>
          </View>

          <ScrollView
            bounces={false}
            keyboardShouldPersistTaps="handled"
            style={{ backgroundColor: "transparent" }}
          >
            {options.map((option) => (
              <React.Fragment key={option.value}>
                {renderSelectOptionItem({
                  option,
                  selected: option.value === selectedValue,
                  fontSize: optionFontSize,
                  theme,
                  onSelect,
                })}
              </React.Fragment>
            ))}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}
