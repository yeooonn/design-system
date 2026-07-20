import React from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import { spacing } from "@yeoooonn/ds-tokens";
import { Button } from "../Button";
import { Typography } from "../Typography";

export type ResultProps = {
  figure?: React.ReactNode;
  title?: string;
  description?: string;
  button?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

type ResultButtonProps = React.ComponentProps<typeof Button>;

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
    style,
}: ResultProps) {
  return (
    <View
      style={[{ alignItems: "center", gap: spacing[1] }, style]}
    >
      {figure != null && (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginBottom: spacing[2],
          }}
        >
          {figure}
        </View>
      )}
      {title && (
        <View style={{ maxWidth: 360 }}>
          <Typography.H3>{title}</Typography.H3>
        </View>
      )}
      {description && (
        <View style={{ maxWidth: 360 }}>
          <Typography.P1 color="secondary">{description}</Typography.P1>
        </View>
      )}
      {button && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: spacing[2],
            marginTop: spacing[2],
          }}
        >
          {button}
        </View>
      )}
    </View>
  );
}

ResultRoot.displayName = "Result";
ResultButton.displayName = "Result.Button";

export const Result = Object.assign(ResultRoot, {
  Button: ResultButton,
});
