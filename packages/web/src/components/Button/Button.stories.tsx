import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./index";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  argTypes: {
    variant: { control: "select", options: ["filled", "outlined", "ghost"] },
    color: {
      control: "select",
      options: ["primary", "dark", "danger"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {
  args: {
    label: "Button",
    variant: "filled",
    color: "primary",
    size: "md",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Button label="Filled" variant="filled" />
      <Button label="Outlined" variant="outlined" />
      <Button label="Ghost" variant="ghost" />
    </div>
  ),
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Button label="Primary" color="primary" />
      <Button label="Dark" color="dark" />
      <Button label="삭제" color="danger" />
    </div>
  ),
};

export const DangerVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Button label="삭제" variant="filled" color="danger" />
      <Button label="삭제" variant="outlined" color="danger" />
      <Button label="삭제" variant="ghost" color="danger" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button label="Small" size="sm" />
      <Button label="Medium" size="md" />
      <Button label="Large" size="lg" />
    </div>
  ),
};

export const Disabled: Story = {
  args: { label: "Disabled", disabled: true },
};

export const Loading: Story = {
  args: { label: "Loading", loading: true },
};
