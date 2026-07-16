import type React from "react";
import { borderRadius, spacing, type Theme } from "@yeoooonn/ds-tokens";

export type CardColorScheme = "light" | "dark";

const CARD_BOX_SHADOW_LIGHT =
  "0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.06)";
const CARD_BOX_SHADOW_DARK =
  "0 12px 32px rgba(0, 0, 0, 0.55), 0 4px 12px rgba(0, 0, 0, 0.35)";

type ResolveCardStylesOptions = {
  boxShadow?: boolean;
};

export function resolveCardStyles(
  theme: Theme,
  colorScheme: CardColorScheme,
  { boxShadow = false }: ResolveCardStylesOptions = {},
): {
  root: React.CSSProperties;
  header: React.CSSProperties;
  content: React.CSSProperties;
  footer: React.CSSProperties;
} {
  const isDark = colorScheme === "dark";

  return {
    root: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: theme.surface.elevated.background,
      border: `1px solid ${theme.border.default}`,
      borderRadius: borderRadius.lg,
      overflow: "hidden",
      boxShadow: boxShadow
        ? isDark
          ? CARD_BOX_SHADOW_DARK
          : CARD_BOX_SHADOW_LIGHT
        : undefined,
    },
    header: {
      flexShrink: 0,
      padding: spacing[4],
    },
    content: {
      flex: 1,
      padding: spacing[4],
      color: theme.text.primary,
    },
    footer: {
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: spacing[2],
      padding: spacing[4],
    },
  };
}
