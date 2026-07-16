import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type KeyboardAvoidProps = {
  children: React.ReactNode;
  /** iOS offset. 헤더·safe area 보정이 필요할 때 사용 */
  offset?: number;
  style?: StyleProp<ViewStyle>;
  enabled?: boolean;
};

/**
 * 키보드가 입력창을 가리지 않도록 하는 공통 래퍼.
 * 화면/모달/시트 루트에 한 번 감싸서 쓴다.
 */
export function KeyboardAvoid({
  children,
  offset = 0,
  style,
  enabled = true,
}: KeyboardAvoidProps) {
  const insets = useSafeAreaInsets();
  const keyboardVerticalOffset =
    Platform.OS === "ios" ? offset + insets.top : offset;

  return (
    <KeyboardAvoidingView
      style={[{ flex: 1 }, style]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={keyboardVerticalOffset}
      enabled={enabled}
    >
      {children}
    </KeyboardAvoidingView>
  );
}
