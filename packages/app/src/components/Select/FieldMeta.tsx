import React from "react";
import { Text, View } from "react-native";
import { spacing } from "@yeoooonn/ds-tokens";

type FieldMetaTextProps = {
  text: string;
  fontSize: number;
  lineHeight: number;
  color: string;
};

function FieldMetaText({
  text,
  fontSize,
  lineHeight,
  color,
}: FieldMetaTextProps) {
  return <Text style={{ fontSize, lineHeight, color }}>{text}</Text>;
}

type FieldLabelProps = {
  label?: string;
  fontSize: number;
  lineHeight: number;
  color: string;
};

export function FieldLabel({
  label,
  fontSize,
  lineHeight,
  color,
}: FieldLabelProps) {
  return (
    <View style={{ minHeight: lineHeight, marginBottom: spacing[1] }}>
      {label ? (
        <FieldMetaText
          text={label}
          fontSize={fontSize}
          lineHeight={lineHeight}
          color={color}
        />
      ) : null}
    </View>
  );
}

type FieldDescriptionProps = {
  description?: string;
  fontSize: number;
  lineHeight: number;
  color: string;
};

export function FieldDescription({
  description,
  fontSize,
  lineHeight,
  color,
}: FieldDescriptionProps) {
  return (
    <View style={{ minHeight: lineHeight, marginTop: spacing[1] }}>
      {description ? (
        <FieldMetaText
          text={description}
          fontSize={fontSize}
          lineHeight={lineHeight}
          color={color}
        />
      ) : null}
    </View>
  );
}
