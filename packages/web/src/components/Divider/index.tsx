import React from "react";
import { spacing } from "@yeoooonn/ds-tokens";
import { useTheme } from "../../theme/ThemeProvider";

export type DividerOrientation = "horizontal" | "vertical";

export type DividerProps = {
  orientation?: DividerOrientation;
  className?: string;
  style?: React.CSSProperties;
};

export function Divider({
  orientation = "horizontal",
  className,
  style,
}: DividerProps) {
  const { theme } = useTheme();
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      className={className}
      role="separator"
      aria-orientation={orientation}
      style={{
        backgroundColor: theme.border.default,
        flexShrink: 0,
        ...(isHorizontal
          ? { height: 1, width: "100%", alignSelf: "stretch" }
          : { width: 1, alignSelf: "stretch", minHeight: spacing[4] }),
        ...style,
      }}
    />
  );
}
