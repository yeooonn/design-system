import { View } from "react-native";
import { Image } from "expo-image";
import { type Theme } from "@yeoooonn/ds-tokens";
import { useTheme } from "../../theme/ThemeProvider";
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

/** Icon `primary` = brand action. 본문색은 color 생략(기본값)을 사용한다. */
function resolveIconColor(color: IconColor, theme: Theme): string {
  if (color === "primary") return theme.action.primary;
  return resolveTypographyColor(color, theme);
}

export type IconProps = {
  /** 단색 템플릿 이미지/SVG. tintColor로 색을 입힌다. */
  source: string | number | { uri: string };
  size?: IconSize;
  color?: IconColor;
  accessibilityLabel?: string;
};

/**
 * RN Image는 원격 SVG를 렌더하지 못해 실기기에서 아이콘이 비어 보일 수 있다.
 * expo-image로 SVG를 지원한다.
 */
export function Icon({
  source,
  size = "md",
  color,
    accessibilityLabel,
}: IconProps) {
  const { theme } = useTheme();
  const iconSize = iconSizes[size];
  const tintColor = color ? resolveIconColor(color, theme) : theme.text.primary;

  return (
    <View
      style={{
        width: iconSize,
        height: iconSize,
        flexShrink: 0,
        alignItems: "center",
        justifyContent: "center",
      }}
      accessible={Boolean(accessibilityLabel)}
      accessibilityLabel={accessibilityLabel}
      accessibilityElementsHidden={!accessibilityLabel}
      importantForAccessibility={
        accessibilityLabel ? "yes" : "no-hide-descendants"
      }
    >
      <Image
        source={source}
        style={{ width: iconSize, height: iconSize }}
        contentFit="contain"
        tintColor={tintColor}
      />
    </View>
  );
}
