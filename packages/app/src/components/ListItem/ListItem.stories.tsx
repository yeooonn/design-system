import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { OverviewRoot, Stack, SubSection } from "../../stories/layout";
import { Avatar } from "../Avatar";
import { Badge } from "../Badge";
import { Switch } from "../Switch";
import { Typography } from "../Typography";
import { ListItem } from "./index";

type ListItemPlaygroundArgs = {
  title: string;
  description: string;
  showDescription: boolean;
  showLeading: boolean;
  showTrailing: boolean;
  disabled: boolean;
};

const meta = {
  title: "Components/ListItem",
  argTypes: {
    title: { control: "text" },
    description: { control: "text", if: { arg: "showDescription", truthy: true } },
    showDescription: { control: "boolean" },
    showLeading: { control: "boolean" },
    showTrailing: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    title: "알림 설정",
    description: "푸시 알림을 관리합니다",
    showDescription: true,
    showLeading: true,
    showTrailing: true,
    disabled: false,
  },
  render: ({
    title,
    description,
    showDescription,
    showLeading,
    showTrailing,
    disabled,
  }) => (
    <ListItem
      title={title}
      description={showDescription ? description : undefined}
      leading={showLeading ? <Avatar name="Kim DS" size="sm" /> : undefined}
      trailing={showTrailing ? <Switch checked /> : undefined}
      disabled={disabled}
      onPress={() => undefined}
    />
  ),
} satisfies Meta<ListItemPlaygroundArgs>;

export default meta;
type Story = StoryObj<ListItemPlaygroundArgs>;

export const Playground: Story = {};

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <OverviewRoot>
      <SubSection title="Usage">
        <Stack gap={0}>
          <View style={{ maxWidth: 420, width: "100%" }}>
            <ListItem
              leading={<Avatar name="Kim Yeonjeong" />}
              title="김연정"
              description="디자인 시스템 메인테이너"
              trailing={<Badge color="blue">Admin</Badge>}
              onPress={() => undefined}
            />
            <ListItem
              leading={<Avatar name="Hong Gildong" />}
              title="홍길동"
              description="알림을 탭하면 상세로 이동합니다."
              trailing={
                <Typography.Caption color="secondary">
                  오후 3:20
                </Typography.Caption>
              }
              onPress={() => undefined}
            />
            <ListItem
              title="마케팅 알림"
              description="이벤트·프로모션 소식을 받습니다."
              trailing={<Switch />}
            />
            <ListItem
              title="비활성 항목"
              description="disabled 상태 예시입니다."
              disabled
              onPress={() => undefined}
            />
          </View>
        </Stack>
      </SubSection>
    </OverviewRoot>
  ),
};
