import React from "react";
import {
  Modal as RNModal,
  Pressable,
  ScrollView,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { borderRadius, spacing } from "@yeoooonn/ds-tokens";
import { useTheme } from "../../theme/ThemeProvider";
import { cn } from "../../utils/cn";
import { KeyboardAvoid } from "../KeyboardAvoid";

type ModalSectionProps = {
  children: React.ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
};

type ModalProps = ModalSectionProps & {
  visible: boolean;
  onRequestClose?: () => void;
  onBackdropPress?: () => void;
  accessibilityLabel?: string;
};

function ModalHeader({ children, className, style }: ModalSectionProps) {
  return (
    <View
      className={cn(className)}
      style={[
        {
          flexShrink: 0,
          paddingTop: spacing[5],
          paddingHorizontal: spacing[6],
          paddingBottom: spacing[4],
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

function ModalContent({ children, className, style }: ModalSectionProps) {
  return (
    <ScrollView
      className={cn(className)}
      // flex:1은 부모 높이가 없을 때(본문만) 높이 0으로 붕괴한다.
      // flexShrink로 maxHeight 초과 시에만 줄어들며 스크롤한다.
      style={[{ flexGrow: 0, flexShrink: 1 }, style]}
      contentContainerStyle={{
        padding: spacing[6],
      }}
      bounces={false}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="interactive"
      automaticallyAdjustKeyboardInsets
    >
      {children}
    </ScrollView>
  );
}

function ModalFooter({ children, className, style }: ModalSectionProps) {
  return (
    <View
      className={cn(className)}
      style={[
        {
          flexShrink: 0,
          flexDirection: "row",
          justifyContent: "flex-end",
          gap: spacing[2],
          paddingTop: spacing[4],
          paddingHorizontal: spacing[6],
          paddingBottom: spacing[5],
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

function ModalRoot({
  children,
  visible,
  onRequestClose,
  onBackdropPress,
  className,
  style,
  accessibilityLabel,
}: ModalProps) {
  const { theme, colorScheme } = useTheme();
  const isDark = colorScheme === "dark";

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onRequestClose}
      accessibilityViewIsModal
    >
      <KeyboardAvoid>
        <Pressable
          className={cn(className)}
          style={[
            {
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              padding: spacing[4],
              backgroundColor: isDark
                ? "rgba(0, 0, 0, 0.55)"
                : "rgba(17, 24, 39, 0.45)",
            },
            style,
          ]}
          onPress={onBackdropPress}
        >
          <Pressable
            accessibilityRole="summary"
            accessibilityLabel={accessibilityLabel}
            onPress={(e) => e.stopPropagation?.()}
            style={{
              width: "100%",
              maxWidth: 480,
              maxHeight: "90%",
              flexDirection: "column",
              backgroundColor: isDark
                ? theme.background.secondary
                : theme.background.primary,
              borderRadius: borderRadius.lg,
              borderWidth: isDark ? 1 : 0,
              borderColor: theme.border.strong,
              overflow: "hidden",
              shadowColor: "#000",
              shadowOpacity: isDark ? 0.55 : 0.1,
              shadowRadius: isDark ? 25 : 20,
              shadowOffset: { width: 0, height: 8 },
              elevation: 8,
            }}
          >
            {children}
          </Pressable>
        </Pressable>
      </KeyboardAvoid>
    </RNModal>
  );
}

ModalRoot.displayName = "Modal";
ModalHeader.displayName = "Modal.Header";
ModalContent.displayName = "Modal.Content";
ModalFooter.displayName = "Modal.Footer";

export const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Content: ModalContent,
  Footer: ModalFooter,
});
