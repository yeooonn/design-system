import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { OverviewRoot, Stack, SubSection } from "../../stories/layout";
import { Button } from "../Button";
import { Typography } from "../Typography";
import { BottomSheet } from "./index";

type BottomSheetPlaygroundArgs = {
  showHeader: boolean;
  showFooter: boolean;
};

function BottomSheetPlayground({
  showHeader,
  showFooter,
}: BottomSheetPlaygroundArgs) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button onPress={() => setVisible(true)}>BottomSheet 열기</Button>
      <BottomSheet
        visible={visible}
        onRequestClose={() => setVisible(false)}
        onBackdropPress={() => setVisible(false)}
      >
        <BottomSheet.Handle />
        {showHeader ? (
          <BottomSheet.Header>
            <Typography.H3>옵션 선택</Typography.H3>
          </BottomSheet.Header>
        ) : null}
        <BottomSheet.Content>
          <Typography.P2 color="secondary">
            드래그하거나 바깥을 탭하면 닫힙니다.
          </Typography.P2>
        </BottomSheet.Content>
        {showFooter ? (
          <BottomSheet.Footer>
            <Button onPress={() => setVisible(false)}>확인</Button>
          </BottomSheet.Footer>
        ) : null}
      </BottomSheet>
    </>
  );
}

function BottomSheetOverviewDemo({
  showHeader = true,
  showFooter = true,
  title = "바텀시트 제목",
  content = "하단에서 올라오는 시트입니다. 필터·선택·확인에 사용합니다.",
  triggerLabel = "바텀시트 열기",
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
      <BottomSheet
        visible={open}
        onBackdropPress={() => setOpen(false)}
        onRequestClose={() => setOpen(false)}
      >
        <BottomSheet.Handle />
        {showHeader && (
          <BottomSheet.Header>
            <Typography.H3>{title}</Typography.H3>
          </BottomSheet.Header>
        )}
        <BottomSheet.Content>
          <Typography.P1>{content}</Typography.P1>
        </BottomSheet.Content>
        {showFooter && (
          <BottomSheet.Footer>
            <Button variant="ghost" onPress={() => setOpen(false)}>
              취소
            </Button>
            <Button onPress={() => setOpen(false)}>확인</Button>
          </BottomSheet.Footer>
        )}
      </BottomSheet>
    </>
  );
}

const meta = {
  title: "Feedback/BottomSheet",
  argTypes: {
    showHeader: { control: "boolean" },
    showFooter: { control: "boolean" },
  },
  args: {
    showHeader: true,
    showFooter: true,
  },
  render: (args) => <BottomSheetPlayground {...args} />,
} satisfies Meta<BottomSheetPlaygroundArgs>;

export default meta;
type Story = StoryObj<BottomSheetPlaygroundArgs>;

export const Playground: Story = {};

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <OverviewRoot>
      <SubSection title="Usage">
        <Stack gap={24}>
          <BottomSheetOverviewDemo triggerLabel="전체 구성" />
          <BottomSheetOverviewDemo
            triggerLabel="본문만"
            showHeader={false}
            showFooter={false}
            content="핸들만 두고 본문만 표시하는 시트입니다."
          />
          <BottomSheetOverviewDemo
            triggerLabel="헤더 + 본문"
            showFooter={false}
            title="필터"
            content="푸터 없이 제목과 내용만 표시합니다."
          />
        </Stack>
      </SubSection>
    </OverviewRoot>
  ),
};
