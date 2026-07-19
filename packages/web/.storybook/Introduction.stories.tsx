import { Description, Title } from "@storybook/addon-docs/blocks";
import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";

function Introduction() {
  return null;
}

const meta = {
  title: "Introduction",
  component: Introduction,
  parameters: {
    controls: { disable: true },
    docs: {
      page: () => (
        <>
          <Title />
          <Description />
        </>
      ),
      description: {
        component: `
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
} satisfies Meta<typeof Introduction>;

export default meta;

type Story = StoryObj<typeof Introduction>;

export const GettingStarted: Story = {
  render: () => <></>,
};
