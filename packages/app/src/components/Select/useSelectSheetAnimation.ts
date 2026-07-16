import { useEffect, useRef, useState } from "react";
import {
  Easing,
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const BACKDROP_DURATION = 220;
const SHEET_OPEN_DURATION = 260;
const SHEET_CLOSE_DURATION = 220;

export function useSelectSheetAnimation(open: boolean, windowHeight: number) {
  const [mounted, setMounted] = useState(false);
  const isSheetVisibleRef = useRef(false);
  const backdropOpacity = useSharedValue(0);
  const sheetTranslateY = useSharedValue(windowHeight);

  useEffect(() => {
    const unmountSheet = () => {
      isSheetVisibleRef.current = false;
      setMounted(false);
    };

    if (open) {
      setMounted(true);
      isSheetVisibleRef.current = true;
      cancelAnimation(backdropOpacity);
      cancelAnimation(sheetTranslateY);
      backdropOpacity.value = 0;
      sheetTranslateY.value = windowHeight;
      backdropOpacity.value = withTiming(1, { duration: BACKDROP_DURATION });
      sheetTranslateY.value = withTiming(0, {
        duration: SHEET_OPEN_DURATION,
        easing: Easing.out(Easing.cubic),
      });
      return;
    }

    if (!isSheetVisibleRef.current) return;

    cancelAnimation(backdropOpacity);
    cancelAnimation(sheetTranslateY);
    backdropOpacity.value = withTiming(0, { duration: BACKDROP_DURATION });
    sheetTranslateY.value = withTiming(
      windowHeight,
      {
        duration: SHEET_CLOSE_DURATION,
        easing: Easing.in(Easing.cubic),
      },
      (finished?: boolean) => {
        if (finished) {
          runOnJS(unmountSheet)();
        }
      },
    );
  }, [open, windowHeight, backdropOpacity, sheetTranslateY]);

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const sheetAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: sheetTranslateY.value }],
  }));

  return { mounted, backdropAnimatedStyle, sheetAnimatedStyle };
}
