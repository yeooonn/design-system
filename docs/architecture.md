# Architecture

`@yeoooonn/ds` monorepo의 구조와 설계 원칙을 정리합니다.

## 개요

```
design-system/
├── packages/
│   ├── tokens/          @yeoooonn/ds-tokens
│   ├── web/             @yeoooonn/ds-web
│   └── app/             @yeoooonn/ds-app
├── docs/
│   ├── architecture.md
│   └── superpowers/specs/
└── README.md
```

pnpm workspace로 패키지를 묶고, **토큰 → 플랫폼 패키지** 순으로 의존합니다.

```
@yeoooonn/ds-tokens
        │
        ├──────────────┬──────────────┐
        ▼              ▼              ▼
  @yeoooonn/ds-web  @yeoooonn/ds-app  (소비 앱)
```

## 레이어

### 1. Tokens (`@yeoooonn/ds-tokens`)

프레임워크에 독립적인 디자인 원시값과 시맨틱 테마입니다.

| 모듈 | 역할 |
| --- | --- |
| `colors` | primitive palette (primary, gray, status 등) |
| `typography` | fontSize, fontWeight, textStyles |
| `spacing` | spacing scale, borderRadius, borderWidth |
| `theme` | `lightTheme` / `darkTheme` 시맨틱 토큰 |

컴포넌트는 가능한 한 `theme.text.primary`, `theme.field.background.focus` 같은 **시맨틱 토큰**을 참조하고, primitive color는 variant resolver 내부에서만 사용합니다.

### 2. Web (`@yeoooonn/ds-web`)

React 18+ 웹 컴포넌트 라이브러리입니다.

**스타일링 전략**

- `@yeoooonn/ds-tokens` 값을 `React.CSSProperties`로 매핑
- 컴포넌트별 `*Styles.ts`에 variant/size/state resolver 분리
- 런타임 CSS-in-JS 라이브러리 없음 → **번들 크기·peer dependency 최소화**

**패턴**

```
components/Button/
  index.tsx          # 마크업 + 이벤트 + a11y
  buttonStyles.ts    # resolveButtonStyles, size/variant 타입
  Button.stories.tsx # Storybook 문서
```

- **Compound Component**: Modal, Card (`Modal.Header` 등)
- **Provider + Hook**: ThemeProvider, ToastProvider + useToast
- **Portal**: Modal, Toast, Tooltip

### 3. App (`@yeoooonn/ds-app`)

Expo / React Native 컴포넌트입니다. 웹과 **코드를 공유하지 않고**, 토큰과 public API만 맞춥니다.

**스타일링 전략**

- NativeWind v4 + Tailwind 3
- `tailwind.config.js` / `tailwind-preset.js`로 tokens → Tailwind theme 매핑
- CVA + `cn()` (clsx + tailwind-merge)

**웹과의 차이**

| 항목 | 웹 | 앱 |
| --- | --- | --- |
| 스타일 | inline style + resolver | NativeWind className |
| 이벤트 | `onClick` | `onPress` |
| Icon | SVG URL + CSS mask | children slot |
| Select | native `<select>` / custom | BottomSheet 옵션 목록 |
| BottomSheet | — | Reanimated + PanResponder (앱 전용) |

자세한 포트 결정은 [ds-app NativeWind 설계](../superpowers/specs/2026-07-13-ds-app-nativewind-design.md)를 참고하세요.

## 크로스 플랫폼 전략

**미러 포트 (Mirror Port)**

- JSX/CSS를 공유하지 않음
- `@yeoooonn/ds-tokens` + 동일한 props 이름·variant union 유지
- 플랫폼별 a11y (`aria-*` vs `accessibilityRole`)

이 방식은 React Native Web 단일 코드베이스보다 중복이 있지만, 각 플랫폼의 UX·성능·번들 특성을 유지하기 쉽습니다.

## 테마

```tsx
<ThemeProvider defaultScheme="light">
  {children}
</ThemeProvider>
```

- `useTheme()` → `{ theme, colorScheme, toggleTheme, setColorScheme }`
- `theme`은 `@yeoooonn/ds-tokens`의 `lightTheme` / `darkTheme`
- Storybook toolbar에서 light/dark 전환 지원

## 빌드 & 배포

| 패키지 | 빌드 | 산출물 |
| --- | --- | --- |
| tokens | tsup | ESM + CJS + `.d.ts` |
| web | tsup | ESM + CJS + `.d.ts` |
| app | tsup | ESM + CJS + `.d.ts` + tailwind preset |

- `prepublishOnly`에서 빌드 실행
- `publishConfig.access: public`

## 문서화

| 채널 | 대상 |
| --- | --- |
| Storybook (`pnpm storybook`) | 웹 컴포넌트 API, variant, 사용 예 |
| Storybook RN (`pnpm storybook:app`) | `@yeoooonn/ds-app` on-device / Expo Web |
| `docs/superpowers/specs/` | 기능별 설계 결정 (ADR 성격) |

## 확장 가이드

새 컴포넌트 추가 시 권장 순서:

1. `@yeoooonn/ds-tokens`에 필요한 시맨틱 토큰 추가
2. `packages/web`에 구현 + Storybook
3. `packages/app`에 API parity 맞춰 RN 구현
4. `packages/web/src/index.ts`, `packages/app/src/index.ts` export
5. (선택) `docs/superpowers/specs/`에 설계 메모

## 향후 고려 사항

- **Changesets**: semver 자동 bump
- **CI**: build + typecheck + Storybook deploy
- **테스트**: resolver 단위 테스트, a11y smoke test

## 웹 스타일링: Inline Style vs Tailwind

현재 `@yeoooonn/ds-web`은 **inline style + token resolver**를 사용합니다.

| 기준 | Inline (현재) | Tailwind |
| --- | --- | --- |
| 소비 앱 의존성 | 없음 | Tailwind 빌드 파이프라인 필요 |
| RN과 스타일 공유 | tokens만 공유 | app은 NativeWind, web은 Tailwind로 유사 문법 |
| variant 로직 | TypeScript resolver로 명시적 | CVA + className |
| 번들 | 런타임 CSS-in-JS 없음 | purged CSS 또는 className 문자열 |
| Storybook | 추가 설정 없음 | `@tailwind` + postcss 설정 |

**권장**: npm 라이브러리로 배포하는 현재 목표라면 inline 유지가 유리합니다. 소비 앱이 Tailwind를 쓰더라도 DS가 Tailwind를 강제하지 않습니다.

Tailwind 전환을 검토할 시점:

- 웹·앱 스타일 표현을 className 수준에서 더 맞추고 싶을 때
- variant가 더 늘어 resolver 파일이 비대해질 때
- DS를 **앱 내부 패키지**로만 쓰고 npm 배포가 아닐 때

전환 시 `@yeoooonn/ds-app`의 NativeWind preset과 동일한 token → theme 매핑을 web `tailwind.config`로 공유하는 하이브리드가 현실적입니다.
