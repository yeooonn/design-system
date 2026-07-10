import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Select } from "./index";
import type { SelectSize, SelectVariant } from "./selectStyles";

const fruitOptions = [
  { value: "apple", label: "사과" },
  { value: "banana", label: "바나나" },
  { value: "orange", label: "오렌지" },
  { value: "grape", label: "포도" },
];

type SelectPlaygroundArgs = {
  variant: SelectVariant;
  size: SelectSize;
  label: string;
  showLabel: boolean;
  placeholder: string;
  showPlaceholder: boolean;
  value: string;
  error: boolean;
  helperText: string;
  showHelperText: boolean;
  errorMessage: string;
  showErrorMessage: boolean;
  disabled: boolean;
};

const meta: Meta<SelectPlaygroundArgs> = {
  title: "Select",
  component: Select,
  parameters: {
    controls: {
      exclude: ["style", "className"],
    },
  },
  argTypes: {
    variant: { control: "select", options: ["box", "line"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    style: { table: { disable: true } },
    className: { table: { disable: true } },
    label: {
      control: "text",
      if: { arg: "showLabel", truthy: true },
      description: "라벨 텍스트",
    },
    showLabel: { control: "boolean", description: "라벨 표시" },
    placeholder: {
      control: "text",
      if: { arg: "showPlaceholder", truthy: true },
      description: "placeholder 텍스트",
    },
    showPlaceholder: { control: "boolean", description: "placeholder 표시" },
    value: { control: "text" },
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
    variant: "box",
    size: "md",
    label: "과일",
    showLabel: false,
    placeholder: "과일을 선택하세요",
    showPlaceholder: true,
    value: "",
    error: false,
    helperText: "원하는 과일을 선택해주세요.",
    showHelperText: false,
    errorMessage: "과일을 선택해주세요.",
    showErrorMessage: false,
    disabled: false,
  },
  render: ({
    variant,
    size,
    label,
    showLabel,
    placeholder,
    showPlaceholder,
    value,
    error,
    helperText,
    showHelperText,
    errorMessage,
    showErrorMessage,
    disabled,
  }) => (
    <div style={{ width: 320 }}>
      <Select
        variant={variant}
        size={size}
        label={showLabel ? label : undefined}
        placeholder={showPlaceholder ? placeholder : undefined}
        options={fruitOptions}
        value={value}
        error={error}
        helperText={showHelperText ? helperText : undefined}
        errorMessage={showErrorMessage ? errorMessage : undefined}
        disabled={disabled}
      />
    </div>
  ),
};

export default meta;
type Story = StoryObj<SelectPlaygroundArgs>;

export const Playground: Story = {};

export const BoxOverview: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <div style={{ width: 240 }}>
        <Select placeholder="과일을 선택하세요" options={fruitOptions} />
      </div>
      <div style={{ width: 240 }}>
        <Select
          placeholder="과일을 선택하세요"
          options={fruitOptions}
          defaultValue="banana"
          autoFocus
        />
      </div>
      <div style={{ width: 240 }}>
        <Select
          placeholder="과일을 선택하세요"
          options={fruitOptions}
          value="orange"
          error
          errorMessage="과일을 선택해주세요."
        />
      </div>
      <div style={{ width: 240 }}>
        <Select
          placeholder="과일을 선택하세요"
          options={fruitOptions}
          defaultValue="apple"
          disabled
        />
      </div>
    </div>
  ),
};

export const LineOverview: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <div style={{ width: 240 }}>
        <Select
          variant="line"
          label="과일"
          placeholder="과일을 선택하세요"
          options={fruitOptions}
        />
      </div>
      <div style={{ width: 240 }}>
        <Select
          variant="line"
          label="과일"
          placeholder="과일을 선택하세요"
          options={fruitOptions}
          defaultValue="banana"
          autoFocus
        />
      </div>
      <div style={{ width: 240 }}>
        <Select
          variant="line"
          label="과일"
          placeholder="과일을 선택하세요"
          options={fruitOptions}
          value="orange"
          error
          errorMessage="과일을 선택해주세요."
        />
      </div>
      <div style={{ width: 240 }}>
        <Select
          variant="line"
          label="과일"
          placeholder="과일을 선택하세요"
          options={fruitOptions}
          defaultValue="apple"
          disabled
        />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 320 }}>
      <Select
        size="sm"
        placeholder="과일을 선택하세요"
        options={fruitOptions}
      />
      <Select
        size="md"
        placeholder="과일을 선택하세요"
        options={fruitOptions}
      />
      <Select
        size="lg"
        placeholder="과일을 선택하세요"
        options={fruitOptions}
      />
    </div>
  ),
};

export const HelperText: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 320 }}>
      <Select
        label="과일"
        placeholder="과일을 선택하세요"
        options={fruitOptions}
        helperText="원하는 과일을 선택해주세요."
      />
      <Select
        variant="line"
        label="과일"
        placeholder="과일을 선택하세요"
        options={fruitOptions}
        helperText="원하는 과일을 선택해주세요."
      />
    </div>
  ),
};

export const ErrorMessage: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 320 }}>
      <Select
        label="과일"
        placeholder="과일을 선택하세요"
        options={fruitOptions}
        errorMessage="과일을 선택해주세요."
      />
      <Select
        variant="line"
        label="과일"
        placeholder="과일을 선택하세요"
        options={fruitOptions}
        errorMessage="과일을 선택해주세요."
      />
    </div>
  ),
};

export const Controlled: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: function ControlledStory() {
    const [value, setValue] = useState("");

    return (
      <div style={{ width: 320, display: "flex", flexDirection: "column", gap: 8 }}>
        <Select
          label="과일"
          placeholder="과일을 선택하세요"
          options={fruitOptions}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          helperText={value ? `선택됨: ${value}` : "아직 선택하지 않았습니다."}
        />
      </div>
    );
  },
};
