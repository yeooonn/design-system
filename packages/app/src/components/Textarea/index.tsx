import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  TextInput,
  View,
  type NativeSyntheticEvent,
  type StyleProp,
  type TextInputFocusEventData,
  type TextInputProps,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { spacing } from "@yeoooonn/ds-tokens";
import { useTheme } from "../../theme/ThemeProvider";
import { useKeyboardBottomInset } from "../../hooks/useKeyboardBottomInset";
import { useKeyboardScroll } from "../../hooks/KeyboardScrollContext";
import { FIELD_DISABLED_OPACITY } from "../_shared/fieldStyles";
import {
  resolveTextareaState,
  resolveTextareaTokens,
  type TextareaSize,
} from "./textareaStyles";

const COUNT_RESERVED_HEIGHT = 24;
const KEYBOARD_SCROLL_GAP = 24;
const KEYBOARD_SCROLL_DELAY_MS = 50;

export type TextareaProps = Omit<TextInputProps, "style" | "multiline"> & {
  size?: TextareaSize;
  label?: string;
  error?: boolean;
  disabled?: boolean;
  showCount?: boolean;
  count?: number;
  countMax?: number;
  countUnit?: string;
  isCountExceeded?: boolean;
  countOverMessage?: string;
  showExample?: boolean;
  exampleText?: Exclude<React.ReactNode, string | number | boolean>;
  style?: StyleProp<ViewStyle>;
};

type TextareaLabelProps = {
  label?: string;
  labelFontSize: number;
  labelColor: string;
  metaLineHeight: number;
};

function TextareaLabel({
  label,
  labelFontSize,
  labelColor,
  metaLineHeight,
}: TextareaLabelProps) {
  if (!label) return null;

  return (
    <View style={{ minHeight: metaLineHeight, marginBottom: spacing[1] }}>
      <Text
        style={{
          fontSize: labelFontSize,
          color: labelColor,
          lineHeight: metaLineHeight,
        }}
      >
        {label}
      </Text>
    </View>
  );
}

type TextareaExampleOverlayProps = {
  showExample: boolean;
  exampleText?: Exclude<React.ReactNode, string | number | boolean>;
  paddingInline: number;
  paddingBlock: number;
};

function TextareaExampleOverlay({
  showExample,
  exampleText,
  paddingInline,
  paddingBlock,
}: TextareaExampleOverlayProps) {
  if (!showExample || !exampleText) return null;

  return (
    <View
      pointerEvents="none"
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        paddingHorizontal: paddingInline,
        paddingTop: paddingBlock,
      }}
    >
      {exampleText}
    </View>
  );
}

type TextareaInputControlProps = Omit<
  TextInputProps,
  "style" | "multiline" | "editable"
> & {
  isEditable: boolean;
  inputTextStyle: TextStyle;
  displayValue: string;
  placeholderColor: string;
  fontSize: number;
  onFocus?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
};

function TextareaInputControl({
  isEditable,
  inputTextStyle,
  displayValue,
  placeholder,
  placeholderColor,
  fontSize,
  value,
  defaultValue,
  onFocus,
  onBlur,
  ...textareaProps
}: TextareaInputControlProps) {
  if (!isEditable) {
    return (
      <Text
        style={{
          ...inputTextStyle,
          lineHeight: Math.round(fontSize * 1.4),
        }}
      >
        {displayValue || (
          <Text style={{ color: placeholderColor }}>{placeholder}</Text>
        )}
      </Text>
    );
  }

  return (
    <TextInput
      {...textareaProps}
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      multiline
      textAlignVertical="top"
      editable
      placeholderTextColor={placeholderColor}
      style={{
        ...inputTextStyle,
        flex: 1,
        padding: 0,
        margin: 0,
      }}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
}

type TextareaCountBadgeProps = {
  showCount: boolean;
  labelFontSize: number;
  countColor: string;
  countLimitColor: string;
  count: number;
  countMax: number;
  countUnit: string;
};

function TextareaCountBadge({
  showCount,
  labelFontSize,
  countColor,
  countLimitColor,
  count,
  countMax,
  countUnit,
}: TextareaCountBadgeProps) {
  if (!showCount) return null;

  return (
    <View
      style={{
        position: "absolute",
        bottom: 8,
        right: 12,
        flexDirection: "row",
      }}
    >
      <Text style={{ fontSize: labelFontSize, color: countColor }}>{count}</Text>
      <Text style={{ fontSize: labelFontSize, color: countLimitColor }}>
        {" "}
        / {countMax}
        {countUnit}
      </Text>
    </View>
  );
}

type TextareaCountExceededMessageProps = {
  isCountExceeded: boolean;
  warningMessage: string;
  labelFontSize: number;
  countWarningColor: string;
};

function TextareaCountExceededMessage({
  isCountExceeded,
  warningMessage,
  labelFontSize,
  countWarningColor,
}: TextareaCountExceededMessageProps) {
  if (!isCountExceeded) return null;

  return (
    <Text
      style={{
        marginTop: spacing[1],
        fontSize: labelFontSize,
        color: countWarningColor,
      }}
    >
      {warningMessage}
    </Text>
  );
}

type TextareaFieldProps = {
  fieldRef: React.Ref<View>;
  showCount: boolean;
  minHeight: number;
  paddingInline: number;
  paddingBlock: number;
  borderRadius: number;
  borderWidth: number;
  borderColor: string;
  backgroundColor: string;
  children: React.ReactNode;
};

function TextareaField({
  fieldRef,
  showCount,
  minHeight,
  paddingInline,
  paddingBlock,
  borderRadius,
  borderWidth,
  borderColor,
  backgroundColor,
  children,
}: TextareaFieldProps) {
  return (
    <View
      ref={fieldRef}
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        minHeight,
        paddingHorizontal: paddingInline,
        paddingVertical: paddingBlock,
        paddingBottom: showCount
          ? paddingBlock + COUNT_RESERVED_HEIGHT
          : paddingBlock,
        borderRadius,
        borderWidth,
        borderColor,
        backgroundColor,
      }}
    >
      {children}
    </View>
  );
}

export function Textarea({
  size = "md",
  label,
  error = false,
  disabled = false,
  editable,
  showCount = false,
  count = 0,
  countMax = 90,
  countUnit = "byte",
  isCountExceeded = false,
  countOverMessage,
  showExample = false,
  exampleText,
    style,
  onFocus,
  onBlur,
  value,
  defaultValue,
  placeholder,
  ...textareaProps
}: TextareaProps) {
  const { theme } = useTheme();
  const fieldRef = useRef<View>(null);
  const keyboardScroll = useKeyboardScroll();
  const [focused, setFocused] = useState(false);
  // editable=false는 입력만 막고, disabled 시각 스타일과 분리 (web readOnly와 동일)
  const isEditable = !disabled && editable !== false;
  const hasError = error || isCountExceeded;
  const warningMessage =
    countOverMessage ?? `최대 ${countMax}${countUnit}를 초과했습니다.`;
  const keyboardInset = useKeyboardBottomInset(focused && isEditable);

  const state = resolveTextareaState({
    disabled,
    error: hasError,
    focused,
  });
  const {
    tokens,
    sizeStyles,
    borderRadius,
    borderWidth,
    countColor,
    countLimitColor,
    countWarningColor,
  } = resolveTextareaTokens(size, theme, state, {
    countExceeded: isCountExceeded,
  });
  const metaLineHeight = Math.round(sizeStyles.labelFontSize * 1.5);
  const displayValue =
    value != null
      ? String(value)
      : defaultValue != null
        ? String(defaultValue)
        : "";

  useEffect(() => {
    if (!focused || !isEditable || keyboardInset <= 0) return;
    const timer = setTimeout(() => {
      keyboardScroll?.ensureVisible(
        fieldRef,
        keyboardInset,
        KEYBOARD_SCROLL_GAP,
      );
    }, KEYBOARD_SCROLL_DELAY_MS);
    return () => clearTimeout(timer);
  }, [focused, isEditable, keyboardInset, keyboardScroll]);

  const inputMinHeight = sizeStyles.minHeight - sizeStyles.paddingBlock * 2;
  const inputTextStyle: TextStyle = {
    minHeight: inputMinHeight,
    color: tokens.color,
    fontSize: sizeStyles.fontSize,
  };

  return (
    <View
      style={[
        {
          width: "100%",
          flexDirection: "column",
          opacity: disabled ? FIELD_DISABLED_OPACITY : 1,
        },
        style,
      ]}
    >
      <TextareaLabel
        label={label}
        labelFontSize={sizeStyles.labelFontSize}
        labelColor={tokens.labelColor}
        metaLineHeight={metaLineHeight}
      />

      <TextareaField
        fieldRef={fieldRef}
        showCount={showCount}
        minHeight={sizeStyles.minHeight}
        paddingInline={sizeStyles.paddingInline}
        paddingBlock={sizeStyles.paddingBlock}
        borderRadius={borderRadius}
        borderWidth={borderWidth}
        borderColor={tokens.borderColor}
        backgroundColor={tokens.backgroundColor}
      >
        <TextareaExampleOverlay
          showExample={showExample}
          exampleText={exampleText}
          paddingInline={sizeStyles.paddingInline}
          paddingBlock={sizeStyles.paddingBlock}
        />
        <TextareaInputControl
          {...textareaProps}
          isEditable={isEditable}
          inputTextStyle={inputTextStyle}
          displayValue={displayValue}
          placeholder={placeholder}
          placeholderColor={tokens.placeholderColor}
          fontSize={sizeStyles.fontSize}
          value={value}
          defaultValue={defaultValue}
          onFocus={(event) => {
            setFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            onBlur?.(event);
          }}
        />
        <TextareaCountBadge
          showCount={showCount}
          labelFontSize={sizeStyles.labelFontSize}
          countColor={countColor}
          countLimitColor={countLimitColor}
          count={count}
          countMax={countMax}
          countUnit={countUnit}
        />
      </TextareaField>

      <TextareaCountExceededMessage
        isCountExceeded={isCountExceeded}
        warningMessage={warningMessage}
        labelFontSize={sizeStyles.labelFontSize}
        countWarningColor={countWarningColor}
      />
    </View>
  );
}

export type { TextareaSize };
