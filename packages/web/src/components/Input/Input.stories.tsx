import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./index";
import type { InputSize, InputVariant } from "./inputStyles";

type InputPlaygroundArgs = {
  variant: InputVariant;
  size: InputSize;
  label: string;
  showLabel: boolean;
  prefix: string;
  showPrefix: boolean;
  suffix: string;
  showSuffix: boolean;
  placeholder: string;
  value: string;
  error: boolean;
  disabled: boolean;
};

const meta: Meta<InputPlaygroundArgs> = {
  title: "Input",
  component: Input,
  argTypes: {
    variant: { control: "select", options: ["box", "line"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    label: {
      control: "text",
      if: { arg: "showLabel", truthy: true },
      description: "라벨 텍스트",
    },
    showLabel: { control: "boolean", description: "라벨 표시" },
    prefix: {
      control: "text",
      if: { arg: "showPrefix", truthy: true },
      description: "prefix 텍스트",
    },
    showPrefix: { control: "boolean", description: "prefix 표시" },
    suffix: {
      control: "text",
      if: { arg: "showSuffix", truthy: true },
      description: "suffix 텍스트",
    },
    showSuffix: { control: "boolean", description: "suffix 표시" },
    placeholder: { control: "text" },
    value: { control: "text" },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    variant: "box",
    size: "md",
    label: "금액",
    showLabel: false,
    prefix: "$",
    showPrefix: true,
    suffix: "USD",
    showSuffix: true,
    placeholder: "금액을 입력하세요",
    value: "",
    error: false,
    disabled: false,
  },
  render: ({
    variant,
    size,
    label,
    showLabel,
    prefix,
    showPrefix,
    suffix,
    showSuffix,
    placeholder,
    value,
    error,
    disabled,
  }) => (
    <div style={{ width: 320 }}>
      <Input
        variant={variant}
        size={size}
        label={showLabel ? label : undefined}
        prefix={showPrefix ? prefix : undefined}
        suffix={showSuffix ? suffix : undefined}
        placeholder={placeholder}
        value={value}
        error={error}
        disabled={disabled}
        readOnly={Boolean(value)}
      />
    </div>
  ),
};

export default meta;
type Story = StoryObj<InputPlaygroundArgs>;

export const Playground: Story = {};

export const BoxOverview: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <div style={{ width: 240 }}>
        <Input prefix="$" suffix="USD" placeholder="금액을 입력하세요" />
      </div>
      <div style={{ width: 240 }}>
        <Input prefix="$" suffix="USD" defaultValue="1,000" autoFocus />
      </div>
      <div style={{ width: 240 }}>
        <Input prefix="$" suffix="USD" defaultValue="1,000" error />
      </div>
      <div style={{ width: 240 }}>
        <Input prefix="$" suffix="USD" defaultValue="1,000" disabled />
      </div>
    </div>
  ),
};

export const LineOverview: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <div style={{ width: 240 }}>
        <Input
          variant="line"
          label="금액"
          prefix="$"
          suffix="USD"
          placeholder="금액을 입력하세요"
        />
      </div>
      <div style={{ width: 240 }}>
        <Input
          variant="line"
          label="금액"
          prefix="$"
          suffix="USD"
          defaultValue="1,000"
          autoFocus
        />
      </div>
      <div style={{ width: 240 }}>
        <Input
          variant="line"
          label="금액"
          prefix="$"
          suffix="USD"
          defaultValue="1,000"
          error
        />
      </div>
      <div style={{ width: 240 }}>
        <Input
          variant="line"
          label="금액"
          prefix="$"
          suffix="USD"
          defaultValue="1,000"
          disabled
        />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 320 }}>
      <Input size="sm" prefix="$" suffix="USD" placeholder="금액을 입력하세요" />
      <Input size="md" prefix="$" suffix="USD" placeholder="금액을 입력하세요" />
      <Input size="lg" prefix="$" suffix="USD" placeholder="금액을 입력하세요" />
    </div>
  ),
};
