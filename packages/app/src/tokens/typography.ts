/**
 * 앱(RN)용 타입 스케일.
 * 공유 tokens(web)과 분리 — 모바일 가독성 기준으로 +2~4 상향.
 * Caption 최소 12, 본문 16.
 */
export const appFontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  "2xl": 22,
  "3xl": 26,
  "4xl": 30,
  "5xl": 34,
  "6xl": 40,
} as const;

export const appTextStyles = {
  H1: {
    fontSize: appFontSize["4xl"],
    fontWeight: "700" as const,
    lineHeight: 1.2,
    letterSpacing: -0.5,
  },
  H2: {
    fontSize: appFontSize["3xl"],
    fontWeight: "700" as const,
    lineHeight: 1.2,
    letterSpacing: -0.5,
  },
  H3: {
    fontSize: appFontSize["2xl"],
    fontWeight: "600" as const,
    lineHeight: 1.2,
    letterSpacing: 0,
  },
  P1: {
    fontSize: appFontSize.md,
    fontWeight: "400" as const,
    lineHeight: 1.5,
    letterSpacing: 0,
  },
  P2: {
    fontSize: appFontSize.sm,
    fontWeight: "400" as const,
    lineHeight: 1.5,
    letterSpacing: 0,
  },
  Label: {
    fontSize: appFontSize.sm,
    fontWeight: "500" as const,
    lineHeight: 1.5,
    letterSpacing: 0,
  },
  Caption: {
    fontSize: appFontSize.xs,
    fontWeight: "400" as const,
    lineHeight: 1.5,
    letterSpacing: 0,
  },
} as const;

export type AppFontSizeKey = keyof typeof appFontSize;
export type AppTextStyleKey = keyof typeof appTextStyles;
