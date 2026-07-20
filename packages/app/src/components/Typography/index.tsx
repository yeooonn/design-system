import React from "react";
import { Text, type TextProps, type TextStyle } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import {
  resolveTypographyColor,
  resolveTypographyVariantStyles,
  type TypographyColor,
  type TypographyVariant,
} from "./typographyStyles";

export type TypographyTextProps = {
  children: React.ReactNode;
  color?: TypographyColor;
  style?: TextStyle;
} & Omit<TextProps, "style" | "children">;

function createTypographyComponent(variant: TypographyVariant) {
  function TypographyComponent({
    children,
    color = "primary",
        style,
    ...props
  }: TypographyTextProps) {
    const { theme } = useTheme();
    const variantStyles = resolveTypographyVariantStyles(variant);

    return (
      <Text
        style={[
          variantStyles,
          { color: resolveTypographyColor(color, theme) },
          style,
        ]}
        {...props}
      >
        {children}
      </Text>
    );
  }

  TypographyComponent.displayName = `Typography.${variant}`;
  return TypographyComponent;
}

export const Typography = {
  H1: createTypographyComponent("H1"),
  H2: createTypographyComponent("H2"),
  H3: createTypographyComponent("H3"),
  P1: createTypographyComponent("P1"),
  P2: createTypographyComponent("P2"),
  Label: createTypographyComponent("Label"),
  Caption: createTypographyComponent("Caption"),
};
