import type { Meta, StoryObj } from "@storybook/react-native";
import { iconSources } from "../../stories/iconSources";
import { OverviewRoot, Stack, SubSection } from "../../stories/layout";
import { Icon } from "../Icon";
import { Typography } from "../Typography";
import { Result } from "./index";

type ResultPlaygroundArgs = {
  title: string;
  description: string;
  showFigure: boolean;
  showButton: boolean;
};

const meta = {
  title: "Components/Result",
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    showFigure: { control: "boolean" },
    showButton: { control: "boolean" },
  },
  args: {
    title: "완료되었습니다",
    description: "요청하신 작업이 성공적으로 처리되었습니다.",
    showFigure: true,
    showButton: true,
  },
  render: ({ title, description, showFigure, showButton }) => (
    <Result
      figure={
        showFigure ? (
          <Icon size="lg" color="success" source={{ uri: iconSources.check }} />
        ) : undefined
      }
      title={title}
      description={description}
      button={showButton ? <Result.Button>확인</Result.Button> : undefined}
    />
  ),
} satisfies Meta<ResultPlaygroundArgs>;

export default meta;
type Story = StoryObj<ResultPlaygroundArgs>;

export const Playground: Story = {};

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <OverviewRoot>
      <SubSection title="Examples">
        <Stack gap={40}>
          <Result
            figure={
              <Icon
                size="lg"
                color="success"
                source={{ uri: iconSources.check }}
              />
            }
            title="업로드 완료"
            description="파일이 성공적으로 업로드되었습니다."
            button={
              <Result.Button onPress={() => undefined}>홈으로</Result.Button>
            }
          />
          <Result
            title="결과가 없습니다"
            description="조건에 맞는 항목을 찾지 못했어요."
            button={
              <Result.Button onPress={() => undefined}>다시 시도</Result.Button>
            }
          />
          <Result
            figure={
              <Icon
                size="lg"
                color="success"
                source={{ uri: iconSources.check }}
              />
            }
            title="저장되었습니다"
            button={
              <Result.Button onPress={() => undefined}>확인</Result.Button>
            }
          />
          <Result
            figure={
              <Icon
                size="lg"
                color="warning"
                source={{ uri: iconSources.warning }}
              />
            }
            title="잠시 후 다시 시도해 주세요"
            description="서버에 일시적인 문제가 발생했습니다."
          />
          <Result
            figure={
              <Icon
                size="lg"
                color="error"
                source={{ uri: iconSources.warning }}
              />
            }
            title={
              <Typography.H2>요청을 처리할 수 없습니다</Typography.H2> as unknown as string
            }
            description={
              (
                <Typography.P1 color="error">
                  권한이 없거나 세션이 만료되었을 수 있어요.
                </Typography.P1>
              ) as unknown as string
            }
            button={
              <Result.Button variant="outlined" onPress={() => undefined}>
                로그인
              </Result.Button>
            }
          />
        </Stack>
      </SubSection>
    </OverviewRoot>
  ),
};
