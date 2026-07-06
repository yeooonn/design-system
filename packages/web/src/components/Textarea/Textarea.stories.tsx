import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Textarea } from "./index";
import type { TextareaSize } from "./textareaStyles";

type TextareaPlaygroundArgs = {
  size: TextareaSize;
  label: string;
  showLabel: boolean;
  placeholder: string;
  value: string;
  error: boolean;
  disabled: boolean;
  showCount: boolean;
  countMax: number;
  countUnit: string;
  showExampleText: boolean;
};

const exampleText = (
  <>
    <div>내용 입력 시 폰트 컬러입니다.</div>
    <div>- 내용이 길 경우 자동으로 장문(LMS) 전환</div>
    <div>- 이미지가 첨부 될 경우 자동으로 멀티(MMS) 전환</div>
  </>
);

function TextareaDemo({
  value: initialValue = "",
  countMax = 90,
  showCount = false,
  showExampleText = false,
  ...props
}: React.ComponentProps<typeof Textarea> & {
  value?: string;
  showExampleText?: boolean;
}) {
  const [value, setValue] = useState(initialValue);
  const count = value.length;
  const isCountExceeded = showCount && count > countMax;

  return (
    <Textarea
      {...props}
      value={value}
      onChange={(event) => setValue(event.target.value)}
      showCount={showCount}
      count={count}
      countMax={countMax}
      isCountExceeded={isCountExceeded}
      showExample={showExampleText && value.length === 0}
      exampleText={showExampleText ? exampleText : undefined}
    />
  );
}

const meta: Meta<TextareaPlaygroundArgs> = {
  title: "Textarea",
  component: Textarea,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    label: {
      control: "text",
      if: { arg: "showLabel", truthy: true },
      description: "라벨 텍스트",
    },
    showLabel: { control: "boolean", description: "라벨 표시" },
    placeholder: { control: "text" },
    value: { control: "text" },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    showCount: { control: "boolean", description: "글자 수 표시" },
    countMax: {
      control: "number",
      if: { arg: "showCount", truthy: true },
      description: "최대 글자 수",
    },
    countUnit: {
      control: "text",
      if: { arg: "showCount", truthy: true },
      description: "글자 수 단위",
    },
    showExampleText: { control: "boolean", description: "예시 문구 표시" },
  },
  args: {
    size: "md",
    label: "메시지",
    showLabel: false,
    placeholder: "",
    value: "",
    error: false,
    disabled: false,
    showCount: true,
    countMax: 90,
    countUnit: "자",
    showExampleText: true,
  },
  render: ({
    size,
    label,
    showLabel,
    placeholder,
    value,
    error,
    disabled,
    showCount,
    countMax,
    countUnit,
    showExampleText,
  }) => (
    <div style={{ width: 360 }}>
      <TextareaDemo
        size={size}
        label={showLabel ? label : undefined}
        placeholder={placeholder}
        value={value}
        error={error}
        disabled={disabled}
        showCount={showCount}
        countMax={countMax}
        countUnit={countUnit}
        showExampleText={showExampleText}
      />
    </div>
  ),
};

export default meta;
type Story = StoryObj<TextareaPlaygroundArgs>;

export const Playground: Story = {};

export const WithCountAndExample: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ width: 360 }}>
      <TextareaDemo showCount countMax={90} countUnit="자" showExampleText />
    </div>
  ),
};

export const States: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <div style={{ width: 280 }}>
        <TextareaDemo
          label="메시지"
          showCount
          countMax={90}
          countUnit="자"
          showExampleText
        />
      </div>
      <div style={{ width: 280 }}>
        <Textarea
          label="메시지"
          showCount
          count={17}
          countMax={90}
          countUnit="자"
          value="입력된 메시지 내용입니다."
          readOnly
        />
      </div>
      <div style={{ width: 280 }}>
        <Textarea
          label="메시지"
          showCount
          count={17}
          countMax={90}
          countUnit="자"
          value="입력된 메시지 내용입니다."
          error
          readOnly
        />
      </div>
      <div style={{ width: 280 }}>
        <Textarea
          label="메시지"
          showCount
          count={17}
          countMax={90}
          countUnit="자"
          value="입력된 메시지 내용입니다."
          disabled
          readOnly
        />
      </div>
    </div>
  ),
};

export const CountExceeded: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ width: 360 }}>
      <Textarea
        label="메시지"
        showCount
        count={20}
        countMax={10}
        countUnit="자"
        isCountExceeded
        value="글자 수 제한을 초과한 메시지입니다."
        readOnly
      />
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 360 }}>
      <Textarea size="sm" showCount count={0} countMax={90} countUnit="자" placeholder="sm" />
      <Textarea size="md" showCount count={0} countMax={90} countUnit="자" placeholder="md" />
      <Textarea size="lg" showCount count={0} countMax={90} countUnit="자" placeholder="lg" />
    </div>
  ),
};
