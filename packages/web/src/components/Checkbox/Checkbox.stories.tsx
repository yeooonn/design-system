import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Checkbox } from "./index";
import type { CheckboxSize } from "./checkboxStyles";

type CheckboxPlaygroundArgs = {
  size: CheckboxSize;
  label: string;
  showLabel: boolean;
  checked: boolean;
  indeterminate: boolean;
  error: boolean;
  helperText: string;
  showHelperText: boolean;
  errorMessage: string;
  showErrorMessage: boolean;
  disabled: boolean;
};

const meta: Meta<CheckboxPlaygroundArgs> = {
  title: "Form/Checkbox",
  component: Checkbox,
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
    indeterminate: { control: "boolean" },
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
    label: "약관에 동의합니다",
    showLabel: true,
    checked: false,
    indeterminate: false,
    error: false,
    helperText: "필수 항목입니다.",
    showHelperText: false,
    errorMessage: "약관에 동의해주세요.",
    showErrorMessage: false,
    disabled: false,
  },
  render: ({
    size,
    label,
    showLabel,
    checked,
    indeterminate,
    error,
    helperText,
    showHelperText,
    errorMessage,
    showErrorMessage,
    disabled,
  }) => (
    <Checkbox
      size={size}
      label={showLabel ? label : undefined}
      checked={checked}
      indeterminate={indeterminate}
      error={error}
      helperText={showHelperText ? helperText : undefined}
      errorMessage={showErrorMessage ? errorMessage : undefined}
      disabled={disabled}
      readOnly
    />
  ),
};

export default meta;
type Story = StoryObj<CheckboxPlaygroundArgs>;

export const Playground: Story = {};

export const Overview: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Checkbox label="약관에 동의합니다" />
      <Checkbox label="약관에 동의합니다" checked readOnly />
      <Checkbox label="약관에 동의합니다" indeterminate readOnly />
      <Checkbox
        label="약관에 동의합니다"
        errorMessage="약관에 동의해주세요."
        readOnly
      />
      <Checkbox label="약관에 동의합니다" checked disabled readOnly />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkboxes = canvas.getAllByRole("checkbox", {
      name: "약관에 동의합니다",
    });
    await userEvent.click(checkboxes[0]);
    await expect(checkboxes[0]).toBeChecked();
  },
};

export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Checkbox size="sm" label="Small" checked readOnly />
      <Checkbox size="md" label="Medium" checked readOnly />
      <Checkbox size="lg" label="Large" checked readOnly />
    </div>
  ),
};

export const HelperText: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <Checkbox
      label="마케팅 정보 수신 동의"
      helperText="이벤트 및 혜택 알림을 받을 수 있습니다."
    />
  ),
};
