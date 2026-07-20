import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { iconSources } from "../../stories/iconSources";
import { OverviewRoot, Row, SubSection } from "../../stories/layout";
import { useToast, type ToastPosition } from "./index";

const positions: ToastPosition[] = [
  "top-left",
  "top-right",
  "top-center",
  "bottom-left",
  "bottom-right",
  "bottom-center",
];

type ToastPlaygroundArgs = {
  text: string;
  position: ToastPosition;
  duration: number;
  withIcon: boolean;
};

function ToastPlayground({
  text,
  position,
  duration,
  withIcon,
}: ToastPlaygroundArgs) {
  const toast = useToast();

  return (
    <Button
      onPress={() =>
        toast.open({
          text,
          position,
          duration,
          ...(withIcon
            ? {
                leftAddon: (
                  <Icon
                    size="md"
                    color="success"
                    source={{ uri: iconSources.check }}
                  />
                ),
              }
            : {}),
        })
      }
    >
      토스트 열기
    </Button>
  );
}

function ToastOverviewPositionGrid() {
  const toast = useToast();

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
        maxWidth: 480,
      }}
    >
      {positions.map((position) => (
        <Button
          key={position}
          size="sm"
          variant="outlined"
          onPress={() =>
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
    </View>
  );
}

function ToastOverviewStackDemo() {
  const toast = useToast();

  return (
    <Row>
      <Button
        onPress={() =>
          toast.open({
            text: `토스트 ${Date.now().toString().slice(-4)}`,
            position: "bottom-center",
          })
        }
      >
        스택 추가
      </Button>
      <Button variant="ghost" onPress={() => toast.closeAll()}>
        모두 닫기
      </Button>
    </Row>
  );
}

function ToastOverviewWithIconDemo() {
  const toast = useToast();

  return (
    <Row>
      <Button
        onPress={() =>
          toast.open({
            text: "저장됐어요",
            position: "top-center",
            leftAddon: (
              <Icon size="sm" color="success" source={{ uri: iconSources.check }} />
            ),
          })
        }
      >
        <Icon size="sm" color="inverse" source={{ uri: iconSources.check }} />
        저장됐어요
      </Button>
      <Button
        variant="outlined"
        onPress={() =>
          toast.open({
            text: "확인이 필요해요",
            position: "top-center",
            leftAddon: (
              <Icon
                size="sm"
                color="warning"
                source={{ uri: iconSources.warning }}
              />
            ),
          })
        }
      >
        <Icon size="sm" color="warning" source={{ uri: iconSources.warning }} />
        확인이 필요해요
      </Button>
      <Button
        variant="outlined"
        color="danger"
        onPress={() =>
          toast.open({
            text: "요청에 실패했습니다",
            position: "top-center",
            leftAddon: (
              <Icon size="sm" color="error" source={{ uri: iconSources.warning }} />
            ),
          })
        }
      >
        <Icon size="sm" color="error" source={{ uri: iconSources.warning }} />
        요청에 실패했습니다
      </Button>
      <Button
        variant="ghost"
        onPress={() =>
          toast.open({
            text: "새 알림이 있어요",
            position: "top-center",
            leftAddon: (
              <Icon size="sm" color="primary" source={{ uri: iconSources.bell }} />
            ),
          })
        }
      >
        <Icon size="sm" color="primary" source={{ uri: iconSources.bell }} />새 알림이
        있어요
      </Button>
    </Row>
  );
}

const meta = {
  title: "Feedback/Toast",
  argTypes: {
    text: { control: "text" },
    position: { control: "select", options: positions },
    duration: { control: { type: "number", min: 0, step: 500 } },
    withIcon: { control: "boolean" },
  },
  args: {
    text: "토스트 메시지이에요",
    position: "bottom-center",
    duration: 3000,
    withIcon: false,
  },
  render: (args) => <ToastPlayground {...args} />,
} satisfies Meta<ToastPlaygroundArgs>;

export default meta;
type Story = StoryObj<ToastPlaygroundArgs>;

export const Playground: Story = {};

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <OverviewRoot>
      <SubSection title="Positions">
        <ToastOverviewPositionGrid />
      </SubSection>
      <SubSection title="With Icon">
        <ToastOverviewWithIconDemo />
      </SubSection>
      <SubSection title="Stack">
        <ToastOverviewStackDemo />
      </SubSection>
    </OverviewRoot>
  ),
};

export const WithIcon: Story = {
  args: {
    text: "아이콘이 포함된 토스트이에요",
    position: "top-center",
    withIcon: true,
  },
};
