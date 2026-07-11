# Toast Design Spec

날짜: 2026-07-11  
패키지: `@yeoooonn/ds-web`

## 목표

명령형 Toast API를 제공한다. 앱 루트에 `ToastProvider`를 두고, `useToast().open()`으로 메시지를 띄운다. TDS Mobile Toast의 핵심 props(`text`, `duration`, `leftAddon`)를 참고하되, position은 웹용 6방향으로 확장한다.

## 결정 사항

| 항목 | 결정 |
| --- | --- |
| API 스타일 | 명령형만 (`ToastProvider` + `useToast`) |
| 선언형 `<Toast open />` | 이번 스코프 밖 |
| position | `top-left` \| `top-right` \| `top-center` \| `bottom-left` \| `bottom-right` \| `bottom-center` |
| 기본 position | `bottom-center` |
| duration | ms, 기본 `3000` |
| leftAddon | `React.ReactNode` prop |
| 렌더 | `createPortal(..., document.body)` |
| z-index | Modal(1000)보다 위 — `1100` |
| 스택 | 같은 position끼리 세로 스택 |

## API

### ToastProvider

```tsx
<ThemeProvider>
  <ToastProvider>
    <App />
  </ToastProvider>
</ThemeProvider>
```

`useToast`는 `ToastProvider` 안에서만 호출 가능하다. Provider 밖이면 에러를 throw한다. (`useTheme`과 동일 패턴)

### useToast

```ts
type ToastPosition =
  | "top-left"
  | "top-right"
  | "top-center"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center";

type ToastOpenOptions = {
  text: string;
  position?: ToastPosition; // default: "bottom-center"
  duration?: number; // default: 3000
  leftAddon?: React.ReactNode;
};

type ToastApi = {
  open: (options: ToastOpenOptions) => string; // returns toast id
  close: (id: string) => void;
  closeAll: () => void;
};

function useToast(): ToastApi;
```

### 사용 예

```tsx
const toast = useToast();

toast.open({
  text: "저장됐어요",
  position: "top-center",
  duration: 3000,
  leftAddon: <Icon name="check" />,
});
```

## 동작

1. `open(options)` — 고유 id를 생성해 큐에 추가하고 id를 반환한다.
2. `duration` ms 후 해당 토스트를 큐에서 제거한다. (`duration`이 바뀌어도 이미 열린 토스트의 타이머는 열릴 때 값을 사용)
3. `close(id)` — 해당 토스트를 즉시 제거한다. (타이머도 정리)
4. `closeAll()` — 모든 토스트와 타이머를 제거한다.
5. Provider unmount 시 남은 타이머를 모두 clear한다.
6. 같은 `position`의 토스트는 해당 코너/중앙 컨테이너 안에서 세로로 쌓인다. top 계열은 위에서 아래로, bottom 계열은 아래에서 위로(또는 컨테이너 flex-direction으로 자연스럽게) 쌓인다.

## UI

- 아이템 레이아웃: `[leftAddon?][text]` 가로 flex, 세로 중앙 정렬
- 테마 토큰 사용 (`theme.background`, `theme.text`, `spacing`, `borderRadius`)
- light/dark `colorScheme` 대응 (`useTheme`)
- 접근성: 컨테이너에 `role="status"`, `aria-live="polite"`
- 애니메이션: 간단한 fade/slide (과도한 모션 없음)

## 파일 구조

```
packages/web/src/components/Toast/
  index.tsx           # ToastProvider, useToast, ToastViewport, ToastItem
  toastStyles.ts      # position 컨테이너 + 아이템 스타일
  Toast.stories.tsx   # Provider decorator + 버튼으로 open 호출
```

`packages/web/src/index.ts` export:

- `ToastProvider`
- `useToast`
- type `ToastPosition`
- type `ToastOpenOptions`

## Storybook

- decorator로 `ToastProvider`(+ 기존 ThemeProvider) 감싸기
- 스토리에서 `useToast().open(args)`를 버튼 클릭으로 호출
- Controls로 `text`, `position`, `duration`, `leftAddon` 확인

## 스코프 밖

- 선언형 `<Toast open onClose />`
- `button` / `Toast.Button`
- `Toast.Icon` / `Toast.Lottie`
- `higherThanCTA`, 드래그 닫기
- `onExited` / enter·exit 애니메이션 콜백

## 성공 기준

1. Provider 하위에서 `toast.open({ text })` 호출 시 토스트가 보이고, 기본 3000ms 후 사라진다.
2. 6가지 position이 올바른 화면에 붙는다.
3. `leftAddon`이 텍스트 왼쪽에 렌더된다.
4. 같은 position에 여러 개를 열면 스택된다.
5. Modal이 열린 상태에서도 토스트가 위에 보인다 (z-index 1100).
6. `@yeoooonn/ds-web`에서 `ToastProvider`, `useToast`를 import할 수 있다.
