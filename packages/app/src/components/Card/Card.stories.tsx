import type { Meta, StoryObj } from "@storybook/react-native";
import { OverviewRoot, Stack, SubSection } from "../../stories/layout";
import { Button } from "../Button";
import { Typography } from "../Typography";
import { Card } from "./index";

type CardPlaygroundArgs = {
  boxShadow: boolean;
  showHeader: boolean;
  showFooter: boolean;
};

const meta = {
  title: "Components/Card",
  argTypes: {
    boxShadow: { control: "boolean" },
    showHeader: { control: "boolean" },
    showFooter: { control: "boolean" },
  },
  args: {
    boxShadow: true,
    showHeader: true,
    showFooter: true,
  },
  render: ({ boxShadow, showHeader, showFooter }) => (
    <Card boxShadow={boxShadow} style={{ maxWidth: 400, width: "100%" }}>
      {showHeader ? (
        <Card.Header>
          <Typography.H3>카드 제목</Typography.H3>
        </Card.Header>
      ) : null}
      <Card.Content>
        <Typography.P2 color="secondary">
          카드 본문 영역입니다. Header / Content / Footer를 조합할 수 있습니다.
        </Typography.P2>
      </Card.Content>
      {showFooter ? (
        <Card.Footer>
          <Button size="sm">확인</Button>
        </Card.Footer>
      ) : null}
    </Card>
  ),
} satisfies Meta<CardPlaygroundArgs>;

export default meta;
type Story = StoryObj<CardPlaygroundArgs>;

export const Playground: Story = {};

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <OverviewRoot>
      <SubSection title="Usage">
        <Stack gap={24}>
          <Card style={{ maxWidth: 400, width: "100%" }}>
            <Card.Header>
              <Typography.H3>카드 제목</Typography.H3>
            </Card.Header>
            <Card.Content>
              <Typography.P1>
                헤더, 본문, 푸터를 모두 포함한 기본 카드입니다.
              </Typography.P1>
            </Card.Content>
            <Card.Footer>
              <Typography.Caption color="secondary">
                마지막 업데이트: 2026.07.07
              </Typography.Caption>
            </Card.Footer>
          </Card>

          <Card style={{ maxWidth: 400, width: "100%" }}>
            <Card.Content>
              <Typography.P1>본문만 있는 카드입니다.</Typography.P1>
            </Card.Content>
          </Card>

          <Card style={{ maxWidth: 400, width: "100%" }} boxShadow>
            <Card.Header>
              <Typography.H3>boxShadow</Typography.H3>
            </Card.Header>
            <Card.Content>
              <Typography.P1>그림자가 적용된 카드입니다.</Typography.P1>
            </Card.Content>
            <Card.Footer>
              <Typography.Caption color="secondary">
                부가 정보
              </Typography.Caption>
            </Card.Footer>
          </Card>
        </Stack>
      </SubSection>
    </OverviewRoot>
  ),
};
