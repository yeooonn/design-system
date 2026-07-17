import React, { useId, useRef } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "../../theme/ThemeProvider";
import {
  resolveArrowStyles,
  resolveTooltipStyles,
  TOOLTIP_OFFSCREEN,
  type TooltipPosition,
} from "./tooltipStyles";
import { useTooltipOpen } from "./useTooltipOpen";
import { useTooltipPresence } from "./useTooltipPresence";
import { useTooltipPosition } from "./useTooltipPosition";

type TooltipProps = {
  message: string;
  children: React.ReactNode;
  /**
   * 있으면 controlled, 없으면 hover/focus(uncontrolled).
   * uncontrolled는 스크롤 시 페이드 없이 즉시 닫힌다.
   * controlled는 스크롤해도 open을 유지하며 위치만 갱신한다.
   */
  open?: boolean;
  /** 선호 위치. autoFlip 시 viewport 밖이면 주축 반대편으로 전환 */
  position?: TooltipPosition;
  autoFlip?: boolean;
  showArrow?: boolean;
  /** uncontrolled hover/focus 열림 지연 (ms) */
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
};

export function Tooltip({
  message,
  children,
  open: openProp,
  position = "bottom",
  autoFlip = false,
  showArrow = false,
  delay = 0,
  className,
  style,
}: TooltipProps) {
  const { theme, colorScheme } = useTheme();
  const styles = resolveTooltipStyles(theme, colorScheme);
  const tooltipId = useId();

  const clearCoordsRef = useRef<() => void>(() => {});

  const { isOpen, isControlled, openUncontrolled, closeUncontrolled } =
    useTooltipOpen(openProp, delay);

  const {
    entered,
    isMounted,
    requestSkipExitAnimation,
    enterAfterPaint,
  } = useTooltipPresence({
    isOpen,
    onExited: () => clearCoordsRef.current(),
  });

  const { coords, resolvedPosition, triggerRef, tooltipRef, clearCoords } =
    useTooltipPosition({
      isActive: isMounted && isOpen,
      preferred: position,
      autoFlip,
      relayoutKey: `${message}:${showArrow}`,
      dismissOnScroll: !isControlled,
      onScroll: requestSkipExitAnimation,
      onScrollDismiss: closeUncontrolled,
      onPositioned: enterAfterPaint,
    });

  clearCoordsRef.current = clearCoords;

  const backgroundColor =
    (styles.panel.backgroundColor as string) ?? theme.background.primary;
  const borderColor = theme.border.default;

  return (
    <>
      <span
        ref={triggerRef}
        style={{
          display: "inline-flex",
          width: "max-content",
          maxWidth: "100%",
          // grid/flex 셀에서 stretch 되면 rect가 트리거보다 커져 위치가 어긋난다
          justifySelf: "start",
          alignSelf: "start",
        }}
        onMouseEnter={openUncontrolled}
        onMouseLeave={closeUncontrolled}
        onFocus={openUncontrolled}
        onBlur={closeUncontrolled}
        aria-describedby={isOpen && entered ? tooltipId : undefined}
      >
        {children}
      </span>
      {isMounted &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={tooltipRef}
            id={tooltipId}
            role="tooltip"
            className={className}
            style={{
              ...styles.panel,
              top: coords?.top ?? TOOLTIP_OFFSCREEN,
              left: coords?.left ?? TOOLTIP_OFFSCREEN,
              opacity: entered ? 1 : 0,
              ...style,
            }}
          >
            {message}
            {showArrow && (
              <span
                aria-hidden
                style={resolveArrowStyles(
                  resolvedPosition,
                  backgroundColor,
                  borderColor,
                )}
              />
            )}
          </div>,
          document.body,
        )}
    </>
  );
}

export type { TooltipPosition };
