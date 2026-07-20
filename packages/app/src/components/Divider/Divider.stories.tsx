import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { OverviewRoot, Row, Stack, SubSection } from "../../stories/layout";
import { Typography } from "../Typography";
import { Divider } from "./index";
import type { DividerOrientation } from "./index";

type DividerPlaygroundArgs = {
  orientation: DividerOrientation;
};

const meta = {
  title: "Components/Divider",
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
  },
  args: { orientation: "horizontal" },
  render: ({ orientation }) => <Divider orientation={orientation} />,
} satisfies Meta<DividerPlaygroundArgs>;

export default meta;
type Story = StoryObj<DividerPlaygroundArgs>;

export const Playground: Story = {};

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <OverviewRoot>
      <SubSection title="Horizontal">
        <Stack gap={12}>
          <Typography.P1>위쪽 콘텐츠</Typography.P1>
          <Divider />
          <Typography.P1>아래쪽 콘텐츠</Typography.P1>
        </Stack>
      </SubSection>
      <SubSection title="Vertical">
        <Row gap={12}>
          <Typography.P1>왼쪽</Typography.P1>
          <View style={{ height: 24 }}>
            <Divider orientation="vertical" />
          </View>
          <Typography.P1>오른쪽</Typography.P1>
        </Row>
      </SubSection>
    </OverviewRoot>
  ),
};
