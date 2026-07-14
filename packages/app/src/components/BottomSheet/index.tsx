import React, { useEffect, useState } from "react";
import {
  Modal as RNModal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import Animated, {
  Easing,
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { borderRadius, spacing } from "@yeoooonn/ds-tokens";
import { useTheme } from "../../theme/ThemeProvider";
import { cn } from "../../utils/cn";

const BACKDROP_DURATION = 250;
const SHEET_OPEN_DURATION = 280;
const SHEET_CLOSE_DURATION = 250;

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

function BottomSheetHandle({ className, style }: Omit<BottomSheetSectionProps, "children"> & { children?: never }) {
  const { theme } = useTheme();
  return (
    <View
      className={cn("items-center", className)}
      style={[
        {
          paddingTop: spacing[3],
          paddingBottom: spacing[2],
        },
        style,
      ]}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <View
        style={{
          width: 40,
          height: 4,
          borderRadius: borderRadius.full,
          backgroundColor: theme.border.strong,
        }}
      />
    </View>
  );
}

function BottomSheetHeader({ children, className, style }: BottomSheetSectionProps) {
  const { theme } = useTheme();
  return (
    <View
      className={cn("shrink-0", className)}
      style={[
        {
          paddingHorizontal: spacing[6],
          paddingBottom: spacing[4],
          borderBottomWidth: 1,
          borderBottomColor: theme.border.default,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

function BottomSheetContent({ children, className, style }: BottomSheetSectionProps) {
  return (
    <ScrollView
      className={cn("flex-1", className)}
      style={style}
      contentContainerStyle={{
        padding: spacing[6],
      }}
    >
      <View style={{ flexGrow: 1 }}>{children}</View>
    </ScrollView>
  );
}

function BottomSheetFooter({ children, className, style }: BottomSheetSectionProps) {
  const { theme } = useTheme();
  return (
    <View
      className={cn("shrink-0 flex-row justify-end", className)}
      style={[
        {
          gap: spacing[2],
          paddingTop: spacing[4],
          paddingHorizontal: spacing[6],
          paddingBottom: spacing[6],
          borderTopWidth: 1,
          borderTopColor: theme.border.default,
        },
        style,
      ]}
    >
      {children}
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
  const { theme, colorScheme } = useTheme();
  const isDark = colorScheme === "dark";
  const { height: windowHeight } = useWindowDimensions();
  const [mounted, setMounted] = useState(visible);
  const backdropOpacity = useSharedValue(0);
  const sheetTranslateY = useSharedValue(windowHeight);

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
      onRequestClose={onRequestClose}
      accessibilityViewIsModal
    >
      <View style={styles.container}>
        <Animated.View
          pointerEvents="box-none"
          style={[
            StyleSheet.absoluteFillObject,
            {
              backgroundColor: isDark
                ? "rgba(0, 0, 0, 0.55)"
                : "rgba(17, 24, 39, 0.45)",
            },
            backdropAnimatedStyle,
          ]}
        >
          <Pressable
            style={StyleSheet.absoluteFillObject}
            onPress={onBackdropPress}
            accessibilityRole="button"
            accessibilityLabel="닫기"
          />
        </Animated.View>
        <Animated.View style={[styles.sheet, sheetAnimatedStyle]}>
          <Pressable
            accessibilityRole="summary"
            accessibilityLabel={accessibilityLabel}
            onPress={(e) => e.stopPropagation?.()}
            className={cn(className)}
            style={[
              {
                width: "100%",
                maxHeight: "90%",
                backgroundColor: isDark
                  ? theme.background.secondary
                  : theme.background.primary,
                borderTopLeftRadius: borderRadius.xl,
                borderTopRightRadius: borderRadius.xl,
                borderWidth: isDark ? 1 : 0,
                borderBottomWidth: 0,
                borderColor: theme.border.strong,
                overflow: "hidden",
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
          </Pressable>
        </Animated.View>
      </View>
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
