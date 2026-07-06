import React, { useId, useState } from "react";
import { useTheme } from "../../theme/ThemeProvider";
import {
  resolveInputState,
  resolveInputStyles,
  type InputSize,
  type InputVariant,
} from "./inputStyles";

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "prefix" | "size"
> & {
  variant?: InputVariant;
  size?: InputSize;
  label?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  error?: boolean;
};

export function Input({
  variant = "box",
  size = "md",
  label,
  prefix,
  suffix,
  error = false,
  disabled = false,
  id,
  className,
  style,
  onFocus,
  onBlur,
  ...inputProps
}: InputProps) {
  const { theme, colorScheme } = useTheme();
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [focused, setFocused] = useState(false);

  const state = resolveInputState({ disabled, error, focused });
  const styles = resolveInputStyles(variant, size, theme, colorScheme, state);

  return (
    <div className={className} style={{ ...styles.wrapper, ...style }}>
      {label && (
        <label htmlFor={inputId} style={styles.label}>
          {label}
        </label>
      )}
      <div style={styles.field}>
        {prefix && <span style={styles.affix}>{prefix}</span>}
        <input
          {...inputProps}
          id={inputId}
          disabled={disabled}
          aria-invalid={error || undefined}
          style={styles.input}
          onFocus={(event) => {
            setFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            onBlur?.(event);
          }}
        />
        {suffix && <span style={styles.affix}>{suffix}</span>}
      </div>
      <style>
        {`
          #${inputId}::placeholder {
            color: ${styles.placeholderColor};
            opacity: 1;
          }
        `}
      </style>
    </div>
  );
}

export type { InputSize, InputVariant };
