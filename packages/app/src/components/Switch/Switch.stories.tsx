import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { Field, OverviewRoot, Stack, SubSection } from "../../stories/layout";
import { Switch } from "./index";
import type { SwitchSize } from "./index";

type SwitchPlaygroundArgs = {
  label: string;
  showLabel: boolean;
  size: SwitchSize;
  checked: boolean;
  error: boolean;
  helperText: string;
  showHelperText: boolean;
  errorMessage: string;
  showErrorMessage: boolean;
  disabled: boolean;
};

function SwitchPlayground({
  label,
  showLabel,
  size,
  checked: initialChecked,
  error,
  helperText,
  showHelperText,
  errorMessage,
  showErrorMessage,
  disabled,
}: SwitchPlaygroundArgs) {
  const [checked, setChecked] = useState(initialChecked);

  return (
    <Field width={320}>
      <Switch
        size={size}
        label={showLabel ? label : undefined}
        checked={checked}
        error={error}
        helperText={showHelperText ? helperText : undefined}
        errorMessage={showErrorMessage ? errorMessage : undefined}
        disabled={disabled}
        onCheckedChange={setChecked}
      />
    </Field>
  );
}

const meta = {
  title: "Form/Switch",
  argTypes: {
    label: { control: "text", if: { arg: "showLabel", truthy: true } },
    showLabel: { control: "boolean" },
    size: { control: "select", options: ["sm", "md", "lg"] },
    checked: { control: "boolean" },
    error: { control: "boolean" },
    helperText: { control: "text", if: { arg: "showHelperText", truthy: true } },
    showHelperText: { control: "boolean" },
    errorMessage: {
      control: "text",
      if: { arg: "showErrorMessage", truthy: true },
    },
    showErrorMessage: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    label: "알림 받기",
    showLabel: true,
    size: "md",
    checked: false,
    error: false,
    helperText: "푸시 알림을 받습니다.",
    showHelperText: false,
    errorMessage: "설정을 확인해주세요.",
    showErrorMessage: false,
    disabled: false,
  },
  render: (args) => <SwitchPlayground {...args} />,
} satisfies Meta<SwitchPlaygroundArgs>;

export default meta;
type Story = StoryObj<SwitchPlaygroundArgs>;

export const Playground: Story = {};

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: function SwitchOverviewStory() {
    const [on, setOn] = useState(false);
    const [marketing, setMarketing] = useState(false);

    return (
      <OverviewRoot>
        <SubSection title="Overview">
          <Stack>
            <Field width={320}>
              <Switch label="알림 받기" checked={on} onPress={setOn} />
            </Field>
            <Field width={320}>
              <Switch label="알림 받기" checked />
            </Field>
            <Field width={320}>
              <Switch
                label="알림 받기"
                checked
                errorMessage="알림 설정을 확인해주세요."
              />
            </Field>
            <Field width={320}>
              <Switch label="알림 받기" checked disabled />
            </Field>
          </Stack>
        </SubSection>
        <SubSection title="Sizes">
          <Stack>
            <Field width={320}>
              <Switch size="sm" label="Small" checked />
            </Field>
            <Field width={320}>
              <Switch size="md" label="Medium" checked />
            </Field>
            <Field width={320}>
              <Switch size="lg" label="Large" checked />
            </Field>
          </Stack>
        </SubSection>
        <SubSection title="Helper Text">
          <Field width={320}>
            <Switch
              label="마케팅 정보 수신 동의"
              helperText="이벤트 및 혜택 알림을 받을 수 있습니다."
              checked={marketing}
              onPress={setMarketing}
            />
          </Field>
        </SubSection>
      </OverviewRoot>
    );
  },
};
