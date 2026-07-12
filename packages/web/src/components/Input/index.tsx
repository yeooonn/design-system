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
  helperText?: string;
  errorMessage?: string;
};

export function Input({
  variant = "box",
  size = "md",
  label,
  prefix,
  suffix,
  error = false,
  helperText,
  errorMessage,
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
  const descriptionId = `${inputId}-description`;
  const [focused, setFocused] = useState(false);

  const hasError = error || Boolean(errorMessage);
  const showErrorMessage = hasError && Boolean(errorMessage);
  const description = showErrorMessage ? errorMessage : helperText;

  const state = resolveInputState({ disabled, error: hasError, focused });
  const styles = resolveInputStyles(variant, size, theme, colorScheme, state);

  return (
    <div className={className} style={{ ...styles.wrapper, ...style }}>
      <div style={styles.labelSlot}>
        {label ? (
          <label htmlFor={inputId} style={styles.label}>
            {label}
          </label>
        ) : null}
      </div>
      <div style={styles.field}>
        {prefix && <span style={styles.affix}>{prefix}</span>}
        <input
          {...inputProps}
          id={inputId}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          aria-describedby={description ? descriptionId : undefined}
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
      <div style={styles.messageSlot}>
        {description ? (
          <p
            id={descriptionId}
            style={{
              ...styles.message,
              color: showErrorMessage
                ? styles.messageErrorColor
                : styles.messageHelperColor,
            }}
          >
            {description}
          </p>
        ) : null}
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

