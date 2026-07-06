import React from "react";
import { useTheme } from "../../theme/ThemeProvider";
import { LoadingDots } from "./LoadingDots";
import {
  buttonBaseStyles,
  buttonIconGap,
  resolveButtonRound,
  resolveButtonSizeStyles,
  resolveButtonStyles,
  type ButtonColor,
  type ButtonRound,
  type ButtonSize,
  type ButtonVariant,
} from "./buttonStyles";

type ButtonBaseProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  round?: ButtonRound;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
};

type ButtonProps =
  | (ButtonBaseProps & { iconOnly?: false; "aria-label"?: string })
  | (ButtonBaseProps & { iconOnly: true; "aria-label": string });

export function Button({
  children,
  iconOnly = false,
  "aria-label": ariaLabel,
  onClick,
  variant = "filled",
  color = "primary",
  size = "md",
  round = "md",
  disabled = false,
  loading = false,
  type = "button",
}: ButtonProps) {
  const { theme, colorScheme } = useTheme();
  const colorStyles = resolveButtonStyles(variant, color, theme, colorScheme);
  const isInactive = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isInactive}
      aria-busy={loading}
      aria-label={ariaLabel}
      style={{
        ...buttonBaseStyles,
        gap: iconOnly ? 0 : buttonIconGap,
        cursor: isInactive ? "not-allowed" : "pointer",
        opacity: isInactive ? 0.5 : 1,
        ...colorStyles,
        ...resolveButtonSizeStyles(size, round, { iconOnly }),
        borderRadius: resolveButtonRound(round),
      }}
    >
      <span
        aria-hidden={loading}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: iconOnly ? 0 : buttonIconGap,
          visibility: loading ? "hidden" : "visible",
        }}
      >
        {children}
      </span>
      {loading && (
        <LoadingDots color={colorStyles.color as string} size={size} />
      )}
    </button>
  );
}
