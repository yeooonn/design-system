import { colors } from './colors';

export const lightTheme = {
  background: {
    primary: colors.white,
    secondary: colors.gray[50],
    tertiary: colors.gray[100],
  },
  text: {
    primary: colors.gray[900],
    secondary: colors.gray[600],
    tertiary: colors.gray[400],
    inverse: colors.white,
  },
  border: {
    default: colors.gray[200],
    strong: colors.gray[300],
  },
  action: {
    primary: colors.primary[600],
    primaryHover: colors.primary[700],
    primaryDisabled: colors.primary[300],
  },
  status: {
    success: colors.success[600],
    warning: colors.warning[600],
    error: colors.error[600],
  },
} as const;

export const darkTheme = {
  background: {
    primary: colors.gray[900],
    secondary: colors.gray[800],
    tertiary: colors.gray[700],
  },
  text: {
    primary: colors.white,
    secondary: colors.gray[300],
    tertiary: colors.gray[500],
    inverse: colors.gray[900],
  },
  border: {
    default: colors.gray[700],
    strong: colors.gray[600],
  },
  action: {
    primary: colors.primary[500],
    primaryHover: colors.primary[400],
    primaryDisabled: colors.primary[800],
  },
  status: {
    success: colors.success[500],
    warning: colors.warning[500],
    error: colors.error[500],
  },
} as const;

export interface Theme {
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    inverse: string;
  };
  border: {
    default: string;
    strong: string;
  };
  action: {
    primary: string;
    primaryHover: string;
    primaryDisabled: string;
  };
  status: {
    success: string;
    warning: string;
    error: string;
  };
}
