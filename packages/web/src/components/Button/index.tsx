import React from 'react';
import { colors, fontSize, fontWeight, spacing, borderRadius } from '@yeoooonn/ds-tokens';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: colors.primary[600],
    color: colors.white,
    border: 'none',
  },
  secondary: {
    backgroundColor: 'transparent',
    color: colors.primary[600],
    border: `1.5px solid ${colors.primary[600]}`,
  },
  ghost: {
    backgroundColor: 'transparent',
    color: colors.primary[600],
    border: 'none',
  },
};

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: {
    paddingInline: spacing[3],
    paddingBlock: spacing[1],
    fontSize: fontSize.sm,
    minHeight: 32,
  },
  md: {
    paddingInline: spacing[4],
    paddingBlock: spacing[2],
    fontSize: fontSize.md,
    minHeight: 44,
  },
  lg: {
    paddingInline: spacing[6],
    paddingBlock: spacing[3],
    fontSize: fontSize.lg,
    minHeight: 52,
  },
};

export function Button({
  label,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  type = 'button',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: borderRadius.md,
        fontWeight: fontWeight.semibold,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled || loading ? 0.5 : 1,
        transition: 'opacity 0.15s, background-color 0.15s',
        ...variantStyles[variant],
        ...sizeStyles[size],
      }}
    >
      {loading ? '...' : label}
    </button>
  );
}
