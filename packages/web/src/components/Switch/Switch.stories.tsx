import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch } from "./index";
import type { SwitchSize } from "./switchStyles";

type SwitchPlaygroundArgs = {
  size: SwitchSize;
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

const meta: Meta<SwitchPlaygroundArgs> = {
  title: "Switch",
  component: Switch,
  parameters: {
    controls: {
      exclude: ["style", "className"],
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
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
    label: "알림 받기",
    showLabel: true,
    checked: false,
    error: false,
    helperText: "푸시 알림을 받을 수 있습니다.",
    showHelperText: false,
    errorMessage: "알림 설정을 확인해주세요.",
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
    <div style={{ width: 320 }}>
      <Switch
        size={size}
        label={showLabel ? label : undefined}
        checked={checked}
        error={error}
        helperText={showHelperText ? helperText : undefined}
        errorMessage={showErrorMessage ? errorMessage : undefined}
        disabled={disabled}
        readOnly
      />
    </div>
  ),
};

export default meta;
type Story = StoryObj<SwitchPlaygroundArgs>;

export const Playground: Story = {};

export const Overview: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 12, width: 320 }}
    >
      <Switch label="알림 받기" checked={false} readOnly />
      <Switch label="알림 받기" checked readOnly />
      <Switch
        label="알림 받기"
        checked
        errorMessage="알림 설정을 확인해주세요."
        readOnly
      />
      <Switch label="알림 받기" checked disabled readOnly />
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 12, width: 320 }}
    >
      <Switch size="sm" label="Small" checked readOnly />
      <Switch size="md" label="Medium" checked readOnly />
      <Switch size="lg" label="Large" checked readOnly />
    </div>
  ),
};

export const HelperText: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ width: 320 }}>
      <Switch
        label="마케팅 정보 수신 동의"
        helperText="이벤트 및 혜택 알림을 받을 수 있습니다."
        checked={false}
        readOnly
      />
    </div>
  ),
};
