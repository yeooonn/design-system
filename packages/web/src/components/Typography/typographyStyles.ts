import type React from "react";
import { textStyles, type Theme } from "@yeoooonn/ds-tokens";

export type TypographyVariant = keyof typeof textStyles;

export type TypographyColor =
  | "primary"
  | "secondary"
  | "tertiary"
  | "inverse"
  | "success"
  | "warning"
  | "error";

const defaultTagMap: Record<
  TypographyVariant,
  keyof React.JSX.IntrinsicElements
> = {
  H1: "h1",
  H2: "h2",
  H3: "h3",
  P1: "p",
  P2: "p",
  Label: "span",
  Caption: "span",
};

export function resolveTypographyVariantStyles(variant: TypographyVariant) {
  return textStyles[variant];
}

export function resolveTypographyDefaultTag(variant: TypographyVariant) {
  return defaultTagMap[variant];
}

export function resolveTypographyColor(
  color: TypographyColor,
  theme: Theme,
): string {
  switch (color) {
    case "primary":
      return theme.text.primary;
    case "secondary":
      return theme.text.secondary;
    case "tertiary":
      return theme.text.tertiary;
    case "inverse":
      return theme.text.inverse;
    case "success":
      return theme.status.success;
    case "warning":
      return theme.status.warning;
    case "error":
      return theme.status.error;
  }
}
