import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, fontSize, fontWeight, spacing, borderRadius } from '@yeoooonn/ds-tokens';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={[
        styles.base,
        styles[`variant_${variant}`],
        styles[`size_${size}`],
        (disabled || loading) && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? colors.white : colors.primary[600]}
        />
      ) : (
        <Text style={[styles.label, styles[`label_${variant}`], styles[`labelSize_${size}`]]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  variant_primary: {
    backgroundColor: colors.primary[600],
  },
  variant_secondary: {
    backgroundColor: colors.transparent,
    borderWidth: 1.5,
    borderColor: colors.primary[600],
  },
  variant_ghost: {
    backgroundColor: colors.transparent,
  },
  size_sm: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    minHeight: 32,
  },
  size_md: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    minHeight: 44,
  },
  size_lg: {
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[3],
    minHeight: 52,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontWeight: fontWeight.semibold,
  },
  label_primary: {
    color: colors.white,
  },
  label_secondary: {
    color: colors.primary[600],
  },
  label_ghost: {
    color: colors.primary[600],
  },
  labelSize_sm: {
    fontSize: fontSize.sm,
  },
  labelSize_md: {
    fontSize: fontSize.md,
  },
  labelSize_lg: {
    fontSize: fontSize.lg,
  },
});
