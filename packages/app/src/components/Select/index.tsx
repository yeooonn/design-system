import React, { useMemo, useState } from "react";
import {
  View,
  useWindowDimensions,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { cn } from "../../utils/cn";
import {
  FIELD_DISABLED_OPACITY,
  resolveFieldState,
  resolveFieldTokens,
  type FieldSize,
  type FieldVariant,
} from "../_shared/fieldStyles";
import { FieldDescription, FieldLabel } from "./FieldMeta";
import { SelectSheet } from "./SelectSheet";
import { SelectTrigger } from "./SelectTrigger";
import { useSelectSheetAnimation } from "./useSelectSheetAnimation";

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectSize = FieldSize;
export type SelectVariant = FieldVariant;

export type SelectProps = {
  variant?: SelectVariant;
  size?: SelectSize;
  label?: string;
  options?: SelectOption[];
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
};

export function Select({
  variant = "box",
  size = "md",
  label,
  options = [],
  placeholder = "선택하세요",
  error = false,
  helperText,
  errorMessage,
  disabled = false,
  value,
  defaultValue,
  onValueChange,
  className,
  style,
  accessibilityLabel,
}: SelectProps) {
  const { theme } = useTheme();
  const { height: windowHeight } = useWindowDimensions();

  // 시트 열림 여부
  const [open, setOpen] = useState(false);

  // value prop 없으면 uncontrolled — 내부 state로 선택값 관리
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const selectedValue = value ?? internalValue;
  const selectedOption = useMemo(
    () => options.find((option) => option.value === selectedValue),
    [options, selectedValue],
  );

  // 닫힘 애니메이션 후 Modal unmount (mounted)
  const { mounted, backdropAnimatedStyle, sheetAnimatedStyle } =
    useSelectSheetAnimation(open, windowHeight);

  // 필드 메타·상태 규칙
  const hasError = error || Boolean(errorMessage);
  const showErrorMessage = hasError && Boolean(errorMessage);
  const description = showErrorMessage ? errorMessage : helperText;
  // 시트가 열리면 트리거를 focus 스타일로 표시
  const isFieldActive = open;
  const state = resolveFieldState({
    disabled,
    error: hasError,
    focused: isFieldActive,
  });
  const {
    tokens,
    sizeStyles,
    borderRadius: fieldRadius,
    borderWidth: fieldBorderWidth,
    messageHelperColor,
    messageErrorColor,
  } = resolveFieldTokens(variant, size, theme, state);

  const metaLineHeight = Math.round(sizeStyles.labelFontSize * 1.5);

  const closeSheet = () => setOpen(false);

  const selectValue = (next: string) => {
    if (value === undefined) setInternalValue(next);
    onValueChange?.(next);
    closeSheet();
  };

  return (
    <View
      className={cn(className)}
      style={[
        {
          width: "100%",
          flexDirection: "column",
          opacity: disabled ? FIELD_DISABLED_OPACITY : 1,
        },
        style,
      ]}
    >
      <FieldLabel
        label={label}
        fontSize={sizeStyles.labelFontSize}
        lineHeight={metaLineHeight}
        color={tokens.labelColor}
      />

      <SelectTrigger
        variant={variant}
        size={size}
        disabled={disabled}
        open={open}
        placeholder={placeholder}
        selectedOption={selectedOption}
        accessibilityLabel={accessibilityLabel ?? label ?? placeholder}
        tokens={tokens}
        sizeStyles={sizeStyles}
        fieldRadius={fieldRadius}
        fieldBorderWidth={fieldBorderWidth}
        onPress={() => setOpen(true)}
      />

      <FieldDescription
        description={description}
        fontSize={sizeStyles.labelFontSize}
        lineHeight={metaLineHeight}
        color={showErrorMessage ? messageErrorColor : messageHelperColor}
      />

      <SelectSheet
        mounted={mounted}
        sheetTitle={label ?? placeholder}
        options={options}
        selectedValue={selectedValue}
        fontSize={sizeStyles.fontSize}
        theme={theme}
        backdropAnimatedStyle={backdropAnimatedStyle}
        sheetAnimatedStyle={sheetAnimatedStyle}
        onClose={closeSheet}
        onSelect={selectValue}
      />
    </View>
  );
}
