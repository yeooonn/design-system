import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { iconSources } from "../../stories/iconSources";
import { OverviewRoot, Row, SubSection } from "../../stories/layout";
import { Typography } from "../Typography";
import { Icon } from "./index";
import type { IconColor, IconSize } from "./index";

const storyIcons = {
  search: iconSources.search,
  user: iconSources.user,
  check: iconSources.check,
  graph: iconSources.graph,
} as const;

type IconName = keyof typeof storyIcons;

type IconPlaygroundArgs = {
  icon: IconName;
  size: IconSize;
  useColorProp: boolean;
  color?: IconColor;
};

const meta = {
  title: "Components/Icon",
  argTypes: {
    icon: { control: "select", options: Object.keys(storyIcons) },
    size: { control: "select", options: ["sm", "md", "lg"] },
    useColorProp: { control: "boolean" },
    color: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "success", "warning", "error"],
      if: { arg: "useColorProp", truthy: true },
    },
  },
  args: {
    icon: "search",
    size: "md",
    useColorProp: true,
    color: "primary",
  },
  render: ({ icon, size, useColorProp, color }) => (
    <Icon
        source={{ uri: storyIcons[icon] }}
        size={size}
      color={useColorProp ? color : undefined}
    />
  ),
} satisfies Meta<IconPlaygroundArgs>;

export default meta;
type Story = StoryObj<IconPlaygroundArgs>;

export const Playground: Story = {};

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <OverviewRoot>
      <SubSection title="Overview">
        <Row gap={24}>
          {(Object.entries(iconSources) as [string, string][]).map(
            ([name, uri]) => (
              <View key={name} style={{ alignItems: "center", gap: 8 }}>
                <Icon size="md" color="primary" source={{ uri }} />
                <Typography.Caption>{name}</Typography.Caption>
              </View>
            ),
          )}
        </Row>
      </SubSection>
      <SubSection title="Sizes">
        <Row gap={24}>
          <Icon size="sm" source={{ uri: iconSources.search }} />
          <Icon size="md" source={{ uri: iconSources.search }} />
          <Icon size="lg" source={{ uri: iconSources.search }} />
        </Row>
      </SubSection>
      <SubSection title="Colors">
        <Row gap={24}>
          {(
            ["primary", "secondary", "success", "warning", "error"] as const
          ).map((color) => (
            <Icon
              key={color}
              size="lg"
              color={color}
              source={{ uri: iconSources.bell }}
            />
          ))}
        </Row>
      </SubSection>
    </OverviewRoot>
  ),
};
