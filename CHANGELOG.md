# Changelog

이 프로젝트의 주요 변경 사항을 기록합니다.

형식은 [Keep a Changelog](https://keepachangelog.com/ko/1.1.0/)를 따르며,
[Semantic Versioning](https://semver.org/lang/ko/)을 준수합니다.

## [Unreleased]

### @yeoooonn/ds-tokens

#### Added

- 다크 테마 색상 및 시맨틱 테마 구조 확장
- `textStyles` 시맨틱 타이포그래피 프리셋

### @yeoooonn/ds-web

#### Added

- Avatar, Badge, Checkbox, Chip, Divider, ListItem, Radio, Result, Select, Skeleton, Spinner, Switch, Tab, Textarea, Tooltip 컴포넌트
- Toast 명령형 API (`ToastProvider`, `useToast`)
- Storybook 설정 및 컴포넌트 스토리
- Vitest 기반 컴포넌트 테스트

#### Changed

- Button `children` API로 통합 (IconButton 제거)
- Tooltip 정렬·반응형 트리거 스타일 개선
- Card 테마 기반 그림자(`cardStyles`) 적용
- UI 컴포넌트 스타일을 시맨틱 테마 기준으로 통일

#### Removed

- IconButton 컴포넌트 (Button으로 통합)

### @yeoooonn/ds-app

#### Added

- Avatar, Badge, BottomSheet, Button, Card, Checkbox, Chip, Divider, Icon, Input, KeyboardAvoid, ListItem, Modal, Radio, Result, Select, Skeleton, Spinner, Switch, Tab, Textarea, Toast, Tooltip, Typography 컴포넌트
- `KeyboardScrollProvider`, `useKeyboardScroll` 훅
- React Native Storybook 및 on-device 스토리
- Jest 기반 컴포넌트 테스트

#### Changed

- NativeWind/Tailwind 인프라 제거, `@yeoooonn/ds-tokens` 기반 inline `style` 전략으로 전환
- UI 컴포넌트 스타일을 시맨틱 테마 기준으로 통일

#### Removed

- **`className` prop API** — `style` prop만 지원 (**Breaking Change**)
- NativeWind/Tailwind 관련 설정 및 의존성

#### Fixed

- Tooltip Expo Web portal 및 위치 보정

#### Changed (배포)

- npm tarball에서 story/test 파일 제외 (`src/.npmignore`)

---

## [0.0.1] - 2026-07-03

### @yeoooonn/ds-tokens

- color, typography, spacing, `lightTheme` / `darkTheme` 시맨틱 토큰 초기 공개

### @yeoooonn/ds-web

- ThemeProvider, Button, Input, Typography, Modal, Card 컴포넌트 초기 공개

### @yeoooonn/ds-app

- ThemeProvider 및 핵심 React Native 컴포넌트 초기 공개
