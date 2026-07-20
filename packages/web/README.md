# @yeoooonn/ds-web

React 웹용 디자인 시스템 컴포넌트입니다.

## 설치

```bash
pnpm add @yeoooonn/ds-web @yeoooonn/ds-tokens react react-dom
```

## 사용

```tsx
import {
  ThemeProvider,
  ToastProvider,
  Button,
  Input,
  useToast,
} from "@yeoooonn/ds-web";

function App() {
  const toast = useToast();

  return (
    <>
      <Input label="이메일" placeholder="you@example.com" />
      <Button onClick={() => toast.open({ text: "저장되었습니다" })}>
        저장
      </Button>
    </>
  );
}

export default function Root() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </ThemeProvider>
  );
}
```

## Storybook

```bash
pnpm storybook
```

로컬에서 모든 컴포넌트 variant와 사용 예를 확인할 수 있습니다.

## 스타일링

컴포넌트는 `@yeoooonn/ds-tokens` 기반 **inline style**과 `*Styles.ts` resolver를 사용합니다. 소비 앱에 Tailwind나 CSS-in-JS 런타임을 추가로 요구하지 않습니다.

자세한 아키텍처는 [docs/architecture.md](../../docs/architecture.md)를 참고하세요.
