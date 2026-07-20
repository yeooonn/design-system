import type { Meta, StoryObj } from "@storybook/react-native";
import { OverviewRoot, Row, Stack, SubSection } from "../../stories/layout";
import { Badge } from "./index";
import type { BadgeColor, BadgeSize, BadgeVariant } from "./badgeStyles";

type BadgePlaygroundArgs = {
  children: string;
  color: BadgeColor;
  variant: BadgeVariant;
  size: BadgeSize;
};

const meta = {
  title: "Components/Badge",
  argTypes: {
    children: { control: "text" },
    color: {
      control: "select",
      options: ["blue", "green", "red", "orange", "yellow"],
    },
    variant: { control: "select", options: ["filled", "soft"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
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
} satisfies Meta<BadgePlaygroundArgs>;

export default meta;
type Story = StoryObj<BadgePlaygroundArgs>;

export const Playground: Story = {};

const overviewColors = ["blue", "green", "red", "orange", "yellow"] as const;
const overviewSizes = ["sm", "md", "lg"] as const;

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <OverviewRoot>
      <SubSection title="Colors">
        <Row gap={8}>
          {overviewColors.map((color) => (
            <Badge key={color} color={color}>
              {color}
            </Badge>
          ))}
        </Row>
      </SubSection>
      <SubSection title="Variants">
        <Stack gap={12}>
          <Row gap={8}>
            {overviewColors.map((color) => (
              <Badge key={`soft-${color}`} color={color} variant="soft">
                soft
              </Badge>
            ))}
          </Row>
          <Row gap={8}>
            {overviewColors.map((color) => (
              <Badge key={`filled-${color}`} color={color} variant="filled">
                filled
              </Badge>
            ))}
          </Row>
        </Stack>
      </SubSection>
      <SubSection title="Sizes">
        <Row gap={8}>
          {overviewSizes.map((size) => (
            <Badge key={size} size={size}>
              {size}
            </Badge>
          ))}
        </Row>
      </SubSection>
    </OverviewRoot>
  ),
};
