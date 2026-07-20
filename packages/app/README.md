# @yeoooonn/ds-app

React Native (Expo)용 디자인 시스템 컴포넌트입니다.

## 설치

```bash
pnpm add @yeoooonn/ds-app @yeoooonn/ds-tokens nativewind tailwindcss react-native-reanimated react-native-safe-area-context
```

## NativeWind 설정

1. [NativeWind Expo 가이드](https://www.nativewind.dev/getting-started/expo)에 따라 babel / metro 설정
2. Tailwind `content`에 DS 패키지 경로 포함:

```js
// tailwind.config.js
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@yeoooonn/ds-app/dist/**/*.{js,mjs}",
  ],
  presets: [require("@yeoooonn/ds-app/tailwind-preset")],
};
```

3. 앱 루트에서 DS global CSS import (NativeWind v4 설정에 맞게)
4. `ThemeProvider`로 앱 감싸기

```tsx
import { ThemeProvider, ToastProvider } from "@yeoooonn/ds-app";

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        {/* ... */}
      </ToastProvider>
    </ThemeProvider>
  );
}
```

`metro.example.js`를 참고해 소비 앱 metro 설정을 맞출 수 있습니다.

## Storybook

컴포넌트 옆 `*.stories.tsx` 파일로 on-device Storybook 스토리를 작성합니다. `@yeoooonn/ds-app` 패키지에서 직접 실행합니다.

```bash
# 루트에서 (Expo Web, localhost:8083)
pnpm storybook:app

# packages/app에서
pnpm storybook        # 시뮬레이터 / 실기기
pnpm storybook:web    # Expo Web
```

전체 쇼케이스는 `pnpm demo:app` (`@ds/demo-app`)으로 확인할 수 있습니다.

## API

웹 패키지(`@yeoooonn/ds-web`)와 동일한 export 이름을 목표로 합니다. 이벤트 prop은 `onPress`를 사용합니다.

자세한 아키텍처는 [docs/architecture.md](../../docs/architecture.md)를 참고하세요.
