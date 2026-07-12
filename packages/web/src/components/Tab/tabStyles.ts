import type React from "react";
import {
  borderWidth,
  fontSize,
  fontWeight,
  spacing,
  type Theme,
} from "@yeoooonn/ds-tokens";

export type TabSize = "sm" | "md" | "lg";
export type TabColorScheme = "light" | "dark";

const tabSizeStyles: Record<
  TabSize,
  {
    paddingInline: number;
    paddingBlock: number;
    fontSize: number;
  }
> = {
  sm: {
    paddingInline: spacing[3],
    paddingBlock: spacing[2],
    fontSize: fontSize.sm,
  },
  md: {
    paddingInline: spacing[4],
    paddingBlock: spacing[3],
    fontSize: fontSize.md,
  },
  lg: {
    paddingInline: spacing[5],
    paddingBlock: spacing[3],
    fontSize: fontSize.lg,
  },
};

export function resolveTabStyles(
  theme: Theme,
  _colorScheme: TabColorScheme,
  size: TabSize = "md",
): {
  list: React.CSSProperties;
  listInner: React.CSSProperties;
  track: React.CSSProperties;
  item: React.CSSProperties;
  itemSelected: React.CSSProperties;
  itemDisabled: React.CSSProperties;
  indicator: React.CSSProperties;
} {
  const sizeStyles = tabSizeStyles[size];

  return {
    list: {
      width: "100%",
      overflowX: "auto",
      overflowY: "hidden",
      scrollbarWidth: "none",
      msOverflowStyle: "none",
      boxSizing: "border-box",
    },
    listInner: {
      position: "relative",
      display: "flex",
      alignItems: "stretch",
      width: "max-content",
      minWidth: "100%",
      boxSizing: "border-box",
    },
    track: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      height: borderWidth.thin,
      backgroundColor: theme.border.default,
      pointerEvents: "none",
    },
    item: {
      appearance: "none",
      margin: 0,
      border: "none",
      outline: "none",
      boxShadow: "none",
      background: "transparent",
      cursor: "pointer",
      flexShrink: 0,
      paddingInline: sizeStyles.paddingInline,
      paddingBlock: sizeStyles.paddingBlock,
      fontSize: sizeStyles.fontSize,
      fontWeight: fontWeight.medium,
      lineHeight: 1.5,
      color: theme.text.secondary,
      whiteSpace: "nowrap",
      position: "relative",
      zIndex: 1,
      transition: "color 0.15s ease",
    },
    itemSelected: {
      color: theme.action.primary,
      fontWeight: fontWeight.semibold,
    },
    itemDisabled: {
      cursor: "not-allowed",
      color: theme.text.tertiary,
      opacity: 0.6,
    },
    indicator: {
      position: "absolute",
      bottom: 0,
      height: borderWidth.thick,
      backgroundColor: theme.action.primary,
      pointerEvents: "none",
      zIndex: 2,
    },
  };
}
