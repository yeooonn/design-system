import type { Meta, StoryObj } from "@storybook/react-native";
import { useEffect, useState } from "react";
import { fruitOptions } from "../../stories/options";
import {
  Field,
  OverviewRoot,
  Row,
  Stack,
  SubSection,
} from "../../stories/layout";
import { Select } from "./index";
import type { SelectSize, SelectVariant } from "./index";

type SelectPlaygroundArgs = {
  variant: SelectVariant;
  size: SelectSize;
  label: string;
  showLabel: boolean;
  placeholder: string;
  value: string;
  error: boolean;
  helperText: string;
  showHelperText: boolean;
  errorMessage: string;
  showErrorMessage: boolean;
  disabled: boolean;
};

function SelectPlayground({
  variant,
  size,
  label,
  showLabel,
  placeholder,
  value,
  error,
  helperText,
  showHelperText,
  errorMessage,
  showErrorMessage,
  disabled,
}: SelectPlaygroundArgs) {
  const [selected, setSelected] = useState(value);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  return (
    <Field width={320}>
      <Select
        variant={variant}
        size={size}
        label={showLabel ? label : undefined}
        placeholder={placeholder}
        options={[...fruitOptions]}
        value={selected}
        onValueChange={setSelected}
        error={error}
        helperText={showHelperText ? helperText : undefined}
        errorMessage={showErrorMessage ? errorMessage : undefined}
        disabled={disabled}
      />
    </Field>
  );
}

const meta = {
  title: "Form/Select",
  argTypes: {
    variant: { control: "select", options: ["box", "line"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    label: { control: "text", if: { arg: "showLabel", truthy: true } },
    showLabel: { control: "boolean" },
    placeholder: { control: "text" },
    value: { control: "text" },
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
    variant: "box",
    size: "md",
    label: "과일",
    showLabel: true,
    placeholder: "과일을 선택하세요",
    value: "",
    error: false,
    helperText: "좋아하는 과일을 선택해주세요.",
    showHelperText: false,
    errorMessage: "과일을 선택해주세요.",
    showErrorMessage: false,
    disabled: false,
  },
  render: (args) => <SelectPlayground {...args} />,
} satisfies Meta<SelectPlaygroundArgs>;

export default meta;
type Story = StoryObj<SelectPlaygroundArgs>;

export const Playground: Story = {};

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <OverviewRoot>
      <SubSection title="Box">
        <Row gap={16}>
          <Field>
            <Select
              placeholder="과일을 선택하세요"
              options={[...fruitOptions]}
            />
          </Field>
          <Field>
            <Select
              placeholder="과일을 선택하세요"
              options={[...fruitOptions]}
              defaultValue="banana"
            />
          </Field>
          <Field>
            <Select
              placeholder="과일을 선택하세요"
              options={[...fruitOptions]}
              value="orange"
              error
              errorMessage="과일을 선택해주세요."
            />
          </Field>
          <Field>
            <Select
              placeholder="과일을 선택하세요"
              options={[...fruitOptions]}
              defaultValue="apple"
              disabled
            />
          </Field>
        </Row>
      </SubSection>

      <SubSection title="Line">
        <Row gap={16}>
          <Field>
            <Select
              variant="line"
              label="과일"
              placeholder="과일을 선택하세요"
              options={[...fruitOptions]}
            />
          </Field>
          <Field>
            <Select
              variant="line"
              label="과일"
              placeholder="과일을 선택하세요"
              options={[...fruitOptions]}
              defaultValue="banana"
            />
          </Field>
          <Field>
            <Select
              variant="line"
              label="과일"
              placeholder="과일을 선택하세요"
              options={[...fruitOptions]}
              value="orange"
              error
              errorMessage="과일을 선택해주세요."
            />
          </Field>
          <Field>
            <Select
              variant="line"
              label="과일"
              placeholder="과일을 선택하세요"
              options={[...fruitOptions]}
              defaultValue="apple"
              disabled
            />
          </Field>
        </Row>
      </SubSection>

      <SubSection title="Sizes">
        <Stack gap={16}>
          <Field width={320}>
            <Select size="sm" placeholder="sm" options={[...fruitOptions]} />
          </Field>
          <Field width={320}>
            <Select size="md" placeholder="md" options={[...fruitOptions]} />
          </Field>
          <Field width={320}>
            <Select size="lg" placeholder="lg" options={[...fruitOptions]} />
          </Field>
        </Stack>
      </SubSection>
    </OverviewRoot>
  ),
};
