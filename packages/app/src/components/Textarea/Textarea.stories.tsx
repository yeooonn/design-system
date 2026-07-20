import type { Meta, StoryObj } from "@storybook/react-native";
import { useState, type ComponentProps } from "react";
import { Text } from "react-native";
import {
  Field,
  OverviewRoot,
  Row,
  Stack,
  SubSection,
} from "../../stories/layout";
import { useTheme } from "../../theme/ThemeProvider";
import { Textarea } from "./index";
import type { TextareaSize } from "./index";

type TextareaPlaygroundArgs = {
  size: TextareaSize;
  label: string;
  showLabel: boolean;
  placeholder: string;
  showCount: boolean;
  countMax: number;
  error: boolean;
  disabled: boolean;
};

function TextareaPlayground({
  size,
  label,
  showLabel,
  placeholder,
  showCount,
  countMax,
  error,
  disabled,
}: TextareaPlaygroundArgs) {
  const [value, setValue] = useState("");
  const count = value.length;

  return (
    <Field width={320}>
      <Textarea
        size={size}
        label={showLabel ? label : undefined}
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        showCount={showCount}
        count={count}
        countMax={countMax}
        isCountExceeded={count > countMax}
        countOverMessage="글자 수를 초과했습니다."
        error={error}
        disabled={disabled}
      />
    </Field>
  );
}

function TextareaOverviewExampleText() {
  const { theme } = useTheme();

  return (
    <>
      <Text style={{ color: theme.text.tertiary }}>
        내용 입력 시 폰트 컬러입니다.
      </Text>
      <Text style={{ color: theme.text.tertiary }}>
        - 내용이 길 경우 자동으로 장문(LMS) 전환
      </Text>
      <Text style={{ color: theme.text.tertiary }}>
        - 이미지가 첨부 될 경우 자동으로 멀티(MMS) 전환
      </Text>
    </>
  );
}

function TextareaOverviewDemo({
  initialValue = "",
  countMax = 90,
  showCount = false,
  showExampleText = false,
  ...props
}: ComponentProps<typeof Textarea> & {
  initialValue?: string;
  showExampleText?: boolean;
}) {
  const [value, setValue] = useState(initialValue);
  const count = value.length;
  const isCountExceeded = showCount && count > countMax;

  return (
    <Textarea
      {...props}
      value={value}
      onChangeText={setValue}
      showCount={showCount}
      count={count}
      countMax={countMax}
      isCountExceeded={isCountExceeded}
      showExample={showExampleText && value.length === 0}
      exampleText={showExampleText ? <TextareaOverviewExampleText /> : undefined}
    />
  );
}

const meta = {
  title: "Form/Textarea",
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    label: { control: "text", if: { arg: "showLabel", truthy: true } },
    showLabel: { control: "boolean" },
    placeholder: { control: "text" },
    showCount: { control: "boolean" },
    countMax: { control: "number" },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    size: "md",
    label: "메모",
    showLabel: true,
    placeholder: "내용을 입력하세요",
    showCount: true,
    countMax: 100,
    error: false,
    disabled: false,
  },
  render: (args) => <TextareaPlayground {...args} />,
} satisfies Meta<TextareaPlaygroundArgs>;

export default meta;
type Story = StoryObj<TextareaPlaygroundArgs>;

export const Playground: Story = {};

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <OverviewRoot>
      <SubSection title="States">
        <Row gap={16}>
          <Field width={280}>
            <TextareaOverviewDemo
              label="메시지"
              showCount
              countMax={90}
              countUnit="자"
              placeholder="내용을 입력하세요"
            />
          </Field>
          <Field width={280}>
            <Textarea
              label="메시지"
              showCount
              count={17}
              countMax={90}
              countUnit="자"
              value="입력된 메시지 내용입니다."
              editable={false}
            />
          </Field>
          <Field width={280}>
            <Textarea
              label="메시지"
              showCount
              count={17}
              countMax={90}
              countUnit="자"
              value="입력된 메시지 내용입니다."
              error
              editable={false}
            />
          </Field>
          <Field width={280}>
            <Textarea
              label="메시지"
              showCount
              count={17}
              countMax={90}
              countUnit="자"
              value="입력된 메시지 내용입니다."
              disabled
            />
          </Field>
        </Row>
      </SubSection>

      <SubSection title="Count Exceeded">
        <Field width={360}>
          <Textarea
            label="메시지"
            showCount
            count={20}
            countMax={10}
            countUnit="자"
            isCountExceeded
            value="글자 수 제한을 초과한 메시지입니다."
            editable={false}
          />
        </Field>
      </SubSection>

      <SubSection title="Example Text">
        <Field width={360}>
          <TextareaOverviewDemo
            label="메시지"
            showCount
            countMax={90}
            countUnit="자"
            showExampleText
          />
        </Field>
      </SubSection>

      <SubSection title="Sizes">
        <Stack gap={16}>
          <Field width={360}>
            <Textarea
              size="sm"
              showCount
              count={0}
              countMax={90}
              countUnit="자"
              placeholder="sm"
            />
          </Field>
          <Field width={360}>
            <Textarea
              size="md"
              showCount
              count={0}
              countMax={90}
              countUnit="자"
              placeholder="md"
            />
          </Field>
          <Field width={360}>
            <Textarea
              size="lg"
              showCount
              count={0}
              countMax={90}
              countUnit="자"
              placeholder="lg"
            />
          </Field>
        </Stack>
      </SubSection>
    </OverviewRoot>
  ),
};
