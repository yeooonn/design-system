import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Animated,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { borderRadius, fontWeight, spacing } from "@yeoooonn/ds-tokens";
import { appFontSize as fontSize } from "../../tokens/typography";
import { useTheme } from "../../theme/ThemeProvider";

const DEFAULT_DURATION = 3000;
const DEFAULT_POSITION: ToastPosition = "bottom-center";
const TOAST_Z_INDEX = 1100;
const TOAST_OFFSET = spacing[4];
const TOAST_ENTER_DISTANCE = 25;

export type ToastPosition =
  | "top-left"
  | "top-right"
  | "top-center"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center";

export const TOAST_POSITIONS: ToastPosition[] = [
  "top-left",
  "top-right",
  "top-center",
  "bottom-left",
  "bottom-right",
  "bottom-center",
];

export type ToastOpenOptions = {
  text: string;
  position?: ToastPosition;
  duration?: number;
  leftAddon?: React.ReactNode;
};

type ToastEntry = {
  id: string;
  text: string;
  position: ToastPosition;
  duration: number;
  leftAddon?: React.ReactNode;
};

type ToastContextValue = {
  open: (options: ToastOpenOptions) => string;
  close: (id: string) => void;
  closeAll: () => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

function createToastId() {
  return `toast-${Math.random().toString(36).slice(2, 10)}`;
}

function containerStyle(
  position: ToastPosition,
  insets: { top: number; bottom: number; left: number; right: number },
): ViewStyle {
  const isTop = position.startsWith("top");
  const isLeft = position.endsWith("left");
  const isRight = position.endsWith("right");
  const isCenter = position.endsWith("center");

  return {
    position: "absolute",
    zIndex: TOAST_Z_INDEX,
    gap: spacing[2],
    pointerEvents: "box-none",
    ...(isTop
      ? { top: TOAST_OFFSET + insets.top }
      : { bottom: TOAST_OFFSET + insets.bottom }),
    ...(isLeft
      ? {
          left: TOAST_OFFSET + insets.left,
          maxWidth: "92%",
          alignItems: "flex-start",
        }
      : null),
    ...(isRight
      ? {
          right: TOAST_OFFSET + insets.right,
          maxWidth: "92%",
          alignItems: "flex-end",
        }
      : null),
    ...(isCenter
      ? {
          left: insets.left,
          right: insets.right,
          alignItems: "center",
        }
      : null),
  };
}

function enterOffset(position: ToastPosition) {
  if (position.endsWith("left")) return { x: -TOAST_ENTER_DISTANCE, y: 0 };
  if (position.endsWith("right")) return { x: TOAST_ENTER_DISTANCE, y: 0 };
  if (position.startsWith("top")) return { x: 0, y: -TOAST_ENTER_DISTANCE };
  return { x: 0, y: TOAST_ENTER_DISTANCE };
}

function ToastItemView({ toast }: { toast: ToastEntry }) {
  const { theme } = useTheme();
  const offset = enterOffset(toast.position);
  const opacity = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(offset.x)).current;
  const translateY = useRef(new Animated.Value(offset.y)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, translateX, translateY]);

  return (
    <Animated.View
      accessibilityRole="text"
      accessibilityLiveRegion="polite"
      style={{
        flexDirection: "row",
        alignItems: "center",
        maxWidth: 360,
        gap: spacing[2],
        paddingVertical: spacing[3],
        paddingHorizontal: spacing[4],
        backgroundColor: theme.surface.toast,
        borderWidth: 1,
        borderColor: theme.border.default,
        borderRadius: borderRadius.full,
        shadowColor: "#000",
        shadowOpacity: theme.surface.elevated.borderWidth > 0 ? 0.45 : 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
        opacity,
        transform: [{ translateX }, { translateY }],
      }}
    >
      {toast.leftAddon != null ? (
        <View
          style={{
            flexShrink: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {toast.leftAddon}
        </View>
      ) : null}
      <Text
        style={{
          flexShrink: 1,
          color: theme.text.primary,
          fontSize: fontSize.md,
          fontWeight: fontWeight.regular as "400",
          lineHeight: fontSize.md * 1.5,
        }}
      >
        {toast.text}
      </Text>
    </Animated.View>
  );
}

export function ToastProvider({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const insets = useSafeAreaInsets();
  const [toasts, setToasts] = useState<ToastEntry[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );

  const clearTimer = (id: string) => {
    const timer = timersRef.current.get(id);
    if (timer != null) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  };

  const close = (id: string) => {
    clearTimer(id);
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const closeAll = () => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current.clear();
    setToasts([]);
  };

  const open = (options: ToastOpenOptions) => {
    const id = createToastId();
    const duration = options.duration ?? DEFAULT_DURATION;
    const entry: ToastEntry = {
      id,
      text: options.text,
      position: options.position ?? DEFAULT_POSITION,
      duration,
      leftAddon: options.leftAddon,
    };

    setToasts((prev) => [...prev, entry]);

    if (duration > 0) {
      const timer = setTimeout(() => close(id), duration);
      timersRef.current.set(id, timer);
    }

    return id;
  };

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
      timersRef.current.clear();
    };
  }, []);

  const toastsByPosition = TOAST_POSITIONS.reduce(
    (grouped, position) => {
      grouped[position] = toasts.filter((toast) => toast.position === position);
      return grouped;
    },
    {} as Record<ToastPosition, ToastEntry[]>,
  );

  return (
    <ToastContext.Provider value={{ open, close, closeAll }}>
      <View style={[{ flex: 1 }, style]}>
        {children}
        {TOAST_POSITIONS.filter(
          (position) => toastsByPosition[position].length > 0,
        ).map((position) => (
          <View
            key={position}
            pointerEvents="box-none"
            style={containerStyle(position, insets)}
          >
            {toastsByPosition[position].map((toast) => (
              <ToastItemView key={toast.id} toast={toast} />
            ))}
          </View>
        ))}
      </View>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast는 ToastProvider 내에서 사용되어야 합니다.");
  }
  return context;
}
