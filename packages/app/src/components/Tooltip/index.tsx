import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { borderRadius, fontWeight, spacing } from "@yeoooonn/ds-tokens";
import { appFontSize as fontSize } from "../../tokens/typography";
import { useTheme } from "../../theme/ThemeProvider";
import { cn } from "../../utils/cn";

export type TooltipPosition = "top" | "bottom" | "left" | "right";

type AnchorRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type TooltipProps = {
  message: string;
  children: React.ReactNode;
  /** controlled open. 없으면 탭으로 토글 */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** true면 바깥 탭 시 닫힘 (기본값 true) */
  dismissible?: boolean;
  /** true면 열린 뒤 AUTO_HIDE_MS 후 자동 닫힘. controlled에서도 동일 (기본값 true) */
  autoHide?: boolean;
  position?: TooltipPosition;
  showArrow?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
};

const ARROW_SIZE = 8;
const ARROW_TRIGGER_GAP = 2;
/** 열리고 나서 자동으로 닫히는 시간 */
const AUTO_HIDE_MS = 1000;

const PANEL_SHADOW = "0 2px 8px rgba(0,0,0,0.12)";

const panelShadowStyle: ViewStyle =
  Platform.OS === "web"
    ? ({ boxShadow: PANEL_SHADOW } as unknown as ViewStyle)
    : {
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
      };

const contentWidthStyle: ViewStyle = {
  alignSelf: "center",
  ...(Platform.OS === "web"
    ? ({ width: "max-content" } as unknown as ViewStyle)
    : null),
};

/**
 * 45° 정사각 + 이음새 커버로 패널과 한 몸처럼 보이게 함.
 * (CSS triangle은 패널 보더가 화살표 밑으로 비쳐 이음새가 끊김)
 */
function TooltipArrow({
  position,
  backgroundColor,
  borderColor,
  arrowPad,
}: {
  position: TooltipPosition;
  backgroundColor: string;
  borderColor: string;
  arrowPad: number;
}) {
  const half = ARROW_SIZE / 2;

  const square: ViewStyle = {
    position: "absolute",
    width: ARROW_SIZE,
    height: ARROW_SIZE,
    backgroundColor,
    borderColor,
    transform: [{ rotate: "45deg" }],
    zIndex: 2,
  };

  const seam: ViewStyle = {
    position: "absolute",
    backgroundColor,
    zIndex: 3,
  };

  switch (position) {
    case "bottom":
      return (
        <>
          <View
            pointerEvents="none"
            style={[
              square,
              {
                left: "50%",
                top: arrowPad - half,
                marginLeft: -half,
                borderTopWidth: 1,
                borderLeftWidth: 1,
              },
            ]}
          />
          {/* 패널 상단 보더를 가려 화살표와 이어지게 */}
          <View
            pointerEvents="none"
            style={{
              ...seam,
              left: "50%",
              top: arrowPad - 1,
              width: ARROW_SIZE + 2,
              height: 3,
              marginLeft: -(ARROW_SIZE + 2) / 2,
            }}
          />
        </>
      );
    case "top":
      return (
        <>
          <View
            pointerEvents="none"
            style={[
              square,
              {
                left: "50%",
                bottom: arrowPad - half,
                marginLeft: -half,
                borderBottomWidth: 1,
                borderRightWidth: 1,
              },
            ]}
          />
          <View
            pointerEvents="none"
            style={{
              ...seam,
              left: "50%",
              bottom: arrowPad - 1,
              width: ARROW_SIZE + 2,
              height: 3,
              marginLeft: -(ARROW_SIZE + 2) / 2,
            }}
          />
        </>
      );
    case "left":
      return (
        <>
          <View
            pointerEvents="none"
            style={[
              square,
              {
                top: "50%",
                right: arrowPad - half,
                marginTop: -half,
                borderTopWidth: 1,
                borderRightWidth: 1,
              },
            ]}
          />
          <View
            pointerEvents="none"
            style={{
              ...seam,
              top: "50%",
              right: arrowPad - 1,
              width: 3,
              height: ARROW_SIZE + 2,
              marginTop: -(ARROW_SIZE + 2) / 2,
            }}
          />
        </>
      );
    case "right":
      return (
        <>
          <View
            pointerEvents="none"
            style={[
              square,
              {
                top: "50%",
                left: arrowPad - half,
                marginTop: -half,
                borderBottomWidth: 1,
                borderLeftWidth: 1,
              },
            ]}
          />
          <View
            pointerEvents="none"
            style={{
              ...seam,
              top: "50%",
              left: arrowPad - 1,
              width: 3,
              height: ARROW_SIZE + 2,
              marginTop: -(ARROW_SIZE + 2) / 2,
            }}
          />
        </>
      );
  }
}

function resolveScreenOffset(
  position: TooltipPosition,
  anchor: AnchorRect,
  showArrow: boolean,
  panelSize: { width: number; height: number },
): ViewStyle {
  const gap = showArrow ? ARROW_TRIGGER_GAP : spacing[2];
  const alongArrow = showArrow ? ARROW_SIZE + gap : gap;
  const shift = showArrow ? ARROW_SIZE : 0;
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
  const panelWidth = panelSize.width;
  const panelHeight = panelSize.height;

  switch (position) {
    case "top":
      return {
        position: "absolute",
        bottom: screenHeight - anchor.y + alongArrow - shift,
        left: anchor.x + anchor.width / 2 - (panelWidth > 0 ? panelWidth / 2 : 0),
      };
    case "bottom":
      return {
        position: "absolute",
        top: anchor.y + anchor.height + alongArrow - shift,
        left: anchor.x + anchor.width / 2 - (panelWidth > 0 ? panelWidth / 2 : 0),
      };
    case "left":
      return {
        position: "absolute",
        top:
          anchor.y +
          anchor.height / 2 -
          (panelHeight > 0 ? panelHeight / 2 : 0),
        right: screenWidth - anchor.x + alongArrow - shift,
      };
    case "right":
      return {
        position: "absolute",
        top:
          anchor.y +
          anchor.height / 2 -
          (panelHeight > 0 ? panelHeight / 2 : 0),
        left: anchor.x + anchor.width + alongArrow - shift,
      };
  }
}

/**
 * 앱: 탭으로 열고, 잠시 후 자동으로 닫힌다.
 * dismissible이면 바깥 탭으로도 닫을 수 있다. `open` prop이 있으면 controlled.
 */
export function Tooltip({
  message,
  children,
  open: openProp,
  onOpenChange,
  dismissible = true,
  autoHide = true,
  position = "bottom",
  showArrow = false,
  className,
  style,
}: TooltipProps) {
  const { theme } = useTheme();
  const isControlled = openProp !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isOpen = isControlled ? Boolean(openProp) : uncontrolledOpen;
  const [anchor, setAnchor] = useState<AnchorRect | null>(null);
  const [panelSize, setPanelSize] = useState({ width: 0, height: 0 });
  const triggerRef = useRef<View>(null);
  const opacity = useRef(new Animated.Value(0)).current;
  const autoHideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const backgroundColor = theme.surface.tooltip;
  const borderColor = theme.border.default;
  const arrowPad = showArrow ? ARROW_SIZE : 0;

  const clearAutoHideTimer = () => {
    if (autoHideTimerRef.current != null) {
      clearTimeout(autoHideTimerRef.current);
      autoHideTimerRef.current = null;
    }
  };

  const setOpen = (nextOpen: boolean) => {
    if (isControlled) {
      onOpenChange?.(nextOpen);
      return;
    }
    setUncontrolledOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: isOpen ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isOpen, opacity]);

  useEffect(() => {
    if (!isOpen) {
      setAnchor(null);
      setPanelSize({ width: 0, height: 0 });
      clearAutoHideTimer();
      return;
    }

    const frameId = requestAnimationFrame(() => {
      triggerRef.current?.measureInWindow((x, y, width, height) => {
        setAnchor({ x, y, width, height });
      });
    });

    clearAutoHideTimer();
    if (autoHide) {
      autoHideTimerRef.current = setTimeout(() => {
        setOpen(false);
      }, AUTO_HIDE_MS);
    }

    return () => {
      cancelAnimationFrame(frameId);
      clearAutoHideTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- open/autoHide만 바뀔 때 타이머 재설정
  }, [isOpen, autoHide]);

  const toggleUncontrolled = () => {
    if (isControlled) return;
    setOpen(!isOpen);
  };

  const handleDismiss = () => {
    if (!dismissible || !isOpen) return;
    clearAutoHideTimer();
    setOpen(false);
  };

  const tooltipPanel = anchor ? (
    <Animated.View
      pointerEvents="none"
      onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout;
        setPanelSize((prev) =>
          prev.width === width && prev.height === height
            ? prev
            : { width, height },
        );
      }}
      style={[
        resolveScreenOffset(position, anchor, showArrow, panelSize),
        { opacity, zIndex: 1, overflow: "visible" },
      ]}
    >
      <View
        style={[
          {
            position: "relative",
            overflow: "visible",
            paddingTop: position === "bottom" ? arrowPad : 0,
            paddingBottom: position === "top" ? arrowPad : 0,
            paddingLeft: position === "right" ? arrowPad : 0,
            paddingRight: position === "left" ? arrowPad : 0,
          },
          contentWidthStyle,
        ]}
      >
        <View
          style={[
            {
              paddingVertical: spacing[2],
              paddingHorizontal: spacing[3],
              backgroundColor,
              borderWidth: 1,
              borderColor,
              borderRadius: borderRadius.md,
            },
            panelShadowStyle,
          ]}
        >
          <Text
            numberOfLines={1}
            style={[
              {
                color: theme.text.primary,
                fontSize: fontSize.sm,
                fontWeight: fontWeight.regular as "400",
                lineHeight: fontSize.sm * 1.5,
              },
              Platform.OS === "web"
                ? ({ whiteSpace: "nowrap" } as object)
                : null,
            ]}
          >
            {message}
          </Text>
        </View>
        {showArrow ? (
          <TooltipArrow
            position={position}
            backgroundColor={backgroundColor}
            borderColor={borderColor}
            arrowPad={arrowPad}
          />
        ) : null}
      </View>
    </Animated.View>
  ) : null;

  return (
    <>
      <View
        ref={triggerRef}
        className={cn(className)}
        style={[{ alignSelf: "flex-start" }, style]}
        accessibilityHint={message}
      >
        {isControlled ? (
          children
        ) : (
          <Pressable
            onPress={toggleUncontrolled}
            accessibilityRole="button"
            accessibilityState={{ expanded: isOpen }}
          >
            {children}
          </Pressable>
        )}
      </View>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={handleDismiss}
      >
        <View style={styles.modalRoot} pointerEvents="box-none">
          {dismissible ? (
            <Pressable
              style={StyleSheet.absoluteFill}
              onPress={handleDismiss}
              accessibilityRole="button"
              accessibilityLabel="툴팁 닫기"
            />
          ) : null}
          {tooltipPanel}
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
  },
});
