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
  field: {
    background: {
      default: colors.white,
      disabled: colors.gray[100],
      error: colors.red[50],
      focus: colors.primary[50],
    },
  },
  overlay: {
    backdrop: 'rgba(17, 24, 39, 0.45)',
  },
  surface: {
    elevated: {
      background: colors.white,
      borderWidth: 0,
    },
    toast: colors.white,
    tooltip: colors.white,
  },
  switch: {
    track: {
      disabled: colors.gray[200],
      unchecked: colors.gray[300],
      error: colors.red[200],
    },
  },
  focusRing: {
    primary: 'rgba(49, 130, 246, 0.24)',
    error: 'rgba(243, 66, 66, 0.24)',
  },
  skeleton: {
    background: colors.gray[100],
  },
  avatar: {
    background: colors.primary[100],
    text: colors.primary[700],
  },
  chip: {
    disabled: {
      background: colors.gray[100],
      text: colors.gray[400],
    },
    gray: {
      background: colors.gray[100],
      text: colors.gray[700],
    },
  },
  button: {
    neutral: {
      filled: colors.gray[500],
      text: colors.gray[500],
    },
    danger: {
      filled: colors.error[400],
    },
  },
} as const;

export const darkTheme = {
  background: {
    primary: colors.dark.background.primary,
    secondary: colors.dark.background.secondary,
    tertiary: colors.dark.background.tertiary,
  },
  text: {
    primary: colors.dark.text.primary,
    secondary: colors.dark.text.secondary,
    tertiary: colors.dark.text.tertiary,
    inverse: colors.white,
  },
  border: {
    default: colors.dark.border.default,
    strong: colors.dark.border.strong,
  },
  action: {
    primary: colors.dark.action.primary,
    primaryHover: colors.dark.action.primaryHover,
    primaryDisabled: colors.dark.action.primaryDisabled,
  },
  status: {
    success: colors.success[500],
    warning: colors.warning[500],
    error: colors.error[500],
  },
  field: {
    background: {
      default: colors.dark.background.secondary,
      disabled: colors.dark.background.secondary,
      error: 'rgba(243, 66, 66, 0.12)',
      focus: 'rgba(49, 130, 246, 0.12)',
    },
  },
  overlay: {
    backdrop: 'rgba(0, 0, 0, 0.55)',
  },
  surface: {
    elevated: {
      background: colors.dark.background.secondary,
      borderWidth: 1,
    },
    toast: colors.dark.background.tertiary,
    tooltip: colors.dark.background.tertiary,
  },
  switch: {
    track: {
      disabled: colors.dark.background.tertiary,
      unchecked: colors.dark.border.strong,
      error: 'rgba(243, 66, 66, 0.4)',
    },
  },
  focusRing: {
    primary: 'rgba(49, 130, 246, 0.24)',
    error: 'rgba(243, 66, 66, 0.24)',
  },
  skeleton: {
    background: colors.dark.background.secondary,
  },
  avatar: {
    background: colors.primary[800],
    text: colors.primary[200],
  },
  chip: {
    disabled: {
      background: colors.dark.background.tertiary,
      text: colors.dark.text.tertiary,
    },
    gray: {
      background: colors.dark.background.secondary,
      text: colors.dark.text.secondary,
    },
  },
  button: {
    neutral: {
      filled: colors.dark.background.tertiary,
      text: colors.dark.text.secondary,
    },
    danger: {
      filled: colors.error[500],
    },
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
  field: {
    background: {
      default: string;
      disabled: string;
      error: string;
      focus: string;
    };
  };
  overlay: {
    backdrop: string;
  };
  surface: {
    elevated: {
      background: string;
      borderWidth: number;
    };
    toast: string;
    tooltip: string;
  };
  switch: {
    track: {
      disabled: string;
      unchecked: string;
      error: string;
    };
  };
  focusRing: {
    primary: string;
    error: string;
  };
  skeleton: {
    background: string;
  };
  avatar: {
    background: string;
    text: string;
  };
  chip: {
    disabled: {
      background: string;
      text: string;
    };
    gray: {
      background: string;
      text: string;
    };
  };
  button: {
    neutral: {
      filled: string;
      text: string;
    };
    danger: {
      filled: string;
    };
  };
}
