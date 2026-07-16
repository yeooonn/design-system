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

type IconProps = {
  src: string;
  size: IconSize;
  color?: IconColor;
};

export function Icon({ src, size, color }: IconProps) {
  const { theme } = useTheme();
  const iconSize = iconSizes[size];

  return (
    <span
      aria-hidden
      style={{
        display: "inline-flex",
        ...(color
          ? { color: resolveIconColor(color, theme) }
          : { color: theme.text.primary }),
        width: iconSize,
        height: iconSize,
        flexShrink: 0,
        backgroundColor: "currentColor",
        maskImage: `url(${src})`,
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskImage: `url(${src})`,
        WebkitMaskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
      }}
    />
  );
}
