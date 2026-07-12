import type { Meta, StoryObj } from "@storybook/react-vite";
import type React from "react";
import { Icon } from "../Icon";
import { Typography } from "../Typography";
import { Result } from "./index";

const checkIcon =
  "https://static.toss.im/icons/svg/icon-check-circle-green.svg";
const warningIcon =
  "https://static.toss.im/icons/svg/icon-warning-circle-mono.svg";

const usageSource = `import { Result, Icon } from "@yeoooonn/ds-web";

<Result
  figure={<Icon src="..." size="lg" color="success" />}
  title="업로드 완료"
  description="파일이 성공적으로 업로드되었습니다."
  button={<Result.Button onClick={goHome}>홈으로</Result.Button>}
/>

// figure / description / button은 모두 optional
<Result title="결과가 없습니다" />

// title·description에 ReactNode를 넘기면 그대로 렌더
<Result
  title={<Typography.H2>커스텀 제목</Typography.H2>}
  description={<Typography.P1 color="error">오류가 발생했습니다.</Typography.P1>}
/>`;

type ResultStoryArgs = {
  title: string;
  description: string;
  showFigure: boolean;
  showButton: boolean;
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

const meta: Meta<ResultStoryArgs> = {
  title: "Result",
  component: Result,
  parameters: {
    controls: {
      exclude: ["figure", "button", "className", "style"],
    },
    docs: {
      source: {
        code: usageSource,
      },
    },
  },
  argTypes: {
    title: { control: "text", description: "결과 화면 제목" },
    description: { control: "text", description: "추가 설명" },
    showFigure: { control: "boolean", description: "figure 표시" },
    showButton: { control: "boolean", description: "button 표시" },
  },
  args: {
    title: "업로드 완료",
    description: "파일이 성공적으로 업로드되었습니다.",
    showFigure: true,
    showButton: true,
  },
  render: ({ title, description, showFigure, showButton }) => (
    <Result
      figure={
        showFigure ? (
          <Icon src={checkIcon} size="lg" color="success" />
        ) : undefined
      }
      title={title}
      description={description}
      button={
        showButton ? (
          <Result.Button onClick={() => undefined}>홈으로</Result.Button>
        ) : undefined
      }
    />
  ),
};

export default meta;
type Story = StoryObj<ResultStoryArgs>;

export const Playground: Story = {};

export const Examples: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      <UsageSection title="기본 (성공)">
        <Result
          figure={<Icon src={checkIcon} size="lg" color="success" />}
          title="업로드 완료"
          description="파일이 성공적으로 업로드되었습니다."
          button={<Result.Button onClick={() => undefined}>홈으로</Result.Button>}
        />
      </UsageSection>

      <UsageSection title="figure 없음">
        <Result
          title="결과가 없습니다"
          description="조건에 맞는 항목을 찾지 못했어요."
          button={
            <Result.Button onClick={() => undefined}>다시 시도</Result.Button>
          }
        />
      </UsageSection>

      <UsageSection title="description 없음">
        <Result
          figure={<Icon src={checkIcon} size="lg" color="success" />}
          title="저장되었습니다"
          button={<Result.Button onClick={() => undefined}>확인</Result.Button>}
        />
      </UsageSection>

      <UsageSection title="button 없음">
        <Result
          figure={<Icon src={warningIcon} size="lg" color="warning" />}
          title="잠시 후 다시 시도해 주세요"
          description="서버에 일시적인 문제가 발생했습니다."
        />
      </UsageSection>

      <UsageSection title="커스텀 Typography">
        <Result
          figure={<Icon src={warningIcon} size="lg" color="error" />}
          title={<Typography.H2>요청을 처리할 수 없습니다</Typography.H2>}
          description={
            <Typography.P1 color="error">
              권한이 없거나 세션이 만료되었을 수 있어요.
            </Typography.P1>
          }
          button={
            <Result.Button variant="outlined" onClick={() => undefined}>
              로그인
            </Result.Button>
          }
        />
      </UsageSection>
    </div>
  ),
};
