import type { Meta, StoryObj } from "@storybook/react-vite";
import { Divider } from "./index";

const meta: Meta<typeof Divider> = {
  title: "Divider",
  component: Divider,
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <p style={{ margin: 0 }}>위 콘텐츠</p>
      <Divider />
      <p style={{ margin: 0 }}>아래 콘텐츠</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "stretch", height: 48, gap: 16 }}>
      <span>왼쪽</span>
      <Divider orientation="vertical" />
      <span>오른쪽</span>
    </div>
  ),
};
