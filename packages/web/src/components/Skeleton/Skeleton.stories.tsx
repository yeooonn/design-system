import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./index";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  argTypes: {
    width: { control: "text", description: "너비 (px 또는 %)" },
    height: { control: "number", description: "높이 (px)" },
    rounded: {
      control: "select",
      options: ["none", "sm", "md", "lg", "full"],
      description: "모서리 radius",
    },
  },
  args: {
    width: 240,
    height: 16,
    rounded: "md",
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Playground: Story = {};

export const CardPlaceholder: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ width: 320, display: "flex", flexDirection: "column", gap: 12 }}>
      <Skeleton width="100%" height={160} rounded="lg" />
      <Skeleton width="70%" height={16} />
      <Skeleton width="100%" height={12} />
      <Skeleton width="45%" height={12} />
    </div>
  ),
};

export const ListPlaceholder: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ width: 320, display: "flex", flexDirection: "column", gap: 16 }}>
      {[0, 1, 2].map((item) => (
        <div key={item} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Skeleton width={40} height={40} rounded="full" />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
            <Skeleton width="60%" height={14} />
            <Skeleton width="90%" height={12} />
          </div>
        </div>
      ))}
    </div>
  ),
};
