import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "./index";
import type { AvatarSize } from "./index";

type AvatarPlaygroundArgs = {
  name: string;
  size: AvatarSize;
  showImage: boolean;
};

const meta: Meta<AvatarPlaygroundArgs> = {
  title: "Components/Avatar",
  component: Avatar,
  argTypes: {
    name: { control: "text" },
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
    showImage: { control: "boolean" },
  },
  args: {
    name: "Kim Yeonjeong",
    size: "md",
    showImage: false,
  },
  render: ({ name, size, showImage }) => (
    <Avatar
      name={name}
      size={size}
      src={
        showImage
          ? "https://api.dicebear.com/7.x/avataaars/svg?seed=ds"
          : undefined
      }
    />
  ),
};

export default meta;
type Story = StoryObj<AvatarPlaygroundArgs>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Avatar name="Kim Yeonjeong" size="sm" />
      <Avatar name="Kim Yeonjeong" size="md" />
      <Avatar name="Kim Yeonjeong" size="lg" />
      <Avatar name="Kim Yeonjeong" size="xl" />
    </div>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Avatar
      name="Kim Yeonjeong"
      src="https://api.dicebear.com/7.x/avataaars/svg?seed=ds"
      size="lg"
    />
  ),
};
