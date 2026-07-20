import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { Field, OverviewRoot, Stack, SubSection } from "../../stories/layout";
import { Checkbox } from "./index";
import type { CheckboxSize } from "./index";

type CheckboxPlaygroundArgs = {
  label: string;
  size: CheckboxSize;
  checked: boolean;
  indeterminate: boolean;
  error: boolean;
  helperText: string;
  showHelperText: boolean;
  errorMessage: string;
  showErrorMessage: boolean;
  disabled: boolean;
};

function CheckboxPlayground({
  label,
  size,
  checked: initialChecked,
  indeterminate,
  error,
  helperText,
  showHelperText,
  errorMessage,
  showErrorMessage,
  disabled,
}: CheckboxPlaygroundArgs) {
  const [checked, setChecked] = useState(initialChecked);

  return (
    <Field width={320}>
      <Checkbox
        size={size}
        label={label}
        checked={checked}
        indeterminate={indeterminate}
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
  title: "Form/Checkbox",
  argTypes: {
    label: { control: "text" },
    size: { control: "select", options: ["sm", "md", "lg"] },
    checked: { control: "boolean" },
    indeterminate: { control: "boolean" },
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
    label: "약관에 동의합니다",
    size: "md",
    checked: false,
    indeterminate: false,
    error: false,
    helperText: "필수 약관입니다.",
    showHelperText: false,
    errorMessage: "동의가 필요합니다.",
    showErrorMessage: false,
    disabled: false,
  },
  render: (args) => <CheckboxPlayground {...args} />,
} satisfies Meta<CheckboxPlaygroundArgs>;

export default meta;
type Story = StoryObj<CheckboxPlaygroundArgs>;

export const Playground: Story = {};

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: function CheckboxOverviewStory() {
    const [checked, setChecked] = useState(false);
    const [marketing, setMarketing] = useState(false);

    return (
      <OverviewRoot>
        <SubSection title="Overview">
          <Stack>
            <Checkbox
              label="약관에 동의합니다"
              checked={checked}
              onPress={setChecked}
            />
            <Checkbox label="약관에 동의합니다" checked />
            <Checkbox label="약관에 동의합니다" indeterminate />
            <Checkbox
              label="약관에 동의합니다"
              errorMessage="약관에 동의해주세요."
            />
            <Checkbox label="약관에 동의합니다" checked disabled />
          </Stack>
        </SubSection>
        <SubSection title="Sizes">
          <Stack>
            <Checkbox size="sm" label="Small" checked />
            <Checkbox size="md" label="Medium" checked />
            <Checkbox size="lg" label="Large" checked />
          </Stack>
        </SubSection>
        <SubSection title="Helper Text">
          <Checkbox
            label="마케팅 정보 수신 동의"
            helperText="이벤트 및 혜택 알림을 받을 수 있습니다."
            checked={marketing}
            onPress={setMarketing}
          />
        </SubSection>
      </OverviewRoot>
    );
  },
};
