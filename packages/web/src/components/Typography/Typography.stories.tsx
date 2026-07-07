import type { Meta, StoryObj } from "@storybook/react-vite";
import { Typography } from "./index";
import type { TypographyColor, TypographyVariant } from "./typographyStyles";

const typographyComponents: Record<
  TypographyVariant,
  (typeof Typography)[keyof typeof Typography]
> = {
  H1: Typography.H1,
  H2: Typography.H2,
  H3: Typography.H3,
  P1: Typography.P1,
  P2: Typography.P2,
  Label: Typography.Label,
  Caption: Typography.Caption,
};

type TypographyPlaygroundArgs = {
  variant: TypographyVariant;
  color: TypographyColor;
  children: string;
};

const meta: Meta<TypographyPlaygroundArgs> = {
  title: "Typography",
  component: Typography.P1,
  argTypes: {
    variant: {
      control: "select",
      options: ["H1", "H2", "H3", "P1", "P2", "Label", "Caption"],
    },
    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "tertiary",
        "inverse",
        "success",
        "warning",
        "error",
      ],
    },
    children: { control: "text" },
    as: { control: false, table: { disable: true } },
    style: { control: false, table: { disable: true } },
  },
  args: {
    variant: "P1",
    color: "primary",
    children: "본문 텍스트입니다.",
  },
  render: ({ variant, color, children }) => {
    const Component = typographyComponents[variant];
    return <Component color={color}>{children}</Component>;
  },
};

export default meta;

type Story = StoryObj<TypographyPlaygroundArgs>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Typography.H1>H1 — 페이지 제목</Typography.H1>
      <Typography.H2>H2 — 섹션 제목</Typography.H2>
      <Typography.H3>H3 — 카드 제목</Typography.H3>
      <Typography.P1>P1 — 기본 본문 텍스트</Typography.P1>
      <Typography.P2>P2 — 작은 본문 텍스트</Typography.P2>
      <Typography.Label>Label — 라벨 텍스트</Typography.Label>
      <Typography.Caption>Caption — 캡션 텍스트</Typography.Caption>
    </div>
  ),
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Typography.P1 color="primary">primary</Typography.P1>
      <Typography.P1 color="secondary">secondary</Typography.P1>
      <Typography.P1 color="tertiary">tertiary</Typography.P1>
      <Typography.P1 color="success">success</Typography.P1>
      <Typography.P1 color="warning">warning</Typography.P1>
      <Typography.P1 color="error">error</Typography.P1>
    </div>
  ),
};
