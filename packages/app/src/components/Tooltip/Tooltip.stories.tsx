import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { Text, View } from "react-native";
import { OverviewRoot, Row, SubSection } from "../../stories/layout";
import { Button } from "../Button";
import { Tooltip } from "./index";
import type { TooltipPosition } from "./index";

type TooltipPlaygroundArgs = {
  message: string;
  position: TooltipPosition;
  showArrow: boolean;
  dismissible: boolean;
  autoHide: boolean;
};

function TooltipOverviewControlledDemo() {
  const [open, setOpen] = useState(false);

  return (
    <Row>
      <Button onPress={() => setOpen((prev) => !prev)}>
        {open ? "툴팁 닫기" : "툴팁 열기"}
      </Button>
      <Tooltip message="controlled 툴팁" open={open} position="bottom">
        <Button variant="outlined">트리거</Button>
      </Tooltip>
    </Row>
  );
}

const meta = {
  title: "Feedback/Tooltip",
  argTypes: {
    message: { control: "text" },
    position: { control: "select", options: ["top", "bottom", "left", "right"] },
    showArrow: { control: "boolean" },
    dismissible: { control: "boolean" },
    autoHide: { control: "boolean" },
  },
  args: {
    message: "도움말 텍스트",
    position: "bottom",
    showArrow: true,
    dismissible: true,
    autoHide: true,
  },
  render: ({ message, position, showArrow, dismissible, autoHide }) => (
    <Tooltip
      message={message}
      position={position}
      showArrow={showArrow}
      dismissible={dismissible}
      autoHide={autoHide}
    >
      <Button variant="outlined" color="dark">
        탭해서 툴팁 보기
      </Button>
    </Tooltip>
  ),
} satisfies Meta<TooltipPlaygroundArgs>;

export default meta;
type Story = StoryObj<TooltipPlaygroundArgs>;

export const Playground: Story = {};

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <OverviewRoot>
      <SubSection title="Positions">
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 48,
            maxWidth: 420,
            paddingVertical: 56,
            paddingHorizontal: 64,
          }}
        >
          {(["top", "bottom", "left", "right"] as const).map((position) => (
            <Tooltip
              key={position}
              message={`툴팁입니다. (${position})`}
              position={position}
              showArrow
            >
              <View
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderWidth: 1,
                  borderColor: "#d1d5db",
                  borderRadius: 8,
                }}
              >
                <Text>{position}</Text>
              </View>
            </Tooltip>
          ))}
        </View>
      </SubSection>

      <SubSection title="Controlled">
        <TooltipOverviewControlledDemo />
      </SubSection>
    </OverviewRoot>
  ),
};
