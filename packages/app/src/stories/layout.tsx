import type { ReactNode } from "react";
import { ScrollView, View, type StyleProp, type ViewStyle } from "react-native";
import { Typography } from "../components/Typography";

type GapProps = {
  children: ReactNode;
  gap?: number;
  style?: StyleProp<ViewStyle>;
};

export function SubSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <View style={{ gap: 12 }}>
      <Typography.Label color="secondary">{title}</Typography.Label>
      {children}
    </View>
  );
}

export function Row({ children, gap = 12, style }: GapProps) {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "flex-start",
          gap,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function Stack({ children, gap = 12, style }: GapProps) {
  return <View style={[{ gap }, style]}>{children}</View>;
}

export function Field({
  children,
  width = 240,
}: {
  children: ReactNode;
  width?: number | `${number}%`;
}) {
  return (
    <View style={{ width, maxWidth: "100%", minWidth: 0, flexGrow: 1 }}>
      {children}
    </View>
  );
}

/** Storybook canvas — demo-app 쇼케이스와 동일한 top-aligned 레이아웃 */
export function StoryCanvas({ children }: { children: ReactNode }) {
  return (
    <ScrollView
      style={{ flex: 1, width: "100%" }}
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: "flex-start",
        paddingVertical: 8,
        paddingBottom: 48,
      }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={{ width: "100%", gap: 32 }}>{children}</View>
    </ScrollView>
  );
}

export function OverviewRoot({ children }: { children: ReactNode }) {
  return <View style={{ width: "100%", gap: 32 }}>{children}</View>;
}
