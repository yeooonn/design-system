import React from "react";
import {
  badgeBaseStyles,
  badgeLabelStyles,
  badgeSizeStyles,
  resolveBadgeStyles,
  type BadgeColor,
  type BadgeSize,
  type BadgeVariant,
} from "./badgeStyles";

export type BadgeProps = {
  children: React.ReactNode;
  color?: BadgeColor;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  style?: React.CSSProperties;
};

export function Badge({
  children,
  color = "blue",
  variant = "soft",
  size = "md",
  className,
  style,
}: BadgeProps) {
  return (
    <span
      className={className}
      style={{
        ...badgeBaseStyles,
        ...badgeSizeStyles[size],
        ...resolveBadgeStyles(color, variant),
        ...style,
      }}
    >
      <span style={badgeLabelStyles}>{children}</span>
    </span>
  );
}
