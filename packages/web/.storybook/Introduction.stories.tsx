import type { Meta, StoryObj } from "@storybook/react-vite";
import { Typography } from "../src/components/Typography";

const meta = {
  title: "Introduction",
  parameters: {
    docs: {
      description: {
        component: `
React 웹용 디자인 시스템 \`@yeoooonn/ds-web\` 컴포넌트 카탈로그입니다.

## 설치

\`\`\`bash
pnpm add @yeoooonn/ds-web @yeoooonn/ds-tokens react react-dom
\`\`\`

## Provider

\`\`\`tsx
import { ThemeProvider, ToastProvider } from "@yeoooonn/ds-web";

<ThemeProvider>
  <ToastProvider>{children}</ToastProvider>
</ThemeProvider>
\`\`\`
        `.trim(),
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const GettingStarted: Story = {
  render: () => (
    <div style={{ maxWidth: 640, display: "flex", flexDirection: "column", gap: 16 }}>
      <Typography.H2>@yeoooonn/ds-web</Typography.H2>
      <Typography.P1>
        Storybook 툴바의 Theme / Viewport를 활용해 Light·Dark 모드와
        반응형 레이아웃을 확인하세요.
      </Typography.P1>
      <Typography.P1 color="secondary">
        Foundations · Components · Form · Navigation · Overlay · Feedback
        카테고리로 컴포넌트가 구성되어 있습니다.
      </Typography.P1>
    </div>
  ),
};
