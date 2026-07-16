import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type RefObject,
} from "react";
import { Dimensions } from "react-native";

/** 패키지마다 resolve된 RN 버전이 달라도 호환되도록 duck-type으로 정의 */
type Scrollable = {
  scrollTo: (options: { y: number; animated?: boolean }) => void;
};

type Measurable = {
  measureInWindow: (
    callback: (x: number, y: number, width: number, height: number) => void,
  ) => void;
};

type KeyboardScrollContextValue = {
  ensureVisible: (
    targetRef: RefObject<Measurable | null>,
    keyboardHeight: number,
    padding?: number,
  ) => void;
};

const KeyboardScrollContext = createContext<KeyboardScrollContextValue | null>(
  null,
);

export function KeyboardScrollProvider({
  scrollRef,
  scrollOffsetRef,
  children,
}: {
  scrollRef: RefObject<Scrollable | null>;
  /** 현재 스크롤 Y를 담는 ref (onScroll에서 갱신) */
  scrollOffsetRef: RefObject<number>;
  children: React.ReactNode;
}) {
  const ensureVisible = useCallback(
    (
      targetRef: RefObject<Measurable | null>,
      keyboardHeight: number,
      padding = 16,
    ) => {
      const target = targetRef.current;
      const scroll = scrollRef.current;
      if (!target || !scroll || keyboardHeight <= 0) return;

      target.measureInWindow((_x, y, _w, height) => {
        const windowHeight = Dimensions.get("window").height;
        const visibleBottom = windowHeight - keyboardHeight - padding;
        const fieldBottom = y + height;
        const overflow = fieldBottom - visibleBottom;
        if (overflow > 0) {
          const currentOffset = scrollOffsetRef.current ?? 0;
          scroll.scrollTo({
            y: Math.max(currentOffset + overflow, 0),
            animated: true,
          });
        }
      });
    },
    [scrollOffsetRef, scrollRef],
  );

  const value = useMemo(() => ({ ensureVisible }), [ensureVisible]);

  return (
    <KeyboardScrollContext.Provider value={value}>
      {children}
    </KeyboardScrollContext.Provider>
  );
}

export function useKeyboardScroll() {
  return useContext(KeyboardScrollContext);
}
