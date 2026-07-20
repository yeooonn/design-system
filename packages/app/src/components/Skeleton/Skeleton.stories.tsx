import type { Meta, StoryObj } from "@storybook/react-native";
import { OverviewRoot, Row, Stack, SubSection } from "../../stories/layout";
import { Skeleton } from "./index";

type SkeletonPlaygroundArgs = {
  width: number;
  height: number;
  rounded: "none" | "sm" | "md" | "lg" | "full";
};

const meta = {
  title: "Components/Skeleton",
  argTypes: {
    width: { control: { type: "number", min: 40, max: 320 } },
    height: { control: { type: "number", min: 8, max: 120 } },
    rounded: { control: "select", options: ["none", "sm", "md", "lg", "full"] },
  },
  args: {
    width: 240,
    height: 16,
    rounded: "md",
  },
  render: ({ width, height, rounded }) => (
    <Skeleton width={width} height={height} rounded={rounded} />
  ),
} satisfies Meta<SkeletonPlaygroundArgs>;

export default meta;
type Story = StoryObj<SkeletonPlaygroundArgs>;

export const Playground: Story = {};

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <OverviewRoot>
      <SubSection title="Usage">
        <Stack gap={12}>
          <Row gap={12}>
            <Skeleton width={40} height={40} rounded="full" />
            <Stack gap={8}>
              <Skeleton width={180} height={14} />
              <Skeleton width={120} height={12} />
            </Stack>
          </Row>
          <Skeleton height={96} rounded="lg" />
          <Skeleton width="70%" height={14} />
        </Stack>
      </SubSection>
    </OverviewRoot>
  ),
};
