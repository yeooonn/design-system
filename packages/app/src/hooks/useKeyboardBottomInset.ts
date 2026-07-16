import { useEffect, useState } from "react";
import { Keyboard, Platform } from "react-native";

/** 포커스된 입력 아래로 키보드 높이만큼 여백을 줘 스크롤로 가림을 피한다. */
export function useKeyboardBottomInset(enabled: boolean) {
  const [inset, setInset] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setInset(0);
      return;
    }

    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const showSub = Keyboard.addListener(showEvent, (event) => {
      setInset(event.endCoordinates.height);
    });
    const hideSub = Keyboard.addListener(hideEvent, () => {
      setInset(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [enabled]);

  return inset;
}
