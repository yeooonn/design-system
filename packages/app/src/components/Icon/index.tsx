import { Image, View, type ImageSourcePropType } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { cn } from "../../utils/cn";
import {
  resolveTypographyColor,
  type TypographyColor,
} from "../Typography/typographyStyles";

export type IconSize = "sm" | "md" | "lg";
export type IconColor = TypographyColor;

const iconSizes: Record<IconSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
};

export type IconProps = {
  /** 단색 템플릿 이미지. tintColor로 색을 입힌다. */
  source: ImageSourcePropType;
  size: IconSize;
  color?: IconColor;
  className?: string;
  accessibilityLabel?: string;
};

export function Icon({
  source,
  size,
  color,
  className,
  accessibilityLabel,
}: IconProps) {
  const { theme } = useTheme();
  const iconSize = iconSizes[size];
  // color 미지정 시 테마 본문색 (web의 currentColor 상속과 동일)
  const tintColor = color
    ? resolveTypographyColor(color, theme)
    : theme.text.primary;

  return (
    <View
      className={cn("shrink-0 items-center justify-center", className)}
      style={{ width: iconSize, height: iconSize }}
      accessible={Boolean(accessibilityLabel)}
      accessibilityLabel={accessibilityLabel}
      accessibilityElementsHidden={!accessibilityLabel}
      importantForAccessibility={
        accessibilityLabel ? "yes" : "no-hide-descendants"
      }
    >
      <Image
        source={source}
        style={{
          width: iconSize,
          height: iconSize,
          tintColor,
        }}
        resizeMode="contain"
      />
    </View>
  );
}
