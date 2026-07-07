import React from "react";
import { useTheme } from "../../theme/ThemeProvider";
import {
  resolveTypographyColor,
  resolveTypographyDefaultTag,
  resolveTypographyVariantStyles,
  type TypographyColor,
  type TypographyVariant,
} from "./typographyStyles";

export type TypographyTextProps = {
  children: React.ReactNode;
  color?: TypographyColor;
  as?: keyof React.JSX.IntrinsicElements;
  style?: React.CSSProperties;
};

function createTypographyComponent(
  variant: TypographyVariant,
  defaultTag: keyof React.JSX.IntrinsicElements,
) {
  function TypographyComponent({
    children,
    color = "primary",
    as,
    style,
  }: TypographyTextProps) {
    const { theme } = useTheme();
    const Component = as ?? defaultTag;

    return (
      <Component
        style={{
          margin: 0,
          ...resolveTypographyVariantStyles(variant),
          color: resolveTypographyColor(color, theme),
          ...style,
        }}
      >
        {children}
      </Component>
    );
  }

  TypographyComponent.displayName = `Typography.${variant}`;

  return TypographyComponent;
}

const TypographyH1 = createTypographyComponent(
  "H1",
  resolveTypographyDefaultTag("H1"),
);
const TypographyH2 = createTypographyComponent(
  "H2",
  resolveTypographyDefaultTag("H2"),
);
const TypographyH3 = createTypographyComponent(
  "H3",
  resolveTypographyDefaultTag("H3"),
);
const TypographyP1 = createTypographyComponent(
  "P1",
  resolveTypographyDefaultTag("P1"),
);
const TypographyP2 = createTypographyComponent(
  "P2",
  resolveTypographyDefaultTag("P2"),
);
const TypographyLabel = createTypographyComponent(
  "Label",
  resolveTypographyDefaultTag("Label"),
);
const TypographyCaption = createTypographyComponent(
  "Caption",
  resolveTypographyDefaultTag("Caption"),
);

export const Typography = {
  H1: TypographyH1,
  H2: TypographyH2,
  H3: TypographyH3,
  P1: TypographyP1,
  P2: TypographyP2,
  Label: TypographyLabel,
  Caption: TypographyCaption,
};
