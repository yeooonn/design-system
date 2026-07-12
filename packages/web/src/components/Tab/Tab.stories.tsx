import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tab } from "./index";
import type { TabSize } from "./tabStyles";

type TabPlaygroundArgs = {
  size: TabSize;
};

const meta: Meta<TabPlaygroundArgs> = {
  title: "Tab",
  parameters: {
    controls: {
      exclude: ["style", "className"],
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
  args: {
    size: "md",
  },
  render: ({ size }) => {
    const [selected, setSelected] = useState(0);

    return (
      <Tab size={size} onChange={setSelected}>
        <Tab.Item selected={selected === 0}>홈</Tab.Item>
        <Tab.Item selected={selected === 1}>탐색</Tab.Item>
        <Tab.Item selected={selected === 2}>설정</Tab.Item>
      </Tab>
    );
  },
};

export default meta;
type Story = StoryObj<TabPlaygroundArgs>;

export const Playground: Story = {};

export const Overview: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const [selected, setSelected] = useState(0);

    return (
      <Tab onChange={setSelected}>
        <Tab.Item selected={selected === 0}>홈</Tab.Item>
        <Tab.Item selected={selected === 1}>탐색</Tab.Item>
        <Tab.Item selected={selected === 2}>알림</Tab.Item>
        <Tab.Item selected={selected === 3}>설정</Tab.Item>
      </Tab>
    );
  },
};

export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const [selectedSm, setSelectedSm] = useState(0);
    const [selectedMd, setSelectedMd] = useState(0);
    const [selectedLg, setSelectedLg] = useState(0);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Tab size="sm" onChange={setSelectedSm}>
          <Tab.Item selected={selectedSm === 0}>small</Tab.Item>
          <Tab.Item selected={selectedSm === 1}>small</Tab.Item>
        </Tab>
        <Tab size="md" onChange={setSelectedMd}>
          <Tab.Item selected={selectedMd === 0}>medium</Tab.Item>
          <Tab.Item selected={selectedMd === 1}>medium</Tab.Item>
        </Tab>
        <Tab size="lg" onChange={setSelectedLg}>
          <Tab.Item selected={selectedLg === 0}>large</Tab.Item>
          <Tab.Item selected={selectedLg === 1}>large</Tab.Item>
        </Tab>
      </div>
    );
  },
};

export const WithDisabled: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const [selected, setSelected] = useState(0);

    return (
      <Tab onChange={setSelected}>
        <Tab.Item selected={selected === 0}>활성1</Tab.Item>
        <Tab.Item selected={selected === 1} disabled>
          비활성
        </Tab.Item>
        <Tab.Item selected={selected === 2}>활성2</Tab.Item>
      </Tab>
    );
  },
};

export const OverflowScroll: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const [selected, setSelected] = useState(0);
    const labels = [
      "홈",
      "탐색",
      "알림",
      "메시지",
      "북마크",
      "프로필",
      "설정",
      "더보기",
      "도움말",
      "정보",
    ];

    return (
      <div style={{ width: 320 }}>
        <Tab onChange={setSelected}>
          {labels.map((label, index) => (
            <Tab.Item key={label} selected={selected === index}>
              {label}
            </Tab.Item>
          ))}
        </Tab>
      </div>
    );
  },
};
