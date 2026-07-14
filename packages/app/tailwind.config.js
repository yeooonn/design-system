const {
  colors,
  spacing,
  borderRadius,
} = require("@yeoooonn/ds-tokens");

/** 앱용 타입 스케일 (packages/app/src/tokens/typography.ts 와 동기화) */
const fontSize = {
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
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        blue: colors.blue,
        green: colors.green,
        red: colors.red,
        orange: colors.orange,
        yellow: colors.yellow,
        gray: colors.gray,
        success: colors.success,
        warning: colors.warning,
        error: colors.error,
        white: colors.white,
        black: colors.black,
        transparent: colors.transparent,
      },
      spacing: {
        0: spacing[0],
        1: spacing[1],
        2: spacing[2],
        3: spacing[3],
        4: spacing[4],
        5: spacing[5],
        6: spacing[6],
        7: spacing[7],
        8: spacing[8],
        10: spacing[10],
        12: spacing[12],
        16: spacing[16],
        20: spacing[20],
      },
      borderRadius: {
        none: borderRadius.none,
        sm: borderRadius.sm,
        md: borderRadius.md,
        lg: borderRadius.lg,
        xl: borderRadius.xl,
        full: borderRadius.full,
      },
      fontSize: {
        xs: fontSize.xs,
        sm: fontSize.sm,
        md: fontSize.md,
        lg: fontSize.lg,
        xl: fontSize.xl,
        "2xl": fontSize["2xl"],
        "3xl": fontSize["3xl"],
        "4xl": fontSize["4xl"],
        "5xl": fontSize["5xl"],
        "6xl": fontSize["6xl"],
      },
    },
  },
  plugins: [],
};
