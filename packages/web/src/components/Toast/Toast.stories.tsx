import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button";
import { ToastProvider, useToast } from "./index";
import type { ToastPosition } from "./index";

const positions: ToastPosition[] = [
  "top-left",
  "top-right",
  "top-center",
  "bottom-left",
  "bottom-right",
  "bottom-center",
];

function CheckIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
    >
      <circle cx="10" cy="10" r="9" fill="#22C55E" />
      <path
        d="M6 10.2L8.6 12.8L14 7.4"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function buildOpenSource({
  text,
  position,
  duration,
  withIcon,
}: {
  text?: string;
  position?: ToastPosition;
  duration?: number;
  withIcon?: boolean;
}) {
  const resolvedText = text ?? "토스트 메시지이에요";
  const resolvedPosition = position ?? "bottom-center";
  const resolvedDuration = duration ?? 3000;
  const leftAddonLine = withIcon ? `\n  leftAddon: <CheckIcon />,` : "";

  return `toast.open({
  text: "${resolvedText}",
  position: "${resolvedPosition}",
  duration: ${resolvedDuration},${leftAddonLine}
});`;
}

const positionsSource = `toast.open({
  text: "top-center",
  position: "top-center",
  duration: 3000,
});`;

const stackSource = `toast.open({
  text: "토스트 메시지",
  position: "bottom-center",
});

toast.closeAll();`;

type ToastStoryArgs = {
  text: string;
  position: ToastPosition;
  duration: number;
  withIcon: boolean;
};

function PositionGrid() {
  const toast = useToast();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: 12,
        maxWidth: 480,
      }}
    >
      {positions.map((position) => (
        <Button
          key={position}
          size="sm"
          variant="outlined"
          onClick={() =>
            toast.open({
              text: position,
              position,
              duration: 3000,
            })
          }
        >
          {position}
        </Button>
      ))}
    </div>
  );
}

function StackDemo() {
  const toast = useToast();

  return (
    <div style={{ display: "flex", gap: 12 }}>
      <Button
        onClick={() =>
          toast.open({
            text: `토스트 ${Date.now().toString().slice(-4)}`,
            position: "bottom-center",
          })
        }
      >
        스택 추가
      </Button>
      <Button variant="ghost" onClick={() => toast.closeAll()}>
        모두 닫기
      </Button>
    </div>
  );
}

const withToastProvider: Decorator = (Story) => (
  <ToastProvider>
    <Story />
  </ToastProvider>
);

const toastOpenSource = {
  type: "dynamic" as const,
  language: "tsx",
  transform: (_code: string, { args }: { args: Record<string, unknown> }) =>
    buildOpenSource({
      text: args.text as string,
      position: args.position as ToastPosition,
      duration: args.duration as number,
      withIcon: Boolean(args.withIcon),
    }),
};

const meta: Meta<ToastStoryArgs> = {
  title: "Toast",
  decorators: [withToastProvider],
  argTypes: {
    text: { control: "text", description: "토스트 메시지" },
    position: {
      control: "select",
      options: positions,
      description: "화면 위치",
    },
    duration: {
      control: { type: "number", min: 0, step: 500 },
      description: "자동 닫힘 시간 (ms)",
    },
    withIcon: {
      control: "boolean",
      description: "leftAddon 아이콘 표시",
    },
  },
  args: {
    text: "토스트 메시지이에요",
    position: "bottom-center",
    duration: 3000,
    withIcon: false,
  },
  parameters: {
    docs: {
      description: {
        component:
          "명령형 Toast. 앱 루트에 `ToastProvider`를 두고 `useToast().open()`으로 표시합니다.",
      },
      source: toastOpenSource,
    },
  },
  render: function ToastRender({ text, position, duration, withIcon }) {
    const toast = useToast();

    return (
      <Button
        onClick={() =>
          toast.open({
            text,
            position,
            duration,
            ...(withIcon ? { leftAddon: <CheckIcon /> } : {}),
          })
        }
      >
        토스트 열기
      </Button>
    );
  },
};

export default meta;
type Story = StoryObj<ToastStoryArgs>;

export const Playground: Story = {};

export const Positions: Story = {
  name: "Positions",
  render: () => <PositionGrid />,
  parameters: {
    docs: {
      description: {
        story: "6가지 position을 각각 열어볼 수 있습니다.",
      },
      source: {
        type: "code",
        language: "tsx",
        code: positionsSource,
      },
    },
  },
};

export const WithLeftAddon: Story = {
  name: "With leftAddon",
  args: {
    text: "아이콘이 포함된 토스트이에요",
    position: "top-center",
    withIcon: true,
  },
};

export const Stack: Story = {
  name: "Stack",
  render: () => <StackDemo />,
  parameters: {
    docs: {
      description: {
        story: "같은 position에 여러 토스트를 쌓을 수 있습니다.",
      },
      source: {
        type: "code",
        language: "tsx",
        code: stackSource,
      },
    },
  },
};

export const Usage: Story = {
  name: "Usage",
  args: {
    text: "저장됐어요",
    position: "top-center",
    duration: 3000,
    withIcon: true,
  },
};
