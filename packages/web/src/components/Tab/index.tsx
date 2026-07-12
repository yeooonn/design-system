import React, {
  Children,
  cloneElement,
  isValidElement,
  useLayoutEffect,
  useRef,
  useState,
  type ReactElement,
} from "react";
import { useTheme } from "../../theme/ThemeProvider";
import { resolveTabStyles, type TabSize } from "./tabStyles";

const TAB_SCROLLBAR_HIDE_STYLE = `
[data-ds-tab-scroll]::-webkit-scrollbar {
  display: none;
}
`;

type TabProps = {
  children: React.ReactNode;
  size?: TabSize;
  onChange?: (index: number) => void;
  className?: string;
  style?: React.CSSProperties;
};

type TabItemProps = {
  children: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  size?: TabSize;
  className?: string;
  style?: React.CSSProperties;
};

type TabItemInjectedProps = {
  size?: TabSize;
  onSelect?: () => void;
  itemRef?: (node: HTMLButtonElement | null) => void;
};

type IndicatorRect = {
  left: number;
  width: number;
};

function TabItem({
  children,
  selected = false,
  disabled = false,
  size = "md",
  onSelect,
  itemRef,
  className,
  style,
}: TabItemProps & TabItemInjectedProps) {
  const { theme, colorScheme } = useTheme();
  const styles = resolveTabStyles(theme, colorScheme, size);

  return (
    <button
      ref={itemRef}
      type="button"
      role="tab"
      aria-selected={selected}
      disabled={disabled}
      className={className}
      style={{
        ...styles.item,
        ...(selected ? styles.itemSelected : null),
        ...(disabled ? styles.itemDisabled : null),
        ...style,
      }}
      onClick={() => {
        if (disabled) return;
        onSelect?.();
      }}
    >
      {children}
    </button>
  );
}

function isTabItemElement(
  child: React.ReactNode,
): child is ReactElement<TabItemProps & TabItemInjectedProps> {
  return isValidElement(child) && child.type === TabItem;
}

function getSelectedIndex(children: React.ReactNode): number {
  let selectedIndex = -1;

  Children.forEach(children, (child, index) => {
    if (isTabItemElement(child) && child.props.selected) {
      selectedIndex = index;
    }
  });

  return selectedIndex;
}

function TabRoot({
  children,
  size = "md",
  onChange,
  className,
  style,
}: TabProps) {
  const { theme, colorScheme } = useTheme();
  const styles = resolveTabStyles(theme, colorScheme);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [indicator, setIndicator] = useState<IndicatorRect>({
    left: 0,
    width: 0,
  });
  const [hasMeasured, setHasMeasured] = useState(false);
  const selectedIndex = getSelectedIndex(children);

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const selectedItem = itemRefs.current[selectedIndex];
      if (!selectedItem) {
        setIndicator({ left: 0, width: 0 });
        return;
      }

      setIndicator({
        left: selectedItem.offsetLeft,
        width: selectedItem.offsetWidth,
      });
      setHasMeasured(true);
    };

    updateIndicator();

    const list = listRef.current;
    if (!list || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(updateIndicator);
    observer.observe(list);

    return () => observer.disconnect();
  }, [selectedIndex, children, size]);

  useLayoutEffect(() => {
    const selectedItem = itemRefs.current[selectedIndex];
    if (!selectedItem) return;

    selectedItem.scrollIntoView({
      inline: "nearest",
      block: "nearest",
      behavior: "smooth",
    });
  }, [selectedIndex]);

  return (
    <div
      ref={listRef}
      role="tablist"
      data-ds-tab-scroll=""
      className={className}
      style={{ ...styles.list, ...style }}
    >
      <style>{TAB_SCROLLBAR_HIDE_STYLE}</style>
      <div style={styles.listInner}>
        <span aria-hidden style={styles.track} />
        <span
          aria-hidden
          style={{
            ...styles.indicator,
            left: indicator.left,
            width: indicator.width,
            opacity: indicator.width > 0 ? 1 : 0,
            transition: hasMeasured
              ? "left 0.2s ease, width 0.2s ease, opacity 0.2s ease"
              : "none",
          }}
        />
        {Children.map(children, (child, index) => {
          if (!isTabItemElement(child)) return child;

          return cloneElement(child, {
            size: child.props.size ?? size,
            onSelect: () => onChange?.(index),
            itemRef: (node) => {
              itemRefs.current[index] = node;
            },
          });
        })}
      </div>
    </div>
  );
}

export const Tab = Object.assign(TabRoot, {
  Item: TabItem,
});
