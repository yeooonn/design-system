# ds-app NativeWind 컴포넌트 포트 Design Spec

날짜: 2026-07-13  
패키지: `@yeoooonn/ds-app`

## 목표

`packages/web/src/components`의 16개 컴포넌트를 React Native(Expo)에서 쓸 수 있도록 `packages/app`에 재구현한다. 스타일링은 NativeWind v4 + Tailwind 3를 사용한다. 기능 수준은 **MVP**: 디자인 props·핵심 동작은 web과 맞추고, 애니메이션·정밀 포지셔닝·웹 전용 UX는 단순화한다.

## 결정 사항

| 항목 | 결정 |
| --- | --- |
| 구현 전략 | 미러 포트 — web JSX/CSS를 공유하지 않고 app에 RN 전용 구현 |
| 공유 범위 | `@yeoooonn/ds-tokens` + ThemeProvider 개념만 |
| 스타일링 | NativeWind v4 (`className`), Tailwind theme에 토큰 매핑 |
| API 전략 | 하이브리드 — 대부분 web과 동일 props, 이벤트는 `onPress` |
| 완성도 | 기능 MVP (프로덕션 패리티 애니메이션/고급 UX 제외) |
| Icon | children 슬롯 + size/color wrapper (`src`/CSS mask 없음) |
| Stories / 테스트 | 이번 스코프 밖 |
| `className` | 허용 (소비자 합성). `style`은 필요 시 병행 |

## 비목표

- web 컴포넌트 코드를 RN에서 직접 import
- CSS-in-JS / StyleSheet 전용 구현으로의 롤백
- React Native Web 단일 코드베이스
- Storybook RN / 단위 테스트 추가
- NativeWind v5 / Tailwind v4 채택

## 패키지 구조

```
packages/app/
  package.json                 # peer: nativewind, reanimated, safe-area-context 등
  tailwind.config.js           # tokens → theme.extend, nativewind/preset
  nativewind-env.d.ts
  src/
    index.ts                   # web과 동일한 export 표면
    styles/global.css          # @tailwind base/components/utilities (소비 앱 import)
    theme/ThemeProvider.tsx    # light/dark + NativeWind color scheme 연동
    components/
      Button|Badge|Card|Checkbox|Icon|Input|Modal|Radio|
      Result|Select|Switch|Tab|Textarea|Toast|Tooltip|Typography/
        index.tsx
        *Styles.ts             # className 맵 / variant resolve (필요 시)
```

## 의존성

**peerDependencies (소비 앱이 설치·설정)**

- `react`, `react-native`, `expo` (기존)
- `nativewind` (^4.2)
- `react-native-reanimated`
- `react-native-safe-area-context`

**dependencies**

- `@yeoooonn/ds-tokens` (workspace)

**devDependencies**

- `tailwindcss@^3.4.17`, 타입/빌드 도구

## 소비 앱 필수 설정

1. NativeWind 공식 Expo 설치 (babel `jsxImportSource: "nativewind"`, metro `withNativeWind`, `global.css` import)
2. Tailwind `content`에 DS 패키지 경로 포함  
   예: `"./node_modules/@yeoooonn/ds-app/dist/**/*.{js,mjs}"` 및 소스 사용 시 해당 경로
3. DS `tailwind.config` preset(또는 동일 theme extend)을 소비 앱 config에 병합
4. 앱 루트를 `ThemeProvider`(+ 필요 시 `ToastProvider`)로 감쌈

패키지 README에 위 설정을 명시한다.

## 공통 API 규칙

- 디자인 props(`variant`, `size`, `color`, `round` 등)는 web과 동일한 유니온/기본값
- `onClick` → `onPress`
- HTML/`aria-*` 대신 RN a11y: `accessibilityRole`, `accessibilityLabel`, `accessibilityState` 등
- `className?: string` 허용, 내부 기본 클래스와 합성
- dark mode: ThemeProvider의 `colorScheme`과 NativeWind `dark:`(또는 color scheme 설정) 동기화

## 컴포넌트별 MVP

### Web에 가깝게 (토큰·variant 패리티)

| 컴포넌트 | 비고 |
| --- | --- |
| Button | `Pressable`/`Text`, loading 표시는 `ActivityIndicator` 또는 단순 dots |
| Badge | `View` + `Text` |
| Card | `Card` / `Header` / `Content` / `Footer` compound |
| Typography | variant → text className |
| Result | icon slot + title/description/extra |
| Input | `TextInput` + label/helper/error, prefix/suffix |
| Textarea | multiline `TextInput` |
| Checkbox / Radio | 커스텀 컨트롤 + Pressable (네이티브 Switch 아님) |
| Switch | RN `Switch` 또는 커스텀 트랙/썸 — web 시각에 가깝게 커스텀 우선 |
| Tab | 가로 스크롤 가능 탭 리스트 + 선택 인디케이터(단순 underline) |

### RN 재설계

| 컴포넌트 | MVP 동작 |
| --- | --- |
| Modal | RN `Modal` + backdrop `onPress`, Header/Content/Footer compound |
| Toast | `ToastProvider` + `useToast().open()`, 절대 위치 오버레이, 단일/단순 스택, 페이드 최소 |
| Tooltip | controlled `open` 또는 롱프레스, 트리거 기준 고정 오프셋(정밀 measure/flip 없음) |
| Select | 트리거 + 옵션 리스트를 `Modal`로 표시 (네이티브 Picker 아님) |
| Icon | `size`/`color` wrapper + `children` (그래픽은 소비자 제공) |

## Export 표면

`packages/app/src/index.ts`는 web `packages/web/src/index.ts`와 동일한 컴포넌트·타입 export를 목표로 한다. (Icon props만 `src` 대신 `children`으로 다름 — 문서화)

## 성공 기준

1. `@yeoooonn/ds-app`이 16개 컴포넌트(+ ThemeProvider, ToastProvider/useToast)를 export한다.
2. NativeWind `className`으로 스타일되며, 토큰 값이 Tailwind theme에 반영된다.
3. TypeScript 빌드(`pnpm --filter @yeoooonn/ds-app build`)가 통과한다.
4. README에 소비 앱 NativeWind 연동 방법이 있다.
5. web DOM API(`createPortal`, `document`, CSS mask)를 app 코드에서 사용하지 않는다.

## 리스크·완화

| 리스크 | 완화 |
| --- | --- |
| 라이브러리 + NativeWind는 소비 앱 Metro/content 설정 필수 | README + preset export로 명시 |
| dark mode class 동기화 이슈 | ThemeProvider에서 scheme 설정 API를 한곳에서 처리 |
| tsup 번들 후 className 문자열 보존 | content를 dist로 지정, 필요 시 빌드 설정 확인 |
| peer 버전 충돌 (Reanimated 등) | peer 범위를 넓게, 문서는 Expo SDK 50+ / NativeWind 4.2+ 기준 |
