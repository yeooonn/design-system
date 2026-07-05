import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconButton } from "./index";

const searchIcon =
  "https://static.toss.im/icons/svg/icon-search-bold-mono.svg";
const deleteIcon =
  "https://static.toss.im/icons/svg/icon-bin-mono.svg";

const meta: Meta<typeof IconButton> = {
  title: "IconButton",
  component: IconButton,
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
type Story = StoryObj<typeof IconButton>;

export const Playground: Story = {
  args: {
    src: searchIcon,
    label: "검색하기",
    variant: "filled",
    color: "primary",
    size: "md",
  },
};

export const WithLabel: Story = {
  args: {
    src: searchIcon,
    label: "검색하기",
    variant: "filled",
    size: "md",
  },
};

export const IconOnly: Story = {
  args: {
    src: searchIcon,
    variant: "filled",
    "aria-label": "검색하기",
    size: "md",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <IconButton src={searchIcon} label="Filled" variant="filled" />
      <IconButton src={searchIcon} label="Outlined" variant="outlined" />
      <IconButton src={searchIcon} label="Ghost" variant="ghost" />
    </div>
  ),
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <IconButton src={searchIcon} label="Primary" color="primary" />
      <IconButton src={searchIcon} label="Dark" color="dark" />
      <IconButton src={deleteIcon} label="삭제" color="danger" />
    </div>
  ),
};

export const DangerVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <IconButton
        src={deleteIcon}
        label="삭제"
        variant="filled"
        color="danger"
      />
      <IconButton
        src={deleteIcon}
        label="삭제"
        variant="outlined"
        color="danger"
      />
      <IconButton
        src={deleteIcon}
        label="삭제"
        variant="ghost"
        color="danger"
      />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <IconButton src={searchIcon} label="Small" size="sm" />
      <IconButton src={searchIcon} label="Medium" size="md" />
      <IconButton src={searchIcon} label="Large" size="lg" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    src: searchIcon,
    label: "검색하기",
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    src: searchIcon,
    label: "검색하기",
    loading: true,
  },
};
