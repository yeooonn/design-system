import {
  borderWidth,
  colors,
  fontWeight,
  spacing,
  type Theme,
} from "@yeoooonn/ds-tokens";
import { appFontSize as fontSize } from "../../tokens/typography";
import { resolveButtonRound } from "../Button/buttonStyles";

export type InputVariant = "box" | "line";
export type InputSize = "sm" | "md" | "lg";
export type InputColorScheme = "light" | "dark";
export type InputState = "default" | "focus" | "error" | "disabled";

/** Input / Select / Textarea 필드 disabled 시각 투명도 */
export const FIELD_DISABLED_OPACITY = 0.48;

export const inputSizeStyles: Record<
  InputSize,
  {
    minHeight: number;
    paddingInline: number;
    paddingBlock: number;
    fontSize: number;
    labelFontSize: number;
    gap: number;
    linePaddingBottom: number;
  }
> = {
  sm: {
    minHeight: 32,
    paddingInline: spacing[3],
    paddingBlock: spacing[1],
    fontSize: fontSize.sm,
    labelFontSize: fontSize.xs,
    gap: spacing[1],
    linePaddingBottom: spacing[1],
  },
  md: {
    minHeight: 44,
    paddingInline: spacing[4],
    paddingBlock: spacing[2],
    fontSize: fontSize.md,
    labelFontSize: fontSize.sm,
    gap: spacing[2],
    linePaddingBottom: spacing[2],
  },
  lg: {
    minHeight: 52,
    paddingInline: spacing[6],
    paddingBlock: spacing[3],
    fontSize: fontSize.lg,
    labelFontSize: fontSize.md,
    gap: spacing[2],
    linePaddingBottom: spacing[2],
  },
};

export function resolveInputState({
  disabled,
  error,
  focused,
}: {
  disabled: boolean;
  error: boolean;
  focused: boolean;
}): InputState {
  if (disabled) return "disabled";
  if (error) return "error";
  if (focused) return "focus";
  return "default";
}

type InputStyleTokens = {
  backgroundColor: string;
  borderColor: string;
  color: string;
  labelColor: string;
  affixColor: string;
  placeholderColor: string;
};

function getInputStyleTokens(
  theme: Theme,
  colorScheme: InputColorScheme,
  state: InputState,
): InputStyleTokens {
  if (state === "disabled") {
    return {
      backgroundColor:
        colorScheme === "light"
          ? colors.gray[100]
          : theme.background.secondary,
      borderColor:
        colorScheme === "light"
          ? theme.border.default
          : "rgba(255, 255, 255, 0.06)",
      color:
        colorScheme === "light"
          ? theme.text.tertiary
          : "rgba(242, 244, 246, 0.32)",
      labelColor:
        colorScheme === "light"
          ? theme.text.tertiary
          : "rgba(242, 244, 246, 0.32)",
      affixColor:
        colorScheme === "light"
          ? theme.text.tertiary
          : "rgba(242, 244, 246, 0.32)",
      placeholderColor:
        colorScheme === "light"
          ? theme.text.tertiary
          : "rgba(242, 244, 246, 0.28)",
    };
  }

  if (state === "error") {
    return {
      backgroundColor:
        colorScheme === "light" ? "#FEF2F2" : "rgba(243, 66, 66, 0.12)",
      borderColor: colors.error[400],
      color: theme.text.primary,
      labelColor: colors.error[400],
      affixColor: theme.text.primary,
      placeholderColor: theme.text.tertiary,
    };
  }

  if (state === "focus") {
    return {
      backgroundColor:
        colorScheme === "light" ? colors.primary[50] : "rgba(49, 130, 246, 0.12)",
      borderColor: colors.primary[300],
      color: theme.text.primary,
      labelColor: theme.text.secondary,
      affixColor: theme.text.primary,
      placeholderColor: theme.text.tertiary,
    };
  }

  return {
    backgroundColor:
      colorScheme === "light"
        ? theme.background.primary
        : theme.background.secondary,
    borderColor: theme.border.default,
    color: theme.text.primary,
    labelColor: theme.text.secondary,
    affixColor: theme.text.primary,
    placeholderColor: theme.text.tertiary,
  };
}

export function resolveInputTokens(
  variant: InputVariant,
  size: InputSize,
  theme: Theme,
  colorScheme: InputColorScheme,
  state: InputState,
) {
  const tokens = getInputStyleTokens(theme, colorScheme, state);
  const sizeStyles = inputSizeStyles[size];

  return {
    tokens,
    sizeStyles,
    borderRadius: variant === "box" ? resolveButtonRound("md") : 0,
    borderWidth: borderWidth.thin,
    messageHelperColor: theme.text.tertiary,
    messageErrorColor: colors.error[400],
    fontWeight: fontWeight.regular,
  };
}
