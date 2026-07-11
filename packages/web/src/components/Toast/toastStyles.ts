import type React from "react";
import {
  borderRadius,
  fontSize,
  fontWeight,
  lineHeight,
  spacing,
  type Theme,
} from "@yeoooonn/ds-tokens";

export type ToastPosition =
  | "top-left"
  | "top-right"
  | "top-center"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center";

export type ToastColorScheme = "light" | "dark";

const TOAST_Z_INDEX = 1100;
const TOAST_OFFSET = spacing[4];
const TOAST_GAP = spacing[2];

export const TOAST_POSITIONS: ToastPosition[] = [
  "top-left",
  "top-right",
  "top-center",
  "bottom-left",
  "bottom-right",
  "bottom-center",
];

export function resolveToastContainerStyles(
  position: ToastPosition,
): React.CSSProperties {
  const isTop = position.startsWith("top");
  const isBottom = position.startsWith("bottom");
  const isLeft = position.endsWith("left");
  const isRight = position.endsWith("right");
  const isCenter = position.endsWith("center");

  return {
    position: "fixed",
    zIndex: TOAST_Z_INDEX,
    display: "flex",
    flexDirection: "column",
    gap: TOAST_GAP,
    pointerEvents: "none",
    maxWidth: `calc(100vw - ${TOAST_OFFSET * 2}px)`,
    ...(isTop ? { top: TOAST_OFFSET } : {}),
    ...(isBottom ? { bottom: TOAST_OFFSET } : {}),
    ...(isLeft ? { left: TOAST_OFFSET, alignItems: "flex-start" } : {}),
    ...(isRight ? { right: TOAST_OFFSET, alignItems: "flex-end" } : {}),
    ...(isCenter
      ? {
          left: "50%",
          transform: "translateX(-50%)",
          alignItems: "center",
        }
      : {}),
  };
}

const TOAST_ENTER_DISTANCE = 25;

/** position별 등장 시작 transform (진입 후 translate3d(0,0,0)으로 이동) */
export function resolveToastEnterTransform(position: ToastPosition): string {
  if (position.endsWith("left")) {
    return `translate3d(-${TOAST_ENTER_DISTANCE}px, 0, 0)`;
  }
  if (position.endsWith("right")) {
    return `translate3d(${TOAST_ENTER_DISTANCE}px, 0, 0)`;
  }
  if (position.startsWith("top")) {
    return `translate3d(0, -${TOAST_ENTER_DISTANCE}px, 0)`;
  }
  return `translate3d(0, ${TOAST_ENTER_DISTANCE}px, 0)`;
}

export function resolveToastItemStyles(
  theme: Theme,
  colorScheme: ToastColorScheme,
  options: { entered: boolean; position: ToastPosition },
): {
  root: React.CSSProperties;
  text: React.CSSProperties;
  addon: React.CSSProperties;
} {
  const isDark = colorScheme === "dark";
  const { entered, position } = options;

  return {
    root: {
      display: "inline-flex",
      alignItems: "center",
      gap: spacing[2],
      maxWidth: 360,
      padding: `${spacing[3]}px ${spacing[4]}px`,
      backgroundColor: isDark
        ? theme.background.tertiary
        : theme.background.primary,
      color: theme.text.primary,
      border: `1px solid ${theme.border.default}`,
      borderRadius: borderRadius.lg,
      boxShadow: isDark
        ? "0 10px 15px -3px rgba(0, 0, 0, 0.45), 0 4px 6px -4px rgba(0, 0, 0, 0.35)"
        : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
      pointerEvents: "auto",
      opacity: entered ? 1 : 0,
      transform: entered
        ? "translate3d(0, 0, 0)"
        : resolveToastEnterTransform(position),
      transition: "opacity 200ms ease, transform 400ms ease",
    },
    addon: {
      display: "inline-flex",
      alignItems: "center",
      flexShrink: 0,
    },
    text: {
      margin: 0,
      fontSize: fontSize.md,
      fontWeight: fontWeight.regular,
      lineHeight: lineHeight.normal,
      wordBreak: "break-word",
    },
  };
}
