import type React from "react";
import { spacing } from "@yeoooonn/ds-tokens";

export function resolveResultStyles(): {
  root: React.CSSProperties;
  figure: React.CSSProperties;
  title: React.CSSProperties;
  description: React.CSSProperties;
  button: React.CSSProperties;
} {
  return {
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: spacing[1],
    },
    figure: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: spacing[2],
    },
    title: {
      maxWidth: 360,
    },
    description: {
      maxWidth: 360,
    },
    button: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: spacing[2],
      marginTop: spacing[2],
    },
  };
}
