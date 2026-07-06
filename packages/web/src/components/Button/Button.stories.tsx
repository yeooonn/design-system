import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "../Icon";
import { Button } from "./index";
import {
  type ButtonColor,
  type ButtonRound,
  type ButtonSize,
  type ButtonVariant,
} from "./buttonStyles";

const searchIcon =
  "https://static.toss.im/icons/svg/icon-search-bold-mono.svg";

const roundOptions = ["none", "sm", "md", "lg", "xl", "full"] as const;

type ButtonPlaygroundArgs = {
  label: string;
  withIcon: boolean;
  iconOnly: boolean;
  "aria-label": string;
  variant: ButtonVariant;
  color: ButtonColor;
  size: ButtonSize;
  round: ButtonRound;
  disabled: boolean;
  loading: boolean;
};

const meta: Meta<ButtonPlaygroundArgs> = {
  title: "Button",
  component: Button,
  argTypes: {
    label: {
      control: "text",
      if: { arg: "iconOnly", truthy: false },
      description: "버튼 텍스트",
    },
    withIcon: {
      control: "boolean",
      if: { arg: "iconOnly", truthy: false },
      description: "아이콘 표시",
    },
    iconOnly: {
      control: "boolean",
      description: "아이콘만 표시 (aria-label 필수)",
    },
    "aria-label": {
      control: "text",
      if: { arg: "iconOnly", truthy: true },
      description: "스크린 리더용 라벨",
    },
    variant: { control: "select", options: ["filled", "outlined", "ghost"] },
    color: {
      control: "select",
      options: ["primary", "dark", "danger"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
    round: { control: "select", options: [...roundOptions] },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
    onClick: { action: "clicked" },
  },
  args: {
    label: "Button",
    withIcon: false,
    iconOnly: false,
    "aria-label": "Button",
    variant: "filled",
    color: "primary",
    size: "md",
    round: "md",
    disabled: false,
    loading: false,
  },
  render: ({
    label,
    withIcon,
    iconOnly,
    "aria-label": ariaLabel,
    variant,
    color,
    size,
    round,
    disabled,
    loading,
    onClick,
  }) => {
    const icon = <Icon src={searchIcon} size={size} />;

    if (iconOnly) {
      return (
        <Button
          iconOnly
          aria-label={ariaLabel}
          variant={variant}
          color={color}
          size={size}
          round={round}
          disabled={disabled}
          loading={loading}
          onClick={onClick}
        >
          {icon}
        </Button>
      );
    }

    return (
      <Button
        variant={variant}
        color={color}
        size={size}
        round={round}
        disabled={disabled}
        loading={loading}
        onClick={onClick}
      >
        {withIcon && icon}
        {label}
      </Button>
    );
  },
};

export default meta;
type Story = StoryObj<ButtonPlaygroundArgs>;

export const Playground: Story = {};

export const Overview: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
      <Button>저장</Button>
      <Button>
        <Icon src={searchIcon} size="md" />
        검색하기
      </Button>
      <Button iconOnly aria-label="검색" round="full">
        <Icon src={searchIcon} size="md" />
      </Button>
    </div>
  ),
};
