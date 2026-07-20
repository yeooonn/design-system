import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { Field, OverviewRoot, Stack, SubSection } from "../../stories/layout";
import { Typography } from "../Typography";
import { Radio } from "./index";
import type { RadioSize } from "./index";

type RadioPlaygroundArgs = {
  label: string;
  size: RadioSize;
  checked: boolean;
  error: boolean;
  helperText: string;
  showHelperText: boolean;
  errorMessage: string;
  showErrorMessage: boolean;
  disabled: boolean;
};

function RadioPlayground({
  label,
  size,
  checked: initialChecked,
  error,
  helperText,
  showHelperText,
  errorMessage,
  showErrorMessage,
  disabled,
}: RadioPlaygroundArgs) {
  const [checked, setChecked] = useState(initialChecked);

  return (
    <Field width={320}>
      <Radio
        size={size}
        label={label}
        checked={checked}
        error={error}
        helperText={showHelperText ? helperText : undefined}
        errorMessage={showErrorMessage ? errorMessage : undefined}
        disabled={disabled}
        onPress={() => setChecked((prev) => !prev)}
      />
    </Field>
  );
}

const meta = {
  title: "Form/Radio",
  argTypes: {
    label: { control: "text" },
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
    label: "옵션 A",
    size: "md",
    checked: false,
    error: false,
    helperText: "하나를 선택하세요.",
    showHelperText: false,
    errorMessage: "선택이 필요합니다.",
    showErrorMessage: false,
    disabled: false,
  },
  render: (args) => <RadioPlayground {...args} />,
} satisfies Meta<RadioPlaygroundArgs>;

export default meta;
type Story = StoryObj<RadioPlaygroundArgs>;

export const Playground: Story = {};

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: function RadioOverviewStory() {
    const [payment, setPayment] = useState("card");

    return (
      <OverviewRoot>
        <SubSection title="Overview">
          <Stack>
            <Radio label="옵션 A" />
            <Radio label="옵션 B" checked />
            <Radio label="옵션 C" errorMessage="옵션을 선택해주세요." />
            <Radio label="옵션 D" checked disabled />
          </Stack>
        </SubSection>
        <SubSection title="Sizes">
          <Stack>
            <Radio size="sm" label="Small" checked />
            <Radio size="md" label="Medium" checked />
            <Radio size="lg" label="Large" checked />
          </Stack>
        </SubSection>
        <SubSection title="Group">
          <Stack>
            <Typography.Label>결제 수단</Typography.Label>
            <Radio
              label="신용카드"
              checked={payment === "card"}
              onPress={() => setPayment("card")}
            />
            <Radio
              label="계좌이체"
              checked={payment === "transfer"}
              onPress={() => setPayment("transfer")}
            />
            <Radio
              label="간편결제"
              checked={payment === "easy"}
              onPress={() => setPayment("easy")}
            />
          </Stack>
        </SubSection>
      </OverviewRoot>
    );
  },
};
