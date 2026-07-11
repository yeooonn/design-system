import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./index";
import type { BadgeColor, BadgeSize, BadgeVariant } from "./badgeStyles";

type BadgePlaygroundArgs = {
  children: string;
  color: BadgeColor;
  variant: BadgeVariant;
  size: BadgeSize;
};

const meta: Meta<BadgePlaygroundArgs> = {
  title: "Badge",
  component: Badge,
  parameters: {
    controls: {
      exclude: ["style", "className"],
    },
  },
  argTypes: {
    children: { control: "text", description: "뱃지 텍스트" },
    color: {
      control: "select",
      options: ["blue", "green", "red", "orange", "yellow"],
    },
    variant: {
      control: "select",
      options: ["filled", "soft"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
  args: {
    children: "New",
    color: "blue",
    variant: "soft",
    size: "md",
  },
  render: ({ children, color, variant, size }) => (
    <Badge color={color} variant={variant} size={size}>
      {children}
    </Badge>
  ),
};

export default meta;
type Story = StoryObj<BadgePlaygroundArgs>;

export const Playground: Story = {};

export const Colors: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {(["blue", "green", "red", "orange", "yellow"] as const).map((color) => (
        <Badge key={color} color={color}>
          {color}
        </Badge>
      ))}
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {(["blue", "green", "red", "orange", "yellow"] as const).map(
          (color) => (
            <Badge key={`soft-${color}`} color={color} variant="soft">
              soft
            </Badge>
          ),
        )}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {(["blue", "green", "red", "orange", "yellow"] as const).map(
          (color) => (
            <Badge key={`filled-${color}`} color={color} variant="filled">
              filled
            </Badge>
          ),
        )}
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Badge size="sm">sm</Badge>
      <Badge size="md">md</Badge>
      <Badge size="lg">lg</Badge>
    </div>
  ),
};
