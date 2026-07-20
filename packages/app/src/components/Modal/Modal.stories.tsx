import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { OverviewRoot, Stack, SubSection } from "../../stories/layout";
import { Button } from "../Button";
import { Typography } from "../Typography";
import { Modal } from "./index";

type ModalPlaygroundArgs = {
  showHeader: boolean;
  showFooter: boolean;
};

function ModalPlayground({ showHeader, showFooter }: ModalPlaygroundArgs) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button onPress={() => setVisible(true)}>모달 열기</Button>
      <Modal
        visible={visible}
        onRequestClose={() => setVisible(false)}
        onBackdropPress={() => setVisible(false)}
      >
        {showHeader ? (
          <Modal.Header>
            <Typography.H3>모달 제목</Typography.H3>
          </Modal.Header>
        ) : null}
        <Modal.Content>
          <Typography.P1>
            모달 내용은 Header / Content / Footer를 자유롭게 조합할 수 있습니다.
          </Typography.P1>
        </Modal.Content>
        {showFooter ? (
          <Modal.Footer>
            <Button variant="ghost" color="dark" onPress={() => setVisible(false)}>
              취소
            </Button>
            <Button onPress={() => setVisible(false)}>확인</Button>
          </Modal.Footer>
        ) : null}
      </Modal>
    </>
  );
}

function ModalOverviewDemo({
  showHeader = true,
  showFooter = true,
  title = "모달 제목",
  content = "모달 내용은 부모에서 자유롭게 구성할 수 있습니다.",
  triggerLabel = "모달 열기",
}: {
  showHeader?: boolean;
  showFooter?: boolean;
  title?: string;
  content?: string;
  triggerLabel?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onPress={() => setOpen(true)}>{triggerLabel}</Button>
      <Modal visible={open} onBackdropPress={() => setOpen(false)}>
        {showHeader && (
          <Modal.Header>
            <Typography.H3>{title}</Typography.H3>
          </Modal.Header>
        )}
        <Modal.Content>
          <Typography.P1>{content}</Typography.P1>
        </Modal.Content>
        {showFooter && (
          <Modal.Footer>
            <Button variant="ghost" onPress={() => setOpen(false)}>
              취소
            </Button>
            <Button onPress={() => setOpen(false)}>확인</Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
}

const meta = {
  title: "Feedback/Modal",
  argTypes: {
    showHeader: { control: "boolean" },
    showFooter: { control: "boolean" },
  },
  args: {
    showHeader: true,
    showFooter: true,
  },
  render: (args) => <ModalPlayground {...args} />,
} satisfies Meta<ModalPlaygroundArgs>;

export default meta;
type Story = StoryObj<ModalPlaygroundArgs>;

export const Playground: Story = {};

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <OverviewRoot>
      <SubSection title="Usage">
        <Stack gap={24}>
          <ModalOverviewDemo
            triggerLabel="전체 구성"
            title="모달 제목"
            content="헤더, 본문, 푸터를 모두 포함한 기본 모달입니다."
          />
          <ModalOverviewDemo
            triggerLabel="본문만"
            showHeader={false}
            showFooter={false}
            content="헤더와 푸터 없이 본문만 표시하는 모달입니다."
          />
          <ModalOverviewDemo
            triggerLabel="헤더 + 본문"
            showFooter={false}
            title="공지사항"
            content="푸터 없이 제목과 내용만 표시할 때 사용합니다."
          />
          <ModalOverviewDemo
            triggerLabel="본문 + 푸터"
            showHeader={false}
            content="액션 버튼이 필요한 경우 푸터만 추가합니다."
          />
        </Stack>
      </SubSection>
    </OverviewRoot>
  ),
};
