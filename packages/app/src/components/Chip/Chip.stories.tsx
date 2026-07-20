import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { OverviewRoot, Row, Stack, SubSection } from "../../stories/layout";
import { Chip } from "./index";
import type { ChipColor, ChipSize } from "./chipStyles";

type ChipPlaygroundArgs = {
  children: string;
  color: ChipColor;
  size: ChipSize;
  selected: boolean;
  disabled: boolean;
  dismissible: boolean;
};

function ChipPlayground({
  children,
  color,
  size,
  selected,
  disabled,
  dismissible,
}: ChipPlaygroundArgs) {
  const [isSelected, setSelected] = useState(selected);

  return (
    <Chip
        color={color}
        size={size}
        selected={isSelected}
        disabled={disabled}
        onPress={() => setSelected((prev) => !prev)}
        onClose={dismissible ? () => setSelected(false) : undefined}
      >
        {children}
      </Chip>
  );
}

const meta = {
  title: "Components/Chip",
  argTypes: {
    children: { control: "text" },
    color: {
      control: "select",
      options: ["blue", "green", "red", "orange", "yellow", "gray"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
    selected: { control: "boolean" },
    disabled: { control: "boolean" },
    dismissible: { control: "boolean" },
  },
  args: {
    children: "Chip",
    color: "blue",
    size: "md",
    selected: false,
    disabled: false,
    dismissible: false,
  },
  render: (args) => <ChipPlayground {...args} />,
} satisfies Meta<ChipPlaygroundArgs>;

export default meta;
type Story = StoryObj<ChipPlaygroundArgs>;

export const Playground: Story = {};

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: function ChipOverviewStory() {
    const [selected, setSelected] = useState("apple");
    const [tags, setTags] = useState(["React", "Native", "Design"]);

    return (
      <OverviewRoot>
        <SubSection title="Colors">
          <Row gap={8}>
            {(["blue", "green", "red", "orange", "yellow", "gray"] as const).map(
              (color) => (
                <Chip key={color} color={color}>
                  {color}
                </Chip>
              ),
            )}
          </Row>
        </SubSection>

        <SubSection title="Selectable">
          <Row gap={8}>
            {["apple", "banana", "orange"].map((value) => (
              <Chip
                key={value}
                color="blue"
                selected={selected === value}
                onPress={() => setSelected(value)}
              >
                {value}
              </Chip>
            ))}
          </Row>
        </SubSection>

        <SubSection title="Dismissible / Sizes">
          <Stack gap={12}>
            <Row gap={8}>
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  color="gray"
                  onClose={() =>
                    setTags((prev) => prev.filter((item) => item !== tag))
                  }
                >
                  {tag}
                </Chip>
              ))}
            </Row>
            <Row gap={8}>
              <Chip size="sm">sm</Chip>
              <Chip size="md">md</Chip>
              <Chip size="lg">lg</Chip>
              <Chip disabled>disabled</Chip>
            </Row>
          </Stack>
        </SubSection>
      </OverviewRoot>
    );
  },
};
