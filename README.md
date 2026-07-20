# @yeoooonn/ds

React / React Native용 디자인 시스템 monorepo입니다. 디자인 토큰을 공유하고, 웹과 앱에서 동일한 컴포넌트 API를 제공합니다.

## 패키지

| 패키지 | npm | 설명 |
| --- | --- | --- |
| `@yeoooonn/ds-tokens` | [npm](https://www.npmjs.com/package/@yeoooonn/ds-tokens) | color, typography, spacing, theme |
| `@yeoooonn/ds-web` | [npm](https://www.npmjs.com/package/@yeoooonn/ds-web) | React 웹 컴포넌트 |
| `@yeoooonn/ds-app` | [npm](https://www.npmjs.com/package/@yeoooonn/ds-app) | React Native (Expo) 컴포넌트 |

## 빠른 시작

### 웹

```bash
pnpm add @yeoooonn/ds-web @yeoooonn/ds-tokens react react-dom
```

```tsx
import { ThemeProvider, Button, Typography } from "@yeoooonn/ds-web";

export function App() {
  return (
    <ThemeProvider>
      <Typography.H1>Hello DS</Typography.H1>
      <Button onClick={() => alert("clicked")}>확인</Button>
    </ThemeProvider>
  );
}
```

### React Native (Expo)

```bash
pnpm add @yeoooonn/ds-app @yeoooonn/ds-tokens nativewind tailwindcss
```

NativeWind 설정, Tailwind preset 병합, `global.css` import 등 상세 설정은 [`packages/app/README.md`](./packages/app/README.md)를 참고하세요.

## 컴포넌트

웹·앱 공통 API를 목표로 합니다. 플랫폼 전용 컴포넌트는 아래 표의 **비고**를 확인하세요.

| 컴포넌트 | 웹 | 앱 | 비고 |
| --- | :-: | :-: | --- |
| Button | ✅ | ✅ | |
| Badge | ✅ | ✅ | |
| Input | ✅ | ✅ | |
| Select | ✅ | ✅ | 앱: BottomSheet 기반 |
| Checkbox / Radio / Switch | ✅ | ✅ | |
| Tab | ✅ | ✅ | |
| Textarea | ✅ | ✅ | |
| Typography | ✅ | ✅ | compound (`Typography.H1` 등) |
| Icon | ✅ | ✅ | 웹: SVG mask, 앱: children slot |
| Modal | ✅ | ✅ | compound |
| Card | ✅ | ✅ | compound |
| Result | ✅ | ✅ | |
| Toast | ✅ | ✅ | 명령형 API (`useToast`) |
| Tooltip | ✅ | ✅ | |
| Avatar | ✅ | ✅ | |
| BottomSheet | — | ✅ | 앱 전용 |
| Chip | ✅ | ✅ | |
| Divider | ✅ | ✅ | |
| ListItem | ✅ | ✅ | |
| Skeleton | ✅ | ✅ | |
| Spinner | ✅ | ✅ | |
| KeyboardAvoid | — | ✅ | RN 전용 |

## 개발

```bash
pnpm install

# 전체 빌드
pnpm build

# Storybook (웹)
pnpm storybook

# Storybook (RN, Expo Web)
pnpm storybook:app

# RN 전체 쇼케이스 앱
pnpm demo:app
```

## 아키텍처

레포 구조, 토큰 파이프라인, 크로스 플랫폼 전략은 [docs/architecture.md](./docs/architecture.md)를 참고하세요.

## 설계 문서

- [Toast 명령형 API 설계](./docs/superpowers/specs/2026-07-11-toast-design.md)
- [ds-app NativeWind 포트 설계](./docs/superpowers/specs/2026-07-13-ds-app-nativewind-design.md)

## 라이선스

MIT
