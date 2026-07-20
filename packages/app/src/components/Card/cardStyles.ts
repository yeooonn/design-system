import { Platform, type ViewStyle } from "react-native";
import type { Theme } from "@yeoooonn/ds-tokens";

const CARD_BOX_SHADOW_LIGHT =
  "0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.06)";
const CARD_BOX_SHADOW_DARK =
  "0 12px 32px rgba(0, 0, 0, 0.55), 0 4px 12px rgba(0, 0, 0, 0.35)";

function isDarkTheme(theme: Theme): boolean {
  return theme.surface.elevated.borderWidth > 0;
}

export function resolveCardShadowStyle(theme: Theme): ViewStyle {
  const isDark = isDarkTheme(theme);

  if (Platform.OS === "web") {
    return {
      boxShadow: isDark ? CARD_BOX_SHADOW_DARK : CARD_BOX_SHADOW_LIGHT,
    } as ViewStyle;
  }

  return {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: isDark ? 8 : 4 },
    shadowOpacity: isDark ? 0.55 : 0.12,
    shadowRadius: isDark ? 20 : 8,
    elevation: isDark ? 10 : 4,
  };
}
