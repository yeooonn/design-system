import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Modal as RNModal,
  PanResponder,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
  type GestureResponderHandlers,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Animated, {
  Easing,
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  SafeAreaProvider,
  initialWindowMetrics,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { borderRadius, spacing } from "@yeoooonn/ds-tokens";
import { useTheme } from "../../theme/ThemeProvider";
import { cn } from "../../utils/cn";

const BACKDROP_DURATION = 250;
const SHEET_OPEN_DURATION = 280;
const SHEET_CLOSE_DURATION = 250;
const DISMISS_DRAG_DISTANCE = 80;
const DISMISS_VELOCITY = 1.1;
const SNAP_EDGE_TOLERANCE = 4;
const EXPAND_DRAG_DISTANCE = 40;
const EXPAND_VELOCITY = 0.5;
const MAX_SHEET_RATIO = 0.8;

const absoluteFill: ViewStyle = {
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

const BottomSheetPanContext = createContext<GestureResponderHandlers>({});

type BottomSheetSectionProps = {
  children: React.ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
};

type BottomSheetProps = BottomSheetSectionProps & {
  visible: boolean;
  onRequestClose?: () => void;
  onBackdropPress?: () => void;
  accessibilityLabel?: string;
};

function BottomSheetHandle({
  className,
  style,
}: Omit<BottomSheetSectionProps, "children"> & { children?: never }) {
  const { theme } = useTheme();
  const panHandlers = useContext(BottomSheetPanContext);

  return (
    <View
      {...panHandlers}
      className={cn(className)}
      hitSlop={{ top: 12, bottom: 12, left: 24, right: 24 }}
      style={[
        {
          alignItems: "center",
          // 터치 영역 확보
          paddingTop: spacing[4],
          paddingBottom: spacing[3],
        },
        style,
      ]}
      accessibilityRole="adjustable"
      accessibilityLabel="바텀시트 크기 조절"
      accessibilityHint="위로 드래그하면 최대 높이로, 아래로 드래그하면 기본 높이로 스냅되거나 닫힙니다."
    >
      <View
        style={{
          width: 40,
          height: 4,
          borderRadius: borderRadius.full,
          backgroundColor: theme.border.strong,
        }}
        pointerEvents="none"
      />
    </View>
  );
}

function BottomSheetHeader({
  children,
  className,
  style,
}: BottomSheetSectionProps) {
  return (
    <View
      className={cn(className)}
      style={[
        {
          flexShrink: 0,
          paddingHorizontal: spacing[6],
          paddingTop: spacing[4],
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

function BottomSheetContent({
  children,
  className,
  style,
}: BottomSheetSectionProps) {
  return (
    <ScrollView
      className={cn(className)}
      style={[{ flexGrow: 1, flexShrink: 1, minHeight: 0 }, style]}
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: spacing[6],
        paddingVertical: spacing[4],
      }}
      bounces={false}
      nestedScrollEnabled
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="interactive"
      automaticallyAdjustKeyboardInsets
    >
      {children}
    </ScrollView>
  );
}

function BottomSheetFooter({
  children,
  className,
  style,
}: BottomSheetSectionProps) {
  return (
    <View
      className={cn(className)}
      style={[
        {
          flexShrink: 0,
          flexDirection: "row",
          justifyContent: "flex-end",
          gap: spacing[2],
          paddingHorizontal: spacing[6],
          paddingVertical: spacing[4],
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function BottomSheetPanel({
  children,
  onBackdropPress,
  onRequestClose,
  className,
  style,
  accessibilityLabel,
  sheetAnimatedStyle,
  backdropAnimatedStyle,
}: {
  children: React.ReactNode;
  onBackdropPress: () => void;
  onRequestClose?: () => void;
  className?: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  sheetAnimatedStyle: object;
  backdropAnimatedStyle: object;
}) {
  const { theme, colorScheme } = useTheme();
  const isDark = colorScheme === "dark";
  const { height: windowHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(
    insets.bottom,
    initialWindowMetrics?.insets.bottom ?? 0,
  );
  const maxSheetHeight = windowHeight * MAX_SHEET_RATIO;

  const [sheetHeight, setSheetHeight] = useState<number | null>(null);
  const minHeightRef = useRef(0);
  const currentHeightRef = useRef(0);
  const dragStartRef = useRef(0);
  const maxHeightRef = useRef(maxSheetHeight);
  const measuredRef = useRef(false);
  const onRequestCloseRef = useRef(onRequestClose);
  onRequestCloseRef.current = onRequestClose;
  maxHeightRef.current = maxSheetHeight;

  const handleSheetLayout = (event: LayoutChangeEvent) => {
    const height = event.nativeEvent.layout.height;
    if (measuredRef.current || height <= 0) return;
    measuredRef.current = true;
    minHeightRef.current = Math.min(height, maxSheetHeight);
    currentHeightRef.current = minHeightRef.current;
    setSheetHeight(minHeightRef.current);
  };

  const panHandlers = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dy) > 2,
        onPanResponderTerminationRequest: () => false,
        onPanResponderGrant: () => {
          dragStartRef.current = currentHeightRef.current;
        },
        onPanResponderMove: (_, { dy }) => {
          const min = minHeightRef.current;
          const max = maxHeightRef.current;
          if (min <= 0) return;
          // 위로 드래그(dy < 0) → 높이 증가
          const next = clamp(dragStartRef.current - dy, min, max);
          currentHeightRef.current = next;
          setSheetHeight(next);
        },
        onPanResponderRelease: (_, { dy, vy }) => {
          const min = minHeightRef.current;
          const max = maxHeightRef.current;
          if (min <= 0) return;

          const next = clamp(dragStartRef.current - dy, min, max);
          const mid = (min + max) / 2;
          const atMin = next <= min + SNAP_EDGE_TOLERANCE;
          const shouldDismiss =
            atMin && (dy > DISMISS_DRAG_DISTANCE || vy > DISMISS_VELOCITY);

          if (shouldDismiss) {
            onRequestCloseRef.current?.();
            return;
          }

          // 중간점·속도 기준으로 최소/최대에 스냅
          const snapped =
            next >= mid ||
            -dy > EXPAND_DRAG_DISTANCE ||
            -vy > EXPAND_VELOCITY
              ? max
              : min;
          currentHeightRef.current = snapped;
          setSheetHeight(snapped);
        },
      }).panHandlers,
    [],
  );

  return (
    <View style={[styles.container, { marginBottom: -bottomInset }]}>
      <Animated.View
        style={[
          absoluteFill,
          {
            backgroundColor: isDark
              ? "rgba(0, 0, 0, 0.55)"
              : "rgba(17, 24, 39, 0.45)",
          },
          backdropAnimatedStyle,
        ]}
      >
        <Pressable
          style={absoluteFill}
          onPress={onBackdropPress}
          accessibilityRole="button"
          accessibilityLabel="닫기"
        />
      </Animated.View>

      <Animated.View
        pointerEvents="box-none"
        style={[styles.sheet, sheetAnimatedStyle]}
      >
        <BottomSheetPanContext.Provider value={panHandlers}>
          <View
            accessibilityLabel={accessibilityLabel}
            className={cn(className)}
            onLayout={handleSheetLayout}
            style={[
              {
                width: "100%",
                maxHeight: maxSheetHeight,
                height: sheetHeight ?? undefined,
                flexDirection: "column",
                backgroundColor: isDark
                  ? theme.background.secondary
                  : theme.background.primary,
                borderTopLeftRadius: borderRadius.xl,
                borderTopRightRadius: borderRadius.xl,
                borderWidth: isDark ? 1 : 0,
                borderBottomWidth: 0,
                borderColor: theme.border.strong,
                overflow: "hidden",
                paddingBottom: bottomInset,
                shadowColor: "#000",
                shadowOpacity: isDark ? 0.55 : 0.12,
                shadowRadius: isDark ? 24 : 16,
                shadowOffset: { width: 0, height: -4 },
                elevation: 12,
              },
              style,
            ]}
          >
            {children}
          </View>
        </BottomSheetPanContext.Provider>
      </Animated.View>
    </View>
  );
}

function BottomSheetRoot({
  children,
  visible,
  onRequestClose,
  onBackdropPress,
  className,
  style,
  accessibilityLabel,
}: BottomSheetProps) {
  const { height: windowHeight } = useWindowDimensions();
  const [mounted, setMounted] = useState(visible);
  const backdropOpacity = useSharedValue(0);
  const sheetTranslateY = useSharedValue(windowHeight);

  const handleBackdropPress = () => {
    if (onBackdropPress) {
      onBackdropPress();
      return;
    }
    onRequestClose?.();
  };

  useEffect(() => {
    if (visible) {
      setMounted(true);
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

    if (!mounted) return;

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
          runOnJS(setMounted)(false);
        }
      },
    );
  }, [visible, mounted, windowHeight, backdropOpacity, sheetTranslateY]);

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const sheetAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: sheetTranslateY.value }],
  }));

  if (!mounted) return null;

  return (
    <RNModal
      visible={mounted}
      transparent
      animationType="none"
      presentationStyle="overFullScreen"
      statusBarTranslucent
      onRequestClose={onRequestClose}
      accessibilityViewIsModal
    >
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <BottomSheetPanel
            onBackdropPress={handleBackdropPress}
            onRequestClose={onRequestClose}
            className={className}
            style={style}
            accessibilityLabel={accessibilityLabel}
            sheetAnimatedStyle={sheetAnimatedStyle}
            backdropAnimatedStyle={backdropAnimatedStyle}
          >
            {children}
          </BottomSheetPanel>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </RNModal>
  );
}

BottomSheetRoot.displayName = "BottomSheet";
BottomSheetHandle.displayName = "BottomSheet.Handle";
BottomSheetHeader.displayName = "BottomSheet.Header";
BottomSheetContent.displayName = "BottomSheet.Content";
BottomSheetFooter.displayName = "BottomSheet.Footer";

export const BottomSheet = Object.assign(BottomSheetRoot, {
  Handle: BottomSheetHandle,
  Header: BottomSheetHeader,
  Content: BottomSheetContent,
  Footer: BottomSheetFooter,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
  },
});
