import { type Theme } from "@yeoooonn/ds-tokens";
import { appTextStyles } from "../../tokens/typography";

export type TypographyVariant = keyof typeof appTextStyles;

export type TypographyColor =
  | "primary"
  | "secondary"
  | "tertiary"
  | "inverse"
  | "success"
  | "warning"
  | "error";

export function resolveTypographyVariantStyles(variant: TypographyVariant) {
  const style = appTextStyles[variant];
  return {
    fontSize: style.fontSize,
    fontWeight: style.fontWeight,
    lineHeight: style.fontSize * style.lineHeight,
    letterSpacing: style.letterSpacing,
  };
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
