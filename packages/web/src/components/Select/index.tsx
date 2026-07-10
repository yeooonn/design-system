import React, {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { useTheme } from "../../theme/ThemeProvider";
import {
  resolveSelectListStyles,
  resolveSelectState,
  resolveSelectStyles,
  type SelectSize,
  type SelectVariant,
} from "./selectStyles";

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type SelectChangeEvent = {
  target: {
    value: string;
    name?: string;
  };
};

type SelectProps = {
  variant?: SelectVariant;
  size?: SelectSize;
  label?: string;
  options?: SelectOption[];
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  name?: string;
  value?: string;
  defaultValue?: string;
  required?: boolean;
  autoFocus?: boolean;
  onChange?: (event: SelectChangeEvent) => void;
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
};

type SelectListStyles = ReturnType<typeof resolveSelectListStyles>;

const ICON_SIZE: Record<SelectSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
};

function ChevronIcon({ size }: { size: SelectSize }) {
  const iconSize = ICON_SIZE[size];

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon({ size }: { size: SelectSize }) {
  const iconSize = ICON_SIZE[size];

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M5 12.5L10 17.5L19 6.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getInitialValue(
  value: string | undefined,
  defaultValue: string | undefined,
) {
  if (value !== undefined) return value;
  if (defaultValue !== undefined) return defaultValue;
  return "";
}

function isEnabledOption(option: SelectOption | undefined) {
  return Boolean(option) && !option?.disabled;
}

/** 키보드 이동 시 disabled를 건너뛰며 순환한다. */
function findNextEnabledIndex(
  options: SelectOption[],
  startIndex: number,
  direction: 1 | -1,
) {
  if (options.length === 0) return -1;

  let index = startIndex;

  for (let step = 0; step < options.length; step += 1) {
    index = (index + direction + options.length) % options.length;
    if (isEnabledOption(options[index])) return index;
  }

  return -1;
}

function findFirstEnabledIndex(options: SelectOption[]) {
  return options.findIndex((option) => !option.disabled);
}

function findLastEnabledIndex(options: SelectOption[]) {
  for (let index = options.length - 1; index >= 0; index -= 1) {
    if (isEnabledOption(options[index])) return index;
  }
  return -1;
}

function resolveOpenHighlightedIndex(
  options: SelectOption[],
  selectedValue: string,
  preferredIndex?: number,
) {
  if (preferredIndex !== undefined) return preferredIndex;

  const selectedIndex = options.findIndex(
    (option) => option.value === selectedValue,
  );
  if (isEnabledOption(options[selectedIndex])) return selectedIndex;

  return findFirstEnabledIndex(options);
}

function resolveOptionStyle(
  listStyles: SelectListStyles,
  {
    isSelected,
    isHighlighted,
    disabled,
  }: {
    isSelected: boolean;
    isHighlighted: boolean;
    disabled?: boolean;
  },
): React.CSSProperties {
  return {
    ...listStyles.option,
    ...(isSelected ? listStyles.optionSelected : null),
    ...(isHighlighted && !disabled ? listStyles.optionHighlighted : null),
    ...(disabled ? listStyles.optionDisabled : null),
  };
}

function SelectOptionItem({
  option,
  optionId,
  size,
  isSelected,
  isHighlighted,
  listStyles,
  onHighlight,
  onSelect,
}: {
  option: SelectOption;
  optionId: string;
  size: SelectSize;
  isSelected: boolean;
  isHighlighted: boolean;
  listStyles: SelectListStyles;
  onHighlight: () => void;
  onSelect: () => void;
}) {
  return (
    <li
      id={optionId}
      role="option"
      aria-selected={isSelected}
      aria-disabled={option.disabled || undefined}
      style={resolveOptionStyle(listStyles, {
        isSelected,
        isHighlighted,
        disabled: option.disabled,
      })}
      onMouseEnter={() => {
        if (!option.disabled) onHighlight();
      }}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onSelect}
    >
      <span style={listStyles.optionLabel}>{option.label}</span>
      {isSelected && (
        <span
          style={{
            ...listStyles.checkIcon,
            color: listStyles.checkIconColor,
          }}
        >
          <CheckIcon size={size} />
        </span>
      )}
    </li>
  );
}

export function Select({
  variant = "box",
  size = "md",
  label,
  options = [],
  placeholder,
  error = false,
  helperText,
  errorMessage,
  disabled = false,
  id,
  className,
  style,
  name,
  value,
  defaultValue,
  required = false,
  autoFocus = false,
  onChange,
  onFocus,
  onBlur,
}: SelectProps) {
  const { theme, colorScheme } = useTheme();
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const labelId = `${selectId}-label`;
  const listboxId = `${selectId}-listbox`;
  const descriptionId = `${selectId}-description`;
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);

  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(() =>
    getInitialValue(value, defaultValue),
  );
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const isControlled = value !== undefined;
  const selectedValue = isControlled ? value : internalValue;
  const selectedOption = options.find(
    (option) => option.value === selectedValue,
  );
  const hasSelection = Boolean(selectedOption);
  const displayLabel = selectedOption?.label ?? placeholder ?? "";

  const hasError = error || Boolean(errorMessage);
  const showErrorMessage = hasError && Boolean(errorMessage);
  const description = showErrorMessage ? errorMessage : helperText;

  const state = resolveSelectState({
    disabled,
    error: hasError,
    focused: focused || open,
  });
  const styles = resolveSelectStyles(
    variant,
    size,
    theme,
    colorScheme,
    state,
    open,
  );
  const listStyles = resolveSelectListStyles(size, theme, colorScheme);

  useEffect(() => {
    if (isControlled) {
      setInternalValue(value);
    }
  }, [isControlled, value]);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setFocused(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    listboxRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!autoFocus || disabled) return;
    triggerRef.current?.focus();
  }, [autoFocus, disabled]);

  const emitChange = (nextValue: string) => {
    if (!isControlled) {
      setInternalValue(nextValue);
    }
    onChange?.({ target: { value: nextValue, name } });
  };

  const openListbox = (preferredHighlightedIndex?: number) => {
    if (disabled) return;

    setHighlightedIndex(
      resolveOpenHighlightedIndex(
        options,
        selectedValue,
        preferredHighlightedIndex,
      ),
    );
    setOpen(true);
  };

  const closeListbox = (shouldFocusTrigger = true) => {
    setOpen(false);
    setHighlightedIndex(-1);
    if (shouldFocusTrigger) {
      triggerRef.current?.focus();
    }
  };

  const selectOption = (option: SelectOption) => {
    if (option.disabled) return;
    emitChange(option.value);
    closeListbox();
  };

  const moveHighlight = (direction: 1 | -1) => {
    const fallbackIndex =
      direction === 1
        ? findFirstEnabledIndex(options)
        : findLastEnabledIndex(options);
    const startIndex =
      highlightedIndex < 0 ? fallbackIndex : highlightedIndex;
    const nextIndex = findNextEnabledIndex(options, startIndex, direction);

    if (nextIndex >= 0) setHighlightedIndex(nextIndex);
  };

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;

    switch (event.key) {
      case "ArrowDown":
      case "ArrowUp":
      case "Enter":
      case " ":
        event.preventDefault();
        openListbox(
          event.key === "ArrowUp" ? findLastEnabledIndex(options) : undefined,
        );
        break;
      case "Escape":
        if (open) {
          event.preventDefault();
          closeListbox();
        }
        break;
      default:
        break;
    }
  };

  const handleListboxKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (!open) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        moveHighlight(1);
        break;
      case "ArrowUp":
        event.preventDefault();
        moveHighlight(-1);
        break;
      case "Enter":
      case " ": {
        event.preventDefault();
        const option = options[highlightedIndex];
        if (option) selectOption(option);
        break;
      }
      case "Escape":
        event.preventDefault();
        closeListbox();
        break;
      case "Tab":
        closeListbox(false);
        break;
      default:
        break;
    }
  };

  const isFocusInsideRoot = (relatedTarget: EventTarget | null) =>
    rootRef.current?.contains(relatedTarget as Node) ?? false;

  return (
    <div className={className} style={{ ...styles.wrapper, ...style }}>
      {label && (
        <label id={labelId} htmlFor={selectId} style={styles.label}>
          {label}
        </label>
      )}
      <div ref={rootRef} style={styles.root}>
        <div style={styles.field}>
          <button
            ref={triggerRef}
            id={selectId}
            type="button"
            role="combobox"
            disabled={disabled}
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-controls={listboxId}
            aria-labelledby={label ? labelId : undefined}
            aria-invalid={hasError || undefined}
            aria-required={required || undefined}
            aria-describedby={description ? descriptionId : undefined}
            aria-activedescendant={
              open && highlightedIndex >= 0
                ? `${selectId}-option-${highlightedIndex}`
                : undefined
            }
            style={styles.trigger}
            onClick={() => (open ? closeListbox() : openListbox())}
            onKeyDown={handleTriggerKeyDown}
            onFocus={(event) => {
              setFocused(true);
              onFocus?.(event);
            }}
            onBlur={(event) => {
              if (!isFocusInsideRoot(event.relatedTarget)) {
                setFocused(false);
                onBlur?.(event);
              }
            }}
          >
            <span
              style={{
                ...styles.triggerLabel,
                color: hasSelection
                  ? styles.trigger.color
                  : styles.placeholderColor,
              }}
            >
              {displayLabel}
            </span>
            <span style={styles.chevron} aria-hidden>
              <ChevronIcon size={size} />
            </span>
          </button>
        </div>

        {open && options.length > 0 && (
          <ul
            ref={listboxRef}
            id={listboxId}
            role="listbox"
            aria-labelledby={label ? labelId : selectId}
            style={listStyles.listbox}
            onKeyDown={handleListboxKeyDown}
            tabIndex={-1}
          >
            {options.map((option, index) => (
              <SelectOptionItem
                key={option.value}
                option={option}
                optionId={`${selectId}-option-${index}`}
                size={size}
                isSelected={option.value === selectedValue}
                isHighlighted={index === highlightedIndex}
                listStyles={listStyles}
                onHighlight={() => setHighlightedIndex(index)}
                onSelect={() => selectOption(option)}
              />
            ))}
          </ul>
        )}

        {name && (
          <input
            type="hidden"
            name={name}
            value={selectedValue}
            required={required && !selectedValue}
          />
        )}
      </div>
      {description && (
        <p
          id={descriptionId}
          style={{
            ...styles.message,
            color: showErrorMessage
              ? styles.messageErrorColor
              : styles.messageHelperColor,
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
