import React from "react";
import { useTheme } from "../../theme/ThemeProvider";

export type SpinnerSize = "sm" | "md" | "lg";

const spinnerSize: Record<SpinnerSize, number> = {
  sm: 16,
  md: 20,
  lg: 28,
};

export type SpinnerProps = {
  size?: SpinnerSize;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  "aria-label"?: string;
};

const SPINNER_ANIMATION_NAME = "ds-spinner-rotate";

export function Spinner({
  size = "md",
  color,
  className,
  style,
  "aria-label": ariaLabel = "Loading",
}: SpinnerProps) {
  const { theme } = useTheme();
  const box = spinnerSize[size];
  const strokeColor = color ?? theme.action.primary;

  return (
    <>
      <span
        className={className}
        role="status"
        aria-label={ariaLabel}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: box,
          height: box,
          ...style,
        }}
      >
        <span
          style={{
            boxSizing: "border-box",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: `${Math.max(2, Math.round(box / 8))}px solid transparent`,
            borderTopColor: strokeColor,
            animation: `${SPINNER_ANIMATION_NAME} 0.75s linear infinite`,
          }}
        />
      </span>
      <style>
        {`
          @keyframes ${SPINNER_ANIMATION_NAME} {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </>
  );
}
