import React, { useId, useState } from "react";
import { useTheme } from "../../theme/ThemeProvider";
import { resolveCheckboxRadioState } from "../_shared/checkboxRadioStyles";
import { resolveSwitchStyles, type SwitchSize } from "./switchStyles";

type SwitchProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> & {
  size?: SwitchSize;
  label?: React.ReactNode;
  error?: boolean;
  helperText?: string;
  errorMessage?: string;
};

export function Switch({
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
}: SwitchProps) {
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
  const styles = resolveSwitchStyles(size, theme, colorScheme, state, {
    checked: isChecked,
    disabled,
    error: hasError,
    focused,
  });

  return (
    <div className={className} style={{ ...styles.wrapper, ...style }}>
      <label htmlFor={inputId} style={styles.label}>
        <input
          {...inputProps}
          id={inputId}
          type="checkbox"
          role="switch"
          checked={checked}
          disabled={disabled}
          aria-checked={isChecked}
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
        {label && <span style={styles.labelText}>{label}</span>}
        <span style={styles.track}>
          <span style={styles.thumb} />
        </span>
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
