import type { Meta, StoryObj } from "@storybook/react-vite";
import { Radio } from "./index";
import type { RadioSize } from "./radioStyles";

type RadioPlaygroundArgs = {
  size: RadioSize;
  label: string;
  showLabel: boolean;
  checked: boolean;
  error: boolean;
  helperText: string;
  showHelperText: boolean;
  errorMessage: string;
  showErrorMessage: boolean;
  disabled: boolean;
};

const meta: Meta<RadioPlaygroundArgs> = {
  title: "Radio",
  component: Radio,
  parameters: {
    controls: {
      exclude: ["style", "className"],
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    style: { table: { disable: true } },
    className: { table: { disable: true } },
    label: {
      control: "text",
      if: { arg: "showLabel", truthy: true },
      description: "라벨 텍스트",
    },
    showLabel: { control: "boolean", description: "라벨 표시" },
    checked: { control: "boolean" },
    error: { control: "boolean" },
    helperText: {
      control: "text",
      if: { arg: "showHelperText", truthy: true },
      description: "도움말 텍스트",
    },
    showHelperText: { control: "boolean", description: "도움말 표시" },
    errorMessage: {
      control: "text",
      if: { arg: "showErrorMessage", truthy: true },
      description: "에러 메시지",
    },
    showErrorMessage: { control: "boolean", description: "에러 메시지 표시" },
    disabled: { control: "boolean" },
  },
  args: {
    size: "md",
    label: "옵션 A",
    showLabel: true,
    checked: false,
    error: false,
    helperText: "추가 설명이 필요할 때 사용합니다.",
    showHelperText: false,
    errorMessage: "옵션을 선택해주세요.",
    showErrorMessage: false,
    disabled: false,
  },
  render: ({
    size,
    label,
    showLabel,
    checked,
    error,
    helperText,
    showHelperText,
    errorMessage,
    showErrorMessage,
    disabled,
  }) => (
    <Radio
      size={size}
      label={showLabel ? label : undefined}
      name="radio-playground"
      checked={checked}
      error={error}
      helperText={showHelperText ? helperText : undefined}
      errorMessage={showErrorMessage ? errorMessage : undefined}
      disabled={disabled}
      readOnly
    />
  ),
};

export default meta;
type Story = StoryObj<RadioPlaygroundArgs>;

export const Playground: Story = {};

export const Overview: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Radio name="overview" label="옵션 A" />
      <Radio name="overview" label="옵션 B" checked readOnly />
      <Radio
        name="overview-error"
        label="옵션 C"
        errorMessage="옵션을 선택해주세요."
        readOnly
      />
      <Radio name="overview-disabled" label="옵션 D" checked disabled readOnly />
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Radio size="sm" name="sizes" label="Small" checked readOnly />
      <Radio size="md" name="sizes" label="Medium" checked readOnly />
      <Radio size="lg" name="sizes" label="Large" checked readOnly />
    </div>
  ),
};

export const Group: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <fieldset
      style={{
        border: "none",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <legend style={{ marginBottom: 8, fontSize: 14, fontWeight: 600 }}>
        결제 수단
      </legend>
      <Radio name="payment" label="신용카드" defaultChecked />
      <Radio name="payment" label="계좌이체" />
      <Radio name="payment" label="간편결제" />
    </fieldset>
  ),
};
