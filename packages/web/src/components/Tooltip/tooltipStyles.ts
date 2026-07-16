import type React from "react";
import {
  borderRadius,
  fontSize,
  fontWeight,
  lineHeight,
  spacing,
  type Theme,
} from "@yeoooonn/ds-tokens";

export type TooltipPosition = "top" | "bottom" | "left" | "right";
export type TooltipColorScheme = "light" | "dark";

export const TOOLTIP_Z_INDEX = 1200;
export const TOOLTIP_OFFSET = spacing[2];
export const TOOLTIP_ARROW_SIZE = 6;
export const TOOLTIP_FADE_MS = 350;
/** 크기 측정 전 화면 밖 임시 좌표 */
export const TOOLTIP_OFFSCREEN = -9999;

const TOOLTIP_BOX_SHADOW =
  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)";

export function resolveTooltipStyles(
  theme: Theme,
  colorScheme: TooltipColorScheme,
): {
  panel: React.CSSProperties;
} {
  const backgroundColor = theme.surface.tooltip;
  const borderColor = theme.border.default;

  return {
    panel: {
      position: "fixed",
      zIndex: TOOLTIP_Z_INDEX,
      maxWidth: 280,
      padding: `${spacing[2]}px ${spacing[3]}px`,
      backgroundColor,
      color: theme.text.primary,
      border: `1px solid ${borderColor}`,
      borderRadius: borderRadius.md,
      boxShadow: TOOLTIP_BOX_SHADOW,
      fontSize: fontSize.sm,
      fontWeight: fontWeight.regular,
      lineHeight: lineHeight.normal,
      wordBreak: "break-word",
      pointerEvents: "none",
      transition: `opacity ${TOOLTIP_FADE_MS}ms ease`,
    },
  };
}

export function resolveArrowStyles(
  position: TooltipPosition,
  backgroundColor: string,
  borderColor: string,
): React.CSSProperties {
  const size = TOOLTIP_ARROW_SIZE;

  switch (position) {
    case "top":
      return {
        position: "absolute",
        left: "50%",
        bottom: -size,
        transform: "translateX(-50%)",
        width: 0,
        height: 0,
        borderStyle: "solid",
        borderWidth: `${size}px ${size}px 0 ${size}px`,
        borderColor: `${backgroundColor} transparent transparent transparent`,
        filter: `drop-shadow(0 1px 0 ${borderColor})`,
      };
    case "bottom":
      return {
        position: "absolute",
        left: "50%",
        top: -size,
        transform: "translateX(-50%)",
        width: 0,
        height: 0,
        borderStyle: "solid",
        borderWidth: `0 ${size}px ${size}px ${size}px`,
        borderColor: `transparent transparent ${backgroundColor} transparent`,
        filter: `drop-shadow(0 -1px 0 ${borderColor})`,
      };
    case "left":
      return {
        position: "absolute",
        top: "50%",
        right: -size,
        transform: "translateY(-50%)",
        width: 0,
        height: 0,
        borderStyle: "solid",
        borderWidth: `${size}px 0 ${size}px ${size}px`,
        borderColor: `transparent transparent transparent ${backgroundColor}`,
        filter: `drop-shadow(1px 0 0 ${borderColor})`,
      };
    case "right":
      return {
        position: "absolute",
        top: "50%",
        left: -size,
        transform: "translateY(-50%)",
        width: 0,
        height: 0,
        borderStyle: "solid",
        borderWidth: `${size}px ${size}px ${size}px 0`,
        borderColor: `transparent ${backgroundColor} transparent transparent`,
        filter: `drop-shadow(-1px 0 0 ${borderColor})`,
      };
  }
}
