import type { Meta, StoryObj } from "@storybook/react-vite";
import { Divider } from "./index";

const meta = {
  title: "Components/Divider",
  component: Divider,
  argTypes: {
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description: "구분선 방향",
    },
  },
  args: {
    orientation: "horizontal",
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof Divider>;

export const Playground: Story = {
  render: (args) =>
    args.orientation === "vertical" ? (
      <div style={{ display: "flex", alignItems: "stretch", height: 48, gap: 16 }}>
        <span>왼쪽</span>
        <Divider orientation="vertical" />
        <span>오른쪽</span>
      </div>
    ) : (
      <div style={{ width: 320 }}>
        <p style={{ margin: 0 }}>위 콘텐츠</p>
        <Divider />
        <p style={{ margin: 0 }}>아래 콘텐츠</p>
      </div>
    ),
};

export const Horizontal: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ width: 320 }}>
      <p style={{ margin: 0 }}>위 콘텐츠</p>
      <Divider />
      <p style={{ margin: 0 }}>아래 콘텐츠</p>
    </div>
  ),
};

export const Vertical: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: "flex", alignItems: "stretch", height: 48, gap: 16 }}>
      <span>왼쪽</span>
      <Divider orientation="vertical" />
      <span>오른쪽</span>
    </div>
  ),
};
