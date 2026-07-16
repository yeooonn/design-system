import React, { useState } from "react";
import {
  Pressable,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { cn } from "../../utils/cn";
import { LoadingDots } from "./LoadingDots";
import {
  buttonCircularSize,
  buttonFontWeight,
  buttonIconGap,
  buttonSizeMeta,
  resolveButtonRound,
  resolveButtonStyles,
  type ButtonColor,
  type ButtonRound,
  type ButtonSize,
  type ButtonVariant,
} from "./buttonStyles";

type ButtonBaseProps = {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  round?: ButtonRound;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
};

type ButtonProps =
  | (ButtonBaseProps & { iconOnly?: false })
  | (ButtonBaseProps & { iconOnly: true; accessibilityLabel: string });

function isTextChild(node: React.ReactNode): boolean {
  return (
    typeof node === "string" ||
    typeof node === "number" ||
    node == null ||
    typeof node === "boolean"
  );
}

function isTextOnlyChildren(children: React.ReactNode): boolean {
  return React.Children.toArray(children).every(isTextChild);
}

export function Button({
  children,
  iconOnly = false,
  accessibilityLabel,
  onPress,
  variant = "filled",
  color = "primary",
  size = "md",
  round = "md",
  disabled = false,
  loading = false,
  className,
  style,
}: ButtonProps) {
  const { theme } = useTheme();
  const [pressed, setPressed] = useState(false);
  const colorStyles = resolveButtonStyles(variant, color, theme);
  const isInactive = disabled || loading;
  const sizeMeta = buttonSizeMeta[size];
  const isCircular = round === "full" && iconOnly;
  const circular = buttonCircularSize[size];
  const labelFontSize = isCircular ? circular.fontSize : sizeMeta.fontSize;
  const labelStyle = {
    color: colorStyles.textColor,
    fontSize: labelFontSize,
    fontWeight: buttonFontWeight as "600",
    textAlign: "center" as const,
    lineHeight: Math.round(labelFontSize * 1.25),
  };

  const content = isTextOnlyChildren(children) ? (
    <Text style={labelStyle}>{children}</Text>
  ) : (
    React.Children.map(children, (child) =>
      typeof child === "string" || typeof child === "number" ? (
        <Text style={labelStyle}>{child}</Text>
      ) : (
        child
      ),
    )
  );

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      disabled={isInactive}
      accessibilityRole="button"
      accessibilityState={{ disabled: isInactive, busy: loading }}
      accessibilityLabel={accessibilityLabel}
      className={cn(className)}
      style={[
        {
          // NativeWind className만으로는 실기기에서 정렬이 깨질 수 있어 style로 고정
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: resolveButtonRound(round),
          backgroundColor: colorStyles.backgroundColor,
          borderColor: colorStyles.borderColor,
          borderWidth: colorStyles.borderWidth,
          opacity: isInactive ? 0.5 : pressed ? 0.85 : 1,
          gap: iconOnly ? 0 : buttonIconGap,
          ...(isCircular
            ? {
                width: circular.width,
                height: circular.height,
                minWidth: circular.width,
                minHeight: circular.height,
                paddingHorizontal: 0,
                paddingVertical: 0,
              }
            : {
                minHeight: sizeMeta.minHeight,
                paddingHorizontal: sizeMeta.paddingHorizontal,
                paddingVertical: sizeMeta.paddingVertical,
              }),
        },
        style,
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: iconOnly ? 0 : buttonIconGap,
          opacity: loading ? 0 : 1,
        }}
      >
        {content}
      </View>
      {loading && <LoadingDots color={colorStyles.textColor} size={size} />}
    </Pressable>
  );
}

export type { ButtonColor, ButtonRound, ButtonSize, ButtonVariant };
