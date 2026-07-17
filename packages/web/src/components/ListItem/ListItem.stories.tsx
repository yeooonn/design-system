import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "../Avatar";
import { Icon } from "../Icon";
import { ListItem } from "./index";

const meta: Meta<typeof ListItem> = {
  title: "ListItem",
  component: ListItem,
};

export default meta;
type Story = StoryObj<typeof ListItem>;

export const Default: Story = {
  args: {
    title: "알림 설정",
    description: "푸시 알림 및 이메일 수신 여부를 관리합니다.",
  },
};

export const WithLeadingAndTrailing: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <ListItem
        title="프로필"
        description="이름, 아바타, 연락처"
        leading={<Avatar name="Kim Yeonjeong" size="md" />}
        trailing={
          <Icon
            src="https://static.toss.im/icons/svg/icon-arrow-right-mono.svg"
            size="sm"
            color="tertiary"
          />
        }
        onClick={() => undefined}
      />
      <ListItem
        title="보안"
        description="비밀번호 및 2단계 인증"
        leading={
          <Icon
            src="https://static.toss.im/icons/svg/icon-lock-mono.svg"
            size="md"
            color="secondary"
          />
        }
        trailing={
          <Icon
            src="https://static.toss.im/icons/svg/icon-arrow-right-mono.svg"
            size="sm"
            color="tertiary"
          />
        }
        onClick={() => undefined}
      />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    title: "비활성 항목",
    description: "현재 사용할 수 없습니다.",
    disabled: true,
    onClick: () => undefined,
  },
};
