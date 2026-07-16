import {
  borderWidth,
  colors,
  fontWeight,
  spacing,
  type Theme,
} from "@yeoooonn/ds-tokens";
import { appFontSize as fontSize } from "../../tokens/typography";
import { resolveButtonRound } from "../Button/buttonStyles";

export type FieldVariant = "box" | "line";
export type FieldSize = "sm" | "md" | "lg";
export type FieldState = "default" | "focus" | "error" | "disabled";

/** Input / Select / Textarea 필드 disabled 시각 투명도 */
export const FIELD_DISABLED_OPACITY = 0.48;

/** Select 옵션 disabled 시각 투명도 */
export const OPTION_DISABLED_OPACITY = 0.5;

export const fieldSizeStyles: Record<
  FieldSize,
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

export function resolveFieldState({
  disabled,
  error,
  focused,
}: {
  disabled: boolean;
  error: boolean;
  focused: boolean;
}): FieldState {
  if (disabled) return "disabled";
  if (error) return "error";
  if (focused) return "focus";
  return "default";
}

type FieldStyleTokens = {
  backgroundColor: string;
  borderColor: string;
  color: string;
  labelColor: string;
  affixColor: string;
  placeholderColor: string;
};

function getFieldStyleTokens(
  theme: Theme,
  state: FieldState,
): FieldStyleTokens {
  if (state === "disabled") {
    return {
      backgroundColor: theme.field.background.disabled,
      borderColor: theme.border.default,
      color: theme.text.tertiary,
      labelColor: theme.text.tertiary,
      affixColor: theme.text.tertiary,
      placeholderColor: theme.text.tertiary,
    };
  }

  if (state === "error") {
    return {
      backgroundColor: theme.field.background.error,
      borderColor: colors.error[400],
      color: theme.text.primary,
      labelColor: colors.error[400],
      affixColor: theme.text.primary,
      placeholderColor: theme.text.tertiary,
    };
  }

  if (state === "focus") {
    return {
      backgroundColor: theme.field.background.focus,
      borderColor: colors.primary[300],
      color: theme.text.primary,
      labelColor: theme.text.secondary,
      affixColor: theme.text.primary,
      placeholderColor: theme.text.tertiary,
    };
  }

  return {
    backgroundColor: theme.field.background.default,
    borderColor: theme.border.default,
    color: theme.text.primary,
    labelColor: theme.text.secondary,
    affixColor: theme.text.primary,
    placeholderColor: theme.text.tertiary,
  };
}

export function resolveFieldTokens(
  variant: FieldVariant,
  size: FieldSize,
  theme: Theme,
  state: FieldState,
) {
  const tokens = getFieldStyleTokens(theme, state);
  const sizeStyles = fieldSizeStyles[size];

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

/** Select 옵션 선택·필드 활성 배경색 (focus 토큰과 동일) */
export function resolveFieldActiveBackgroundColor(theme: Theme): string {
  return theme.field.background.focus;
}
