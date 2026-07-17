import React from "react";
import { spacing } from "@yeoooonn/ds-tokens";
import { useTheme } from "../../theme/ThemeProvider";
import { Typography } from "../Typography";

export type ListItemProps = {
  title: string;
  description?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
};

export function ListItem({
  title,
  description,
  leading,
  trailing,
  disabled = false,
  onClick,
  className,
  style,
}: ListItemProps) {
  const { theme } = useTheme();

  const contentStyle: React.CSSProperties = {
    display: "flex",
    width: "100%",
    alignItems: "center",
    gap: spacing[3],
    paddingBlock: spacing[3],
    opacity: disabled ? 0.5 : 1,
    backgroundColor: theme.background.primary,
    border: "none",
    textAlign: "left",
    font: "inherit",
    color: "inherit",
    cursor: onClick && !disabled ? "pointer" : undefined,
  };

  const content = (
    <>
      {leading != null && (
        <span
          style={{
            display: "flex",
            flexShrink: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {leading}
        </span>
      )}
      <span
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          gap: spacing[1],
          minWidth: 0,
        }}
      >
        <Typography.P1
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </Typography.P1>
        {description ? (
          <Typography.P2
            color="secondary"
            style={{
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {description}
          </Typography.P2>
        ) : null}
      </span>
      {trailing ? (
        <span
          style={{
            display: "flex",
            flexShrink: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {trailing}
        </span>
      ) : null}
    </>
  );

  if (!onClick) {
    return (
      <div className={className} style={{ ...contentStyle, ...style }}>
        {content}
      </div>
    );
  }

  return (
    <button
      type="button"
      className={className}
      disabled={disabled}
      onClick={onClick}
      style={{ ...contentStyle, ...style }}
    >
      {content}
    </button>
  );
}
