import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner } from "./index";
import type { SpinnerSize } from "./index";

type SpinnerPlaygroundArgs = {
  size: SpinnerSize;
};

const meta: Meta<SpinnerPlaygroundArgs> = {
  title: "Components/Spinner",
  component: Spinner,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
  args: {
    size: "md",
  },
};

export default meta;
type Story = StoryObj<SpinnerPlaygroundArgs>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};

export const CustomColor: Story = {
  render: () => <Spinner size="lg" color="#22c55e" />,
};
