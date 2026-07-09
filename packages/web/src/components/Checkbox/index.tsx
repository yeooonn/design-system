import React, { useEffect, useId, useRef, useState } from "react";
import { useTheme } from "../../theme/ThemeProvider";
import { resolveCheckboxRadioState } from "../_shared/checkboxRadioStyles";
import {
  resolveCheckboxStyles,
  type CheckboxSize,
} from "./checkboxStyles";

type CheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> & {
  size?: CheckboxSize;
  label?: React.ReactNode;
  error?: boolean;
  helperText?: string;
  errorMessage?: string;
  indeterminate?: boolean;
};

function CheckIcon({
  color,
  size,
  indeterminate,
}: {
  color: string;
  size: number;
  indeterminate: boolean;
}) {
  if (indeterminate) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden
      >
        <path
          d="M2.5 6H9.5"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
    >
      <path
        d="M2.5 6L5 8.5L9.5 3.5"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Checkbox({
  size = "md",
  label,
  error = false,
  helperText,
  errorMessage,
  indeterminate = false,
  disabled = false,
  checked = false,
  id,
  className,
  style,
  onFocus,
  onBlur,
  ...inputProps
}: CheckboxProps) {
  const { theme, colorScheme } = useTheme();
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = `${inputId}-description`;
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);

  const hasError = error || Boolean(errorMessage);
  const showErrorMessage = hasError && Boolean(errorMessage);
  const description = showErrorMessage ? errorMessage : helperText;
  const isChecked = Boolean(checked);

  const state = resolveCheckboxRadioState({
    disabled,
    error: hasError,
    focused,
    checked: isChecked || indeterminate,
  });
  const styles = resolveCheckboxStyles(size, theme, colorScheme, state);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <div className={className} style={{ ...styles.wrapper, ...style }}>
      <label htmlFor={inputId} style={styles.label}>
        <input
          {...inputProps}
          ref={inputRef}
          id={inputId}
          type="checkbox"
          checked={checked}
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
        <span style={styles.control}>
          <CheckIcon
            color={styles.checkIconColor}
            size={styles.checkIconSize}
            indeterminate={indeterminate}
          />
        </span>
        {label && <span style={styles.labelText}>{label}</span>}
      </label>
      {description && (
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
      )}
    </div>
  );
}
