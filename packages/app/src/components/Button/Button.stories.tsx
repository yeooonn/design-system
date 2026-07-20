import type { Meta, StoryObj } from "@storybook/react-native";
import { Icon } from "../Icon";
import { iconSources } from "../../stories/iconSources";
import { OverviewRoot, Row, Stack, SubSection } from "../../stories/layout";
import { Button } from "./index";
import {
  type ButtonColor,
  type ButtonRound,
  type ButtonSize,
  type ButtonVariant,
} from "./buttonStyles";

const searchIcon = iconSources.search;
const roundOptions = ["none", "sm", "md", "lg", "xl", "full"] as const;

type ButtonPlaygroundArgs = {
  label: string;
  withIcon: boolean;
  iconOnly: boolean;
  accessibilityLabel: string;
  variant: ButtonVariant;
  color: ButtonColor;
  size: ButtonSize;
  round: ButtonRound;
  disabled: boolean;
  loading: boolean;
};

const meta = {
  title: "Components/Button",
  argTypes: {
    label: {
      control: "text",
      if: { arg: "iconOnly", truthy: false },
    },
    withIcon: {
      control: "boolean",
      if: { arg: "iconOnly", truthy: false },
    },
    iconOnly: { control: "boolean" },
    accessibilityLabel: {
      control: "text",
      if: { arg: "iconOnly", truthy: true },
    },
    variant: { control: "select", options: ["filled", "outlined", "ghost"] },
    color: { control: "select", options: ["primary", "dark", "danger"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    round: { control: "select", options: [...roundOptions] },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
  },
  args: {
    label: "Button",
    withIcon: false,
    iconOnly: false,
    accessibilityLabel: "Button",
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
    accessibilityLabel,
    variant,
    color,
    size,
    round,
    disabled,
    loading,
  }) => {
    const icon = (
      <Icon
        size={size}
        color={variant === "filled" ? "inverse" : "primary"}
        source={{ uri: searchIcon }}
      />
    );

    if (iconOnly) {
      return (
        <Button
            iconOnly
            accessibilityLabel={accessibilityLabel}
            variant={variant}
            color={color}
            size={size}
            round={round}
            disabled={disabled}
            loading={loading}
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
        >
        {withIcon ? icon : null}
        {label}
      </Button>
    );
  },
} satisfies Meta<ButtonPlaygroundArgs>;

export default meta;
type Story = StoryObj<ButtonPlaygroundArgs>;

export const Playground: Story = {};

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <OverviewRoot>
      <SubSection title="Variants × Colors">
        <Stack gap={16}>
          {(["filled", "outlined", "ghost"] as const).map((variant) => (
            <Row key={variant}>
              {(["primary", "dark", "danger"] as const).map((color) => (
                <Button key={color} variant={variant} color={color}>
                  {variant}/{color}
                </Button>
              ))}
            </Row>
          ))}
        </Stack>
      </SubSection>

      <SubSection title="With Icon">
        <Row>
          <Button>
            <Icon
              size="md"
              color="inverse"
              source={{ uri: iconSources.search }}
            />
            검색하기
          </Button>
          <Button variant="outlined">
            <Icon
              size="md"
              color="primary"
              source={{ uri: iconSources.search }}
            />
            검색하기
          </Button>
          <Button iconOnly accessibilityLabel="검색" round="full">
            <Icon
              size="md"
              color="inverse"
              source={{ uri: iconSources.search }}
            />
          </Button>
          <Button
            variant="outlined"
            iconOnly
            accessibilityLabel="알림"
            round="full"
          >
            <Icon
              size="md"
              color="primary"
              source={{ uri: iconSources.bell }}
            />
          </Button>
        </Row>
      </SubSection>

      <SubSection title="Sizes">
        <Row>
          {(["sm", "md", "lg"] as const).map((size) => (
            <Button key={size} size={size}>
              {size}
            </Button>
          ))}
        </Row>
      </SubSection>

      <SubSection title="Round">
        <Row>
          {roundOptions.map((round) => (
            <Button key={round} round={round}>
              {round}
            </Button>
          ))}
        </Row>
      </SubSection>

      <SubSection title="States">
        <Row>
          <Button disabled>disabled</Button>
          <Button loading>loading</Button>
          <Button variant="outlined" disabled>
            outlined disabled
          </Button>
          <Button variant="ghost" loading>
            ghost loading
          </Button>
        </Row>
      </SubSection>
    </OverviewRoot>
  ),
};
