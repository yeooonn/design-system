import type { Meta, StoryObj } from "@storybook/react-vite";
import type React from "react";
import { useState } from "react";
import { Button } from "../Button";
import { Typography } from "../Typography";
import { Modal } from "./index";

const usageSource = `import { useState } from "react";
import { Modal, Button, Typography } from "@yeoooonn/ds-web";

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>모달 열기</Button>

// 전체 구성
{open && (
  <Modal onBackdropClick={() => setOpen(false)}>
    <Modal.Header>
      <Typography.H3>모달 제목</Typography.H3>
    </Modal.Header>
    <Modal.Content>
      <Typography.P1>모달 내용</Typography.P1>
    </Modal.Content>
    <Modal.Footer>
      <Button variant="ghost" onClick={() => setOpen(false)}>취소</Button>
      <Button onClick={() => setOpen(false)}>확인</Button>
    </Modal.Footer>
  </Modal>
)}

// 본문만
{open && (
  <Modal onBackdropClick={() => setOpen(false)}>
    <Modal.Content>
      <Typography.P1>본문만 있는 모달</Typography.P1>
    </Modal.Content>
  </Modal>
)}

// 헤더 + 본문
{open && (
  <Modal onBackdropClick={() => setOpen(false)}>
    <Modal.Header>
      <Typography.H3>제목</Typography.H3>
    </Modal.Header>
    <Modal.Content>
      <Typography.P1>내용</Typography.P1>
    </Modal.Content>
  </Modal>
)}

// 본문 + 푸터
{open && (
  <Modal onBackdropClick={() => setOpen(false)}>
    <Modal.Content>
      <Typography.P1>내용</Typography.P1>
    </Modal.Content>
    <Modal.Footer>
      <Button onClick={() => setOpen(false)}>확인</Button>
    </Modal.Footer>
  </Modal>
)}`;

type ModalStoryArgs = {
  showHeader: boolean;
  showFooter: boolean;
};

function UsageSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Typography.Label color="secondary">{title}</Typography.Label>
      {children}
    </div>
  );
}

function ModalDemo({ showHeader, showFooter }: ModalStoryArgs) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>모달 열기</Button>
      {open && (
        <Modal
          onBackdropClick={() => setOpen(false)}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          {showHeader && (
            <Modal.Header>
              <div id="modal-title">
                <Typography.H3>모달 제목</Typography.H3>
              </div>
            </Modal.Header>
          )}
          <Modal.Content>
            <div id="modal-description">
              <Typography.P1>
                모달 내용은 부모에서 자유롭게 구성할 수 있습니다.
              </Typography.P1>
            </div>
          </Modal.Content>
          {showFooter && (
            <Modal.Footer>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                취소
              </Button>
              <Button onClick={() => setOpen(false)}>확인</Button>
            </Modal.Footer>
          )}
        </Modal>
      )}
    </>
  );
}

function ModalUsageDemo({
  showHeader = true,
  showFooter = true,
  title = "모달 제목",
  content = "모달 내용은 부모에서 자유롭게 구성할 수 있습니다.",
}: {
  showHeader?: boolean;
  showFooter?: boolean;
  title?: string;
  content?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>모달 열기</Button>
      {open && (
        <Modal onBackdropClick={() => setOpen(false)}>
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
              <Button variant="ghost" onClick={() => setOpen(false)}>
                취소
              </Button>
              <Button onClick={() => setOpen(false)}>확인</Button>
            </Modal.Footer>
          )}
        </Modal>
      )}
    </>
  );
}

const meta = {
  title: "Modal",
  parameters: {
    docs: {
      description: {
        component: `
Modal은 compound component로 구성되는 오버레이 컨테이너입니다.
열림/닫힘 상태와 헤더, 본문, 푸터, 버튼 등 모든 내용은 부모에서 조합합니다.

| 컴포넌트 | 설명 |
| --- | --- |
| \`Modal\` | 루트 컨테이너 (portal + backdrop) |
| \`Modal.Header\` | 헤더 영역 (선택) |
| \`Modal.Content\` | 본문 영역 |
| \`Modal.Footer\` | 푸터 영역 (선택) |
        `.trim(),
      },
    },
  },
  argTypes: {
    showHeader: { control: "boolean", description: "헤더 표시 여부" },
    showFooter: { control: "boolean", description: "푸터(버튼) 표시 여부" },
  },
  args: {
    showHeader: true,
    showFooter: true,
  },
  render: (args) => <ModalDemo {...args} />,
} satisfies Meta<ModalStoryArgs>;

export default meta;
type Story = StoryObj<ModalStoryArgs>;

export const Playground: Story = {};

export const Usage: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "필요한 서브 컴포넌트만 조합해 사용합니다. 표시 여부는 부모의 조건부 렌더링으로 제어합니다.",
      },
      source: {
        code: usageSource,
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <UsageSection title="전체 구성 (Header + Content + Footer)">
        <ModalUsageDemo
          title="모달 제목"
          content="헤더, 본문, 푸터를 모두 포함한 기본 모달입니다."
        />
      </UsageSection>

      <UsageSection title="본문만 (Content)">
        <ModalUsageDemo
          showHeader={false}
          showFooter={false}
          content="헤더와 푸터 없이 본문만 표시하는 모달입니다."
        />
      </UsageSection>

      <UsageSection title="헤더 + 본문 (Header + Content)">
        <ModalUsageDemo
          showFooter={false}
          title="공지사항"
          content="푸터 없이 제목과 내용만 표시할 때 사용합니다."
        />
      </UsageSection>

      <UsageSection title="본문 + 푸터 (Content + Footer)">
        <ModalUsageDemo
          showHeader={false}
          content="액션 버튼이 필요한 경우 푸터만 추가합니다."
        />
      </UsageSection>
    </div>
  ),
};

export const Overview: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    function OverviewDemo() {
      const [open, setOpen] = useState(false);

      return (
        <>
          <Button onClick={() => setOpen(true)}>모달 열기</Button>
          {open && (
            <Modal
              onBackdropClick={() => setOpen(false)}
              aria-labelledby="overview-modal-title"
            >
              <Modal.Header>
                <div id="overview-modal-title">
                  <Typography.H3>저장하시겠습니까?</Typography.H3>
                </div>
              </Modal.Header>
              <Modal.Content>
                <Typography.P1>
                  변경 사항을 저장하면 이전 내용은 복구할 수 없습니다.
                </Typography.P1>
              </Modal.Content>
              <Modal.Footer>
                <Button variant="ghost" onClick={() => setOpen(false)}>
                  취소
                </Button>
                <Button onClick={() => setOpen(false)}>저장</Button>
              </Modal.Footer>
            </Modal>
          )}
        </>
      );
    }

    return <OverviewDemo />;
  },
};
