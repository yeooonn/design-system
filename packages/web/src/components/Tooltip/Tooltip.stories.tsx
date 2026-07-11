import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "../Button";
import { Tooltip } from "./index";
import type { TooltipPosition } from "./tooltipStyles";

const positions: TooltipPosition[] = ["top", "bottom", "left", "right"];

const usageSource = `import { Tooltip, Button } from "@yeoooonn/ds-web";

function Example() {
  return (
    <Tooltip message="툴팁입니다.">
      <Button>호버해보세요</Button>
    </Tooltip>
  );
}`;

type TooltipStoryArgs = {
  message: string;
  position: TooltipPosition;
  autoFlip: boolean;
  showArrow: boolean;
  delay: number;
};

function ControlledDemo({ message }: { message: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button onClick={() => setOpen((prev) => !prev)}>
        {open ? "툴팁 닫기" : "툴팁 열기"}
      </Button>
      <Tooltip message={message} open={open} position="bottom">
        <Button variant="outlined">트리거</Button>
      </Tooltip>
    </div>
  );
}

function PositionGrid({
  message,
  showArrow,
}: {
  message: string;
  showArrow: boolean;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: 24,
        maxWidth: 360,
        padding: 48,
      }}
    >
      {positions.map((position) => (
        <Tooltip
          key={position}
          message={`${message} (${position})`}
          position={position}
          showArrow={showArrow}
        >
          <Button size="sm" variant="outlined">
            {position}
          </Button>
        </Tooltip>
      ))}
    </div>
  );
}

function AutoFlipDemo({ message }: { message: string }) {
  return (
    <div
      style={{
        height: 280,
        overflow: "auto",
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        padding: 16,
      }}
    >
      <p style={{ margin: "0 0 12px", color: "#6b7280", fontSize: 14 }}>
        아래로 스크롤하면 하단 트리거 툴팁이 위로 flip 됩니다. (controlled
        open으로 스크롤 중에도 유지)
      </p>
      <div style={{ height: 320 }} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Tooltip
          message={message}
          position="bottom"
          autoFlip
          showArrow
          open
        >
          <Button>autoFlip 트리거</Button>
        </Tooltip>
      </div>
      <div style={{ height: 320 }} />
    </div>
  );
}

const meta: Meta<TooltipStoryArgs> = {
  title: "Tooltip",
  argTypes: {
    message: { control: "text", description: "툴팁 메시지" },
    position: {
      control: "select",
      options: positions,
      description: "선호 위치",
    },
    autoFlip: {
      control: "boolean",
      description: "viewport 밖이면 주축 반대편으로 flip",
    },
    showArrow: {
      control: "boolean",
      description: "화살표 표시",
    },
    delay: {
      control: { type: "number", min: 0, step: 50 },
      description: "hover 표시 지연 (ms)",
    },
  },
  args: {
    message: "툴팁입니다.",
    position: "bottom",
    autoFlip: false,
    showArrow: false,
    delay: 0,
  },
  parameters: {
    docs: {
      description: {
        component:
          "트리거를 감싸는 Tooltip. `open`이 없으면 hover/focus로 열고(스크롤 시 즉시 닫힘), 있으면 controlled로 동작합니다(스크롤 시 위치만 갱신).",
      },
    },
  },
};

export default meta;
type Story = StoryObj<TooltipStoryArgs>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ padding: 48 }}>
      <Tooltip
        message={args.message}
        position={args.position}
        autoFlip={args.autoFlip}
        showArrow={args.showArrow}
        delay={args.delay}
      >
        <Button>호버해보세요</Button>
      </Tooltip>
    </div>
  ),
};

export const Controlled: Story = {
  name: "Controlled",
  render: (args) => <ControlledDemo message={args.message} />,
  parameters: {
    docs: {
      description: {
        story: "`open` prop으로 표시 여부를 부모가 제어합니다.",
      },
    },
  },
};

export const Positions: Story = {
  name: "Positions",
  render: (args) => (
    <PositionGrid message={args.message} showArrow={args.showArrow} />
  ),
};

export const AutoFlip: Story = {
  name: "AutoFlip",
  render: (args) => <AutoFlipDemo message={args.message} />,
  parameters: {
    docs: {
      description: {
        story:
          "스크롤로 트리거가 viewport 가장자리에 오면 `autoFlip`이 주축 반대편으로 위치를 바꿉니다.",
      },
    },
  },
};

export const WithArrow: Story = {
  name: "With arrow",
  args: {
    showArrow: true,
  },
  render: (args) => (
    <div style={{ padding: 48 }}>
      <Tooltip message={args.message} position={args.position} showArrow>
        <Button>화살표 툴팁</Button>
      </Tooltip>
    </div>
  ),
};

export const Usage: Story = {
  name: "Usage",
  render: () => (
    <div style={{ padding: 48 }}>
      <Tooltip message="툴팁입니다.">
        <Button>호버해보세요</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: usageSource,
      },
      description: {
        story: "소비 프로젝트에서의 기본 사용 예시입니다.",
      },
    },
  },
};
