import React, { useId, useState } from "react";
import { useTheme } from "../../theme/ThemeProvider";
import { resolveCheckboxRadioState } from "../_shared/checkboxRadioStyles";
import { resolveRadioStyles, type RadioSize } from "./radioStyles";

type RadioProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> & {
  size?: RadioSize;
  label?: React.ReactNode;
  error?: boolean;
  helperText?: string;
  errorMessage?: string;
};

export function Radio({
  size = "md",
  label,
  error = false,
  helperText,
  errorMessage,
  disabled = false,
  checked = false,
  id,
  className,
  style,
  onFocus,
  onBlur,
  ...inputProps
}: RadioProps) {
  const { theme, colorScheme } = useTheme();
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = `${inputId}-description`;
  const [focused, setFocused] = useState(false);

  const hasError = error || Boolean(errorMessage);
  const showErrorMessage = hasError && Boolean(errorMessage);
  const description = showErrorMessage ? errorMessage : helperText;
  const isChecked = Boolean(checked);

  const state = resolveCheckboxRadioState({
    disabled,
    error: hasError,
    focused,
    checked: isChecked,
  });
  const styles = resolveRadioStyles(size, theme, colorScheme, state);

  return (
    <div className={className} style={{ ...styles.wrapper, ...style }}>
      <label htmlFor={inputId} style={styles.label}>
        <input
          {...inputProps}
          id={inputId}
          type="radio"
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
          <span style={styles.dot} />
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
