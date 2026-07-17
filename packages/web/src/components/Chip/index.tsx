import React from "react";
import { useTheme } from "../../theme/ThemeProvider";
import {
  chipBaseStyles,
  chipCloseButtonStyles,
  chipFontSize,
  chipPadding,
  resolveChipStyles,
  type ChipColor,
  type ChipSize,
} from "./chipStyles";

export type ChipProps = {
  children: React.ReactNode;
  color?: ChipColor;
  size?: ChipSize;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
};

export function Chip({
  children,
  color = "gray",
  size = "md",
  selected = false,
  disabled = false,
  onClick,
  onClose,
  className,
  style,
}: ChipProps) {
  const { theme } = useTheme();
  const colorStyles = resolveChipStyles({
    color,
    theme,
    selected,
    disabled,
  });
  const isInteractive = Boolean(onClick) && !disabled;
  const labelStyle: React.CSSProperties = {
    color: colorStyles.color,
    fontSize: chipFontSize[size],
    lineHeight: 1,
  };

  const label = <span style={labelStyle}>{children}</span>;

  return (
    <span
      className={className}
      style={{
        ...chipBaseStyles,
        ...chipPadding[size],
        backgroundColor: colorStyles.backgroundColor,
        opacity: disabled ? 0.6 : 1,
        ...style,
      }}
    >
      {isInteractive ? (
        <button
          type="button"
          onClick={onClick}
          disabled={disabled}
          aria-pressed={selected}
          style={{
            ...chipCloseButtonStyles,
            color: colorStyles.color,
            cursor: disabled ? "not-allowed" : "pointer",
          }}
        >
          {label}
        </button>
      ) : (
        label
      )}
      {onClose ? (
        <button
          type="button"
          onClick={disabled ? undefined : onClose}
          disabled={disabled}
          aria-label="Remove"
          style={{
            ...chipCloseButtonStyles,
            ...labelStyle,
            cursor: disabled ? "not-allowed" : "pointer",
          }}
        >
          ✕
        </button>
      ) : null}
    </span>
  );
}

export type { ChipColor, ChipSize };
