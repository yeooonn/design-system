import React from "react";
import { borderRadius } from "@yeoooonn/ds-tokens";
import { useTheme } from "../../theme/ThemeProvider";

export type SkeletonProps = {
  width?: number | `${number}%` | "100%";
  height?: number;
  rounded?: keyof typeof borderRadius;
  className?: string;
  style?: React.CSSProperties;
};

const SKELETON_ANIMATION_NAME = "ds-skeleton-pulse";

export function Skeleton({
  width = "100%",
  height = 16,
  rounded = "md",
  className,
  style,
}: SkeletonProps) {
  const { theme } = useTheme();

  return (
    <>
      <span
        className={className}
        aria-hidden="true"
        style={{
          display: "block",
          width,
          height,
          borderRadius: borderRadius[rounded],
          backgroundColor: theme.skeleton.background,
          animation: `${SKELETON_ANIMATION_NAME} 1.4s ease-in-out infinite`,
          ...style,
        }}
      />
      <style>
        {`
          @keyframes ${SKELETON_ANIMATION_NAME} {
            0%, 100% { opacity: 0.45; }
            50% { opacity: 1; }
          }
        `}
      </style>
    </>
  );
}
