import React from "react";
import { useTheme } from "../../theme/ThemeProvider";
import { LoadingDots } from "../_shared/LoadingDots";
import {
  buttonBaseStyles,
  buttonSizeStyles,
  resolveButtonStyles,
  type ButtonColor,
  type ButtonSize,
  type ButtonVariant,
} from "../_shared/buttonStyles";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
}

export function Button({
  label,
  onClick,
  variant = "filled",
  color = "primary",
  size = "md",
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
      style={{
        ...buttonBaseStyles,
        cursor: isInactive ? "not-allowed" : "pointer",
        opacity: isInactive ? 0.5 : 1,
        ...colorStyles,
        ...buttonSizeStyles[size],
      }}
    >
      <span
        aria-hidden={loading}
        style={{ visibility: loading ? "hidden" : "visible" }}
      >
        {label}
      </span>
      {loading && (
        <LoadingDots color={colorStyles.color as string} size={size} />
      )}
    </button>
  );
}
