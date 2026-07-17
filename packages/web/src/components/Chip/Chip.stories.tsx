import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Chip } from "./index";
import type { ChipColor, ChipSize } from "./chipStyles";

type ChipPlaygroundArgs = {
  children: string;
  color: ChipColor;
  size: ChipSize;
  selected: boolean;
  disabled: boolean;
  closable: boolean;
};

const meta: Meta<ChipPlaygroundArgs> = {
  title: "Components/Chip",
  component: Chip,
  argTypes: {
    children: { control: "text" },
    color: {
      control: "select",
      options: ["gray", "blue", "green", "red", "orange", "yellow"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
    selected: { control: "boolean" },
    disabled: { control: "boolean" },
    closable: { control: "boolean" },
  },
  args: {
    children: "React",
    color: "gray",
    size: "md",
    selected: false,
    disabled: false,
    closable: false,
  },
  render: ({ children, color, size, selected, disabled, closable }) => (
    <Chip
      color={color}
      size={size}
      selected={selected}
      disabled={disabled}
      onClick={() => undefined}
      onClose={closable ? () => undefined : undefined}
    >
      {children}
    </Chip>
  ),
};

export default meta;
type Story = StoryObj<ChipPlaygroundArgs>;

export const Playground: Story = {};

export const Selectable: Story = {
  render: function SelectableStory() {
    const [selected, setSelected] = useState<string[]>(["React"]);
    const tags = ["React", "TypeScript", "Design System"];

    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {tags.map((tag) => (
          <Chip
            key={tag}
            selected={selected.includes(tag)}
            onClick={() =>
              setSelected((prev) =>
                prev.includes(tag)
                  ? prev.filter((item) => item !== tag)
                  : [...prev, tag],
              )
            }
          >
            {tag}
          </Chip>
        ))}
      </div>
    );
  },
};

export const Closable: Story = {
  render: function ClosableStory() {
    const [tags, setTags] = useState(["React", "NativeWind", "Storybook"]);

    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {tags.map((tag) => (
          <Chip
            key={tag}
            color="blue"
            onClose={() => setTags((prev) => prev.filter((item) => item !== tag))}
          >
            {tag}
          </Chip>
        ))}
      </div>
    );
  },
};
