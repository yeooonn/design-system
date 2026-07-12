import React from "react";
import { Button } from "../Button";
import { Typography } from "../Typography";
import { resolveResultStyles } from "./resultStyles";

export type ResultProps = {
  figure?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  button?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

type ResultButtonProps = React.ComponentProps<typeof Button>;

function isPlainText(node: React.ReactNode): node is string | number {
  return typeof node === "string" || typeof node === "number";
}

function ResultButton({
  variant = "filled",
  size = "sm",
  ...props
}: ResultButtonProps) {
  return <Button variant={variant} size={size} {...props} />;
}

function ResultRoot({
  figure,
  title,
  description,
  button,
  className,
  style,
}: ResultProps) {
  const styles = resolveResultStyles();

  return (
    <div className={className} style={{ ...styles.root, ...style }}>
      {figure != null && <div style={styles.figure}>{figure}</div>}
      {title != null && (
        <div style={styles.title}>
          {isPlainText(title) ? <Typography.H3>{title}</Typography.H3> : title}
        </div>
      )}
      {description != null && (
        <div style={styles.description}>
          {isPlainText(description) ? (
            <Typography.P1 color="secondary">{description}</Typography.P1>
          ) : (
            description
          )}
        </div>
      )}
      {button != null && <div style={styles.button}>{button}</div>}
    </div>
  );
}

ResultRoot.displayName = "Result";
ResultButton.displayName = "Result.Button";

export const Result = Object.assign(ResultRoot, {
  Button: ResultButton,
});
