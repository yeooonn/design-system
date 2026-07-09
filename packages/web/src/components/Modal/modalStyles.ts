import type React from "react";
import { borderRadius, spacing, type Theme } from "@yeoooonn/ds-tokens";

export type ModalColorScheme = "light" | "dark";

const MODAL_Z_INDEX = 1000;

export function resolveModalStyles(
  theme: Theme,
  colorScheme: ModalColorScheme,
): {
  backdrop: React.CSSProperties;
  panel: React.CSSProperties;
  header: React.CSSProperties;
  content: React.CSSProperties;
  footer: React.CSSProperties;
} {
  const isDark = colorScheme === "dark";

  const overlayColor = isDark
    ? "rgba(0, 0, 0, 0.55)"
    : "rgba(17, 24, 39, 0.45)";

  return {
    backdrop: {
      position: "fixed",
      inset: 0,
      zIndex: MODAL_Z_INDEX,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: spacing[4],
      backgroundColor: overlayColor,
    },
    panel: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      maxWidth: 480,
      maxHeight: "calc(100vh - 32px)",
      backgroundColor: isDark
        ? theme.background.secondary
        : theme.background.primary,
      border: isDark ? `1px solid ${theme.border.strong}` : undefined,
      borderRadius: borderRadius.lg,
      boxShadow: isDark
        ? "0 25px 50px -12px rgba(0, 0, 0, 0.55)"
        : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
    },
    header: {
      flexShrink: 0,
      padding: `${spacing[5]}px ${spacing[6]}px ${spacing[4]}px`,
      borderBottom: `1px solid ${theme.border.default}`,
    },
    content: {
      flex: 1,
      overflowY: "auto",
      padding: spacing[6],
      color: theme.text.primary,
    },
    footer: {
      flexShrink: 0,
      display: "flex",
      justifyContent: "flex-end",
      gap: spacing[2],
      padding: `${spacing[4]}px ${spacing[6]}px ${spacing[5]}px`,
      borderTop: `1px solid ${theme.border.default}`,
    },
  };
}
