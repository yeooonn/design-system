import React, {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ReactElement,
} from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  Text,
  View,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { borderWidth, fontWeight, spacing } from "@yeoooonn/ds-tokens";
import { appFontSize as fontSize } from "../../tokens/typography";
import { useTheme } from "../../theme/ThemeProvider";

export type TabSize = "sm" | "md" | "lg";

const tabSizeStyles: Record<
  TabSize,
  { paddingInline: number; paddingBlock: number; fontSize: number }
> = {
  sm: {
    paddingInline: spacing[3],
    paddingBlock: spacing[2],
    fontSize: fontSize.sm,
  },
  md: {
    paddingInline: spacing[4],
    paddingBlock: spacing[3],
    fontSize: fontSize.md,
  },
  lg: {
    paddingInline: spacing[5],
    paddingBlock: spacing[3],
    fontSize: fontSize.lg,
  },
};

type TabProps = {
  children: React.ReactNode;
  size?: TabSize;
  onChange?: (index: number) => void;
  style?: StyleProp<ViewStyle>;
};

type TabItemProps = {
  children: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  size?: TabSize;
  style?: StyleProp<ViewStyle>;
};

type TabItemInjectedProps = {
  size?: TabSize;
  onSelect?: () => void;
  onItemLayout?: (event: LayoutChangeEvent) => void;
};

type IndicatorRect = { left: number; width: number };

function TabItem({
  children,
  selected = false,
  disabled = false,
  size = "md",
  onSelect,
  onItemLayout,
    style,
}: TabItemProps & TabItemInjectedProps) {
  const { theme } = useTheme();
  const sizeStyles = tabSizeStyles[size];

  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{ selected, disabled }}
      disabled={disabled}
      onPress={() => {
        if (disabled) return;
        onSelect?.();
      }}
      onLayout={onItemLayout}
      style={[
        {
          flexShrink: 0,
          paddingHorizontal: sizeStyles.paddingInline,
          paddingVertical: sizeStyles.paddingBlock,
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
    >
      <Text
        style={{
          fontSize: sizeStyles.fontSize,
          fontWeight: (selected ? fontWeight.semibold : fontWeight.medium) as
            | "500"
            | "600",
          color: disabled
            ? theme.text.tertiary
            : selected
              ? theme.action.primary
              : theme.text.secondary,
        }}
      >
        {children}
      </Text>
    </Pressable>
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
    style,
}: TabProps) {
  const { theme } = useTheme();
  const itemLayouts = useRef<Array<{ x: number; width: number }>>([]);
  const [indicator, setIndicator] = useState<IndicatorRect>({
    left: 0,
    width: 0,
  });
  const leftAnim = useRef(new Animated.Value(0)).current;
  const widthAnim = useRef(new Animated.Value(0)).current;
  const selectedIndex = getSelectedIndex(children);

  const updateIndicator = (index: number) => {
    const layout = itemLayouts.current[index];
    if (!layout || layout.width <= 0) {
      setIndicator({ left: 0, width: 0 });
      return;
    }
    setIndicator({ left: layout.x, width: layout.width });
    Animated.parallel([
      Animated.timing(leftAnim, {
        toValue: layout.x,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(widthAnim, {
        toValue: layout.width,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  // 선택 변경 시 레이아웃이 다시 안 잡혀도 인디케이터를 이동 (web useLayoutEffect와 동일)
  useEffect(() => {
    updateIndicator(selectedIndex);
  }, [selectedIndex, size, children]);

  // 탭 아이템 레이아웃 변경 시 인디케이터 업데이트
  const handleItemLayout = (index: number) => (event: LayoutChangeEvent) => {
    const { x, width } = event.nativeEvent.layout;
    itemLayouts.current[index] = { x, width };
    if (index === selectedIndex) {
      updateIndicator(index);
    }
  };

  // 탭 아이템 컴포넌트 확장
  const enhanceTabItem = (
    child: ReactElement<TabItemProps & TabItemInjectedProps>,
    index: number,
  ) =>
    cloneElement(child, {
      size: child.props.size ?? size,
      onSelect: () => onChange?.(index),
      onItemLayout: handleItemLayout(index),
    });

  // 탭 아이템 컴포넌트 렌더링
  const renderTabChild = (child: React.ReactNode, index: number) => {
    if (!isTabItemElement(child)) return child;
    return enhanceTabItem(child, index);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[{ width: "100%" }, style]}
      accessibilityRole="tablist"
    >
      <View
        style={{
          position: "relative",
          minWidth: "100%",
          flexDirection: "row",
        }}
      >
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: borderWidth.thin,
            backgroundColor: theme.border.default,
          }}
        />
        <Animated.View
          pointerEvents="none"
          style={{
            position: "absolute",
            bottom: 0,
            left: leftAnim,
            width: widthAnim,
            height: borderWidth.thick,
            backgroundColor: theme.action.primary,
            opacity: indicator.width > 0 ? 1 : 0,
            zIndex: 2,
          }}
        />
        {Children.map(children, renderTabChild)}
      </View>
    </ScrollView>
  );
}

export const Tab = Object.assign(TabRoot, {
  Item: TabItem,
});
