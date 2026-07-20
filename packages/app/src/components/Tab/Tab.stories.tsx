import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { View } from "react-native";
import { OverviewRoot, Stack, SubSection } from "../../stories/layout";
import { Tab } from "./index";
import type { TabSize } from "./index";

type TabPlaygroundArgs = {
  size: TabSize;
};

function TabPlayground({ size }: TabPlaygroundArgs) {
  const [selected, setSelected] = useState(0);

  return (
    <Tab size={size} onChange={setSelected}>
      <Tab.Item selected={selected === 0}>홈</Tab.Item>
      <Tab.Item selected={selected === 1}>탐색</Tab.Item>
      <Tab.Item selected={selected === 2}>설정</Tab.Item>
    </Tab>
  );
}

function TabOverviewTabs() {
  const [selected, setSelected] = useState(0);
  return (
    <Tab onChange={setSelected}>
      <Tab.Item selected={selected === 0}>홈</Tab.Item>
      <Tab.Item selected={selected === 1}>탐색</Tab.Item>
      <Tab.Item selected={selected === 2}>알림</Tab.Item>
      <Tab.Item selected={selected === 3}>설정</Tab.Item>
    </Tab>
  );
}

function TabOverviewSizeTabs() {
  const [sm, setSm] = useState(0);
  const [md, setMd] = useState(0);
  const [lg, setLg] = useState(0);
  return (
    <Stack gap={24}>
      <Tab size="sm" onChange={setSm}>
        <Tab.Item selected={sm === 0}>small</Tab.Item>
        <Tab.Item selected={sm === 1}>small</Tab.Item>
      </Tab>
      <Tab size="md" onChange={setMd}>
        <Tab.Item selected={md === 0}>medium</Tab.Item>
        <Tab.Item selected={md === 1}>medium</Tab.Item>
      </Tab>
      <Tab size="lg" onChange={setLg}>
        <Tab.Item selected={lg === 0}>large</Tab.Item>
        <Tab.Item selected={lg === 1}>large</Tab.Item>
      </Tab>
    </Stack>
  );
}

function TabOverviewDisabledTabs() {
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
}

function TabOverviewOverflowTabs() {
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
    <View style={{ width: 320, maxWidth: "100%" }}>
      <Tab onChange={setSelected}>
        {labels.map((label, index) => (
          <Tab.Item key={label} selected={selected === index}>
            {label}
          </Tab.Item>
        ))}
      </Tab>
    </View>
  );
}

const meta = {
  title: "Components/Tab",
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
  args: { size: "md" },
  render: (args) => <TabPlayground {...args} />,
} satisfies Meta<TabPlaygroundArgs>;

export default meta;
type Story = StoryObj<TabPlaygroundArgs>;

export const Playground: Story = {};

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <OverviewRoot>
      <SubSection title="Overview">
        <TabOverviewTabs />
      </SubSection>
      <SubSection title="Sizes">
        <TabOverviewSizeTabs />
      </SubSection>
      <SubSection title="Disabled">
        <TabOverviewDisabledTabs />
      </SubSection>
      <SubSection title="Overflow Scroll">
        <TabOverviewOverflowTabs />
      </SubSection>
    </OverviewRoot>
  ),
};
