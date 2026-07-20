import type { Meta, StoryObj } from "@storybook/react-native";
import {
  Field,
  OverviewRoot,
  Row,
  Stack,
  SubSection,
} from "../../stories/layout";
import { Typography } from "../Typography";
import { Input } from "./index";
import type { InputSize, InputVariant } from "./index";

type InputPlaygroundArgs = {
  variant: InputVariant;
  size: InputSize;
  label: string;
  showLabel: boolean;
  showPrefix: boolean;
  showSuffix: boolean;
  placeholder: string;
  defaultValue: string;
  error: boolean;
  helperText: string;
  showHelperText: boolean;
  errorMessage: string;
  showErrorMessage: boolean;
  disabled: boolean;
};

const meta = {
  title: "Form/Input",
  argTypes: {
    variant: { control: "select", options: ["box", "line"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    label: { control: "text", if: { arg: "showLabel", truthy: true } },
    showLabel: { control: "boolean" },
    showPrefix: { control: "boolean" },
    showSuffix: { control: "boolean" },
    placeholder: { control: "text" },
    defaultValue: { control: "text" },
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
    label: "금액",
    showLabel: false,
    showPrefix: true,
    showSuffix: true,
    placeholder: "금액을 입력하세요",
    defaultValue: "",
    error: false,
    helperText: "숫자만 입력할 수 있습니다.",
    showHelperText: false,
    errorMessage: "올바른 금액을 입력해주세요.",
    showErrorMessage: false,
    disabled: false,
  },
  render: ({
    variant,
    size,
    label,
    showLabel,
    showPrefix,
    showSuffix,
    placeholder,
    defaultValue,
    error,
    helperText,
    showHelperText,
    errorMessage,
    showErrorMessage,
    disabled,
  }) => (
    <Field width={320}>
      <Input
        variant={variant}
        size={size}
        label={showLabel ? label : undefined}
        prefix={showPrefix ? <Typography.P2>$</Typography.P2> : undefined}
        suffix={showSuffix ? <Typography.Caption>USD</Typography.Caption> : undefined}
        placeholder={placeholder}
        defaultValue={defaultValue || undefined}
        error={error}
        helperText={showHelperText ? helperText : undefined}
        errorMessage={showErrorMessage ? errorMessage : undefined}
        disabled={disabled}
      />
    </Field>
  ),
} satisfies Meta<InputPlaygroundArgs>;

export default meta;
type Story = StoryObj<InputPlaygroundArgs>;

export const Playground: Story = {};

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <OverviewRoot>
      <SubSection title="Box">
        <Row gap={16}>
          <Field>
            <Input
              prefix={<Typography.P2>$</Typography.P2>}
              suffix={<Typography.Caption>USD</Typography.Caption>}
              placeholder="금액을 입력하세요"
            />
          </Field>
          <Field>
            <Input
              prefix={<Typography.P2>$</Typography.P2>}
              suffix={<Typography.Caption>USD</Typography.Caption>}
              defaultValue="1,000"
            />
          </Field>
          <Field>
            <Input
              prefix={<Typography.P2>$</Typography.P2>}
              suffix={<Typography.Caption>USD</Typography.Caption>}
              defaultValue="1,000"
              error
              errorMessage="올바른 금액을 입력해주세요."
            />
          </Field>
          <Field>
            <Input
              prefix={<Typography.P2>$</Typography.P2>}
              suffix={<Typography.Caption>USD</Typography.Caption>}
              defaultValue="1,000"
              disabled
            />
          </Field>
        </Row>
      </SubSection>

      <SubSection title="Line">
        <Row gap={16}>
          <Field>
            <Input
              variant="line"
              label="금액"
              prefix={<Typography.P2>$</Typography.P2>}
              suffix={<Typography.Caption>USD</Typography.Caption>}
              placeholder="금액을 입력하세요"
            />
          </Field>
          <Field>
            <Input
              variant="line"
              label="금액"
              prefix={<Typography.P2>$</Typography.P2>}
              suffix={<Typography.Caption>USD</Typography.Caption>}
              defaultValue="1,000"
              error
              errorMessage="올바른 금액을 입력해주세요."
            />
          </Field>
          <Field>
            <Input
              variant="line"
              label="금액"
              prefix={<Typography.P2>$</Typography.P2>}
              suffix={<Typography.Caption>USD</Typography.Caption>}
              defaultValue="1,000"
              disabled
            />
          </Field>
        </Row>
      </SubSection>

      <SubSection title="Sizes">
        <Stack gap={16}>
          <Input
            size="sm"
            prefix={<Typography.P2>$</Typography.P2>}
            suffix={<Typography.Caption>USD</Typography.Caption>}
            placeholder="sm"
          />
          <Input
            size="md"
            prefix={<Typography.P2>$</Typography.P2>}
            suffix={<Typography.Caption>USD</Typography.Caption>}
            placeholder="md"
          />
          <Input
            size="lg"
            prefix={<Typography.P2>$</Typography.P2>}
            suffix={<Typography.Caption>USD</Typography.Caption>}
            placeholder="lg"
          />
        </Stack>
      </SubSection>

      <SubSection title="Helper / Error">
        <Row gap={16}>
          <Field width={280}>
            <Input
              label="이메일"
              placeholder="example@email.com"
              helperText="가입 시 사용한 이메일을 입력해주세요."
            />
          </Field>
          <Field width={280}>
            <Input
              label="이메일"
              defaultValue="invalid-email"
              errorMessage="올바른 이메일 형식이 아닙니다."
            />
          </Field>
        </Row>
      </SubSection>
    </OverviewRoot>
  ),
};
