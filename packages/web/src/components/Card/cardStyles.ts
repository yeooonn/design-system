import type React from "react";
import { borderRadius, spacing, type Theme } from "@yeoooonn/ds-tokens";

export type CardColorScheme = "light" | "dark";

const CARD_BOX_SHADOW =
  "0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.06)";

type ResolveCardStylesOptions = {
  boxShadow?: boolean;
};

export function resolveCardStyles(
  theme: Theme,
  _colorScheme: CardColorScheme,
  { boxShadow = false }: ResolveCardStylesOptions = {},
): {
  root: React.CSSProperties;
  header: React.CSSProperties;
  content: React.CSSProperties;
  footer: React.CSSProperties;
} {
  return {
    root: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: theme.background.primary,
      border: `1px solid ${theme.border.default}`,
      borderRadius: borderRadius.lg,
      overflow: "hidden",
      boxShadow: boxShadow ? CARD_BOX_SHADOW : undefined,
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
