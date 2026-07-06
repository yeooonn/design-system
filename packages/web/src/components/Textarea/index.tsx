import React, { useId, useState } from "react";
import { useTheme } from "../../theme/ThemeProvider";
import {
  resolveTextareaState,
  resolveTextareaStyles,
  type TextareaSize,
} from "./textareaStyles";

type TextareaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "size"
> & {
  size?: TextareaSize;
  label?: string;
  error?: boolean;
  showCount?: boolean;
  count?: number;
  countMax?: number;
  countUnit?: string;
  isCountExceeded?: boolean;
  countOverMessage?: string;
  showExample?: boolean;
  exampleText?: React.ReactNode;
};

export function Textarea({
  size = "md",
  label,
  error = false,
  disabled = false,
  showCount = false,
  count = 0,
  countMax = 90,
  countUnit = "byte",
  isCountExceeded = false,
  countOverMessage,
  showExample = false,
  exampleText,
  id,
  className,
  style,
  onFocus,
  onBlur,
  ...textareaProps
}: TextareaProps) {
  const { theme, colorScheme } = useTheme();
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const [focused, setFocused] = useState(false);
  const hasError = error || isCountExceeded;
  const warningMessage =
    countOverMessage ?? `최대 ${countMax}${countUnit}를 초과했습니다.`;

  const state = resolveTextareaState({ disabled, error: hasError, focused });
  const styles = resolveTextareaStyles(size, theme, colorScheme, state, {
    showCount,
    countExceeded: isCountExceeded,
  });

  return (
    <div className={className} style={{ ...styles.wrapper, ...style }}>
      {label && (
        <label htmlFor={textareaId} style={styles.label}>
          {label}
        </label>
      )}
      <div style={styles.field}>
        {showExample && exampleText && (
          <div style={styles.exampleText}>{exampleText}</div>
        )}
        <textarea
          {...textareaProps}
          id={textareaId}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          style={styles.textarea}
          onFocus={(event) => {
            setFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            onBlur?.(event);
          }}
        />
        {showCount && (
          <div style={styles.count} aria-live="polite">
            <span style={styles.countCurrent}>{count}</span>
            <span style={styles.countLimit}>
              {" "}
              / {countMax}
              {countUnit}
            </span>
          </div>
        )}
      </div>
      {isCountExceeded && <p style={styles.countWarning}>{warningMessage}</p>}
      <style>
        {`
          #${textareaId}::placeholder {
            color: ${styles.placeholderColor};
            opacity: 1;
          }
        `}
      </style>
    </div>
  );
}

export type { TextareaSize };
