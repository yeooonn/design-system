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
  style?: StyleProp<ViewStyle>;
};

const ARROW_SIZE = 8;
const ARROW_TRIGGER_GAP = 2;
/** 열리고 나서 자동으로 닫히는 시간 */
const AUTO_HIDE_MS = 1000;
const TOOLTIP_OVERLAY_Z_INDEX = 100_000;
const TOOLTIP_PANEL_Z_INDEX = 100_001;

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
  const { width: panelWidth, height: panelHeight } = panelSize;
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
  const margin = spacing[2];

  let top = 0;
  let left = 0;

  switch (position) {
    case "top":
      top = anchor.y - panelHeight - alongArrow;
      left = anchor.x + anchor.width / 2 - panelWidth / 2;
      break;
    case "bottom":
      top = anchor.y + anchor.height + alongArrow;
      left = anchor.x + anchor.width / 2 - panelWidth / 2;
      break;
    case "left":
      top = anchor.y + anchor.height / 2 - panelHeight / 2;
      left = anchor.x - panelWidth - alongArrow;
      break;
    case "right":
      top = anchor.y + anchor.height / 2 - panelHeight / 2;
      left = anchor.x + anchor.width + alongArrow;
      break;
  }

  if (panelWidth > 0) {
    left = Math.min(
      Math.max(left, margin),
      Math.max(margin, screenWidth - panelWidth - margin),
    );
  }

  if (panelHeight > 0) {
    top = Math.min(
      Math.max(top, margin),
      Math.max(margin, screenHeight - panelHeight - margin),
    );
  }

  return Platform.OS === "web"
    ? ({
        position: "fixed",
        top,
        left,
        zIndex: TOOLTIP_PANEL_Z_INDEX,
      } as unknown as ViewStyle)
    : {
        position: "absolute",
        top,
        left,
        zIndex: TOOLTIP_PANEL_Z_INDEX,
      };
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
    style,
}: TooltipProps) {
  const { theme } = useTheme();
  const isControlled = openProp !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isOpen = isControlled ? Boolean(openProp) : uncontrolledOpen;
  const [anchor, setAnchor] = useState<AnchorRect | null>(null);
  const [panelSize, setPanelSize] = useState({ width: 0, height: 0 });
  const [backdropEnabled, setBackdropEnabled] = useState(false);
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
      setBackdropEnabled(false);
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

    const backdropTimer = setTimeout(() => {
      setBackdropEnabled(true);
    }, 0);

    clearAutoHideTimer();
    if (autoHide) {
      autoHideTimerRef.current = setTimeout(() => {
        setOpen(false);
      }, AUTO_HIDE_MS);
    }

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(backdropTimer);
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
        { opacity, overflow: "visible" },
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

  const triggerNode = (
    <View
      ref={triggerRef}
      collapsable={false}
      style={[{ alignSelf: "flex-start" }, style]}
      accessibilityHint={message}
    >
      {isControlled ? (
        children
      ) : (
        renderTrigger(children, toggleUncontrolled, isOpen)
      )}
    </View>
  );

  const overlayContent =
    isOpen && anchor ? (
      <View
        style={Platform.OS === "web" ? styles.webOverlayRoot : styles.modalRoot}
        pointerEvents="box-none"
      >
        {dismissible ? (
          <Pressable
            style={[StyleSheet.absoluteFill, styles.backdrop]}
            pointerEvents={backdropEnabled ? "auto" : "none"}
            onPress={handleDismiss}
            accessibilityRole="button"
            accessibilityLabel="툴팁 닫기"
          />
        ) : null}
        {tooltipPanel}
      </View>
    ) : null;

  return (
    <>
      {triggerNode}
      {Platform.OS === "web"
        ? portalToBody(overlayContent)
        : (
          <Modal
            visible={isOpen}
            transparent
            animationType="fade"
            onRequestClose={handleDismiss}
          >
            {overlayContent}
          </Modal>
        )}
    </>
  );
}

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
  },
  webOverlayRoot: {
    ...(Platform.OS === "web"
      ? ({
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: TOOLTIP_OVERLAY_Z_INDEX,
        } as unknown as ViewStyle)
      : null),
  },
  backdrop: {
    zIndex: TOOLTIP_OVERLAY_Z_INDEX,
  },
});

function portalToBody(content: React.ReactNode) {
  if (Platform.OS !== "web") {
    return null;
  }

  const doc = globalThis as typeof globalThis & {
    document?: { body: Element };
  };

  if (!doc.document?.body) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { createPortal } = require("react-dom") as {
    createPortal: (
      children: React.ReactNode,
      container: Element,
    ) => React.ReactPortal;
  };

  return createPortal(content, doc.document.body);
}

function isPressableChild(element: React.ReactElement): boolean {
  if (element.type === Pressable) {
    return true;
  }

  if (typeof element.props.onPress === "function") {
    return true;
  }

  if (typeof element.type === "function") {
    const component = element.type as { displayName?: string; name?: string };
    const name = component.displayName ?? component.name;
    return name === "Button" || name === "Pressable" || name === "TouchableOpacity";
  }

  return false;
}

function renderTrigger(
  children: React.ReactNode,
  onPress: () => void,
  isOpen: boolean,
): React.ReactNode {
  if (React.isValidElement(children) && isPressableChild(children)) {
    const child = children as React.ReactElement<{
      onPress?: () => void;
      accessibilityState?: { expanded?: boolean; [key: string]: unknown };
    }>;
    const childOnPress = child.props.onPress;

    return React.cloneElement(child, {
      onPress: () => {
        onPress();
        childOnPress?.();
      },
      accessibilityState: {
        ...(child.props.accessibilityState ?? {}),
        expanded: isOpen,
      },
    });
  }

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ expanded: isOpen }}
    >
      {children}
    </Pressable>
  );
}
