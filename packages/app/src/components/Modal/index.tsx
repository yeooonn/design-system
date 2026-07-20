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
import { KeyboardAvoid } from "../KeyboardAvoid";

type ModalSectionProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

type ModalProps = ModalSectionProps & {
  visible: boolean;
  onRequestClose?: () => void;
  onBackdropPress?: () => void;
  accessibilityLabel?: string;
};

function ModalHeader({ children, style }: ModalSectionProps) {
  return (
    <View
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

function ModalContent({ children, style }: ModalSectionProps) {
  return (
    <ScrollView
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

function ModalFooter({ children, style }: ModalSectionProps) {
  return (
    <View
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
    style,
  accessibilityLabel,
}: ModalProps) {
  const { theme } = useTheme();

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
          style={[
            {
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              padding: spacing[4],
              backgroundColor: theme.overlay.backdrop,
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
              backgroundColor: theme.surface.elevated.background,
              borderRadius: borderRadius.lg,
              borderWidth: theme.surface.elevated.borderWidth,
              borderColor: theme.border.strong,
              overflow: "hidden",
              shadowColor: "#000",
              shadowOpacity: theme.surface.elevated.borderWidth > 0 ? 0.55 : 0.1,
              shadowRadius: theme.surface.elevated.borderWidth > 0 ? 25 : 20,
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
