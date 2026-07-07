import type { Meta, StoryObj } from "@storybook/react-vite";
import { borderRadius, colors, spacing } from "@yeoooonn/ds-tokens";
import type React from "react";
import { useTheme } from "../../theme/ThemeProvider";
import { Icon } from "../Icon";
import { Typography } from "../Typography";
import { Card } from "./index";

const cardWidth = { maxWidth: 400 };

const chartIcon =
  "https://static.toss.im/icons/svg/icon-graph-up-mono.svg";
const bellIcon = "https://static.toss.im/icons/svg/icon-bell-mono.svg";
const userIcon = "https://static.toss.im/icons/svg/icon-user-mono.svg";
const checkIcon =
  "https://static.toss.im/icons/svg/icon-check-circle-green.svg";

const usageSource = `import { Card, Typography } from "@yeoooonn/ds-web";

// 전체 구성
<Card>
  <Card.Header>
    <Typography.H3>카드 제목</Typography.H3>
  </Card.Header>
  <Card.Content>
    <Typography.P1>카드 내용</Typography.P1>
  </Card.Content>
  <Card.Footer>
    <Typography.Caption color="secondary">마지막 업데이트: 2026.07.07</Typography.Caption>
  </Card.Footer>
</Card>

// 본문만
<Card>
  <Card.Content>
    <Typography.P1>본문만 있는 카드</Typography.P1>
  </Card.Content>
</Card>

// 헤더 + 본문
<Card>
  <Card.Header>
    <Typography.H3>제목</Typography.H3>
  </Card.Header>
  <Card.Content>
    <Typography.P1>내용</Typography.P1>
  </Card.Content>
</Card>

// 본문 + 푸터
<Card>
  <Card.Content>
    <Typography.P1>내용</Typography.P1>
  </Card.Content>
  <Card.Footer>
    <Typography.Caption color="secondary">부가 정보</Typography.Caption>
  </Card.Footer>
</Card>`;

type CardStoryArgs = {
  showHeader: boolean;
  showFooter: boolean;
  boxShadow: boolean;
};

function getPlaygroundSource(
  showHeader: boolean,
  showFooter: boolean,
  boxShadow: boolean,
) {
  const header = showHeader
    ? `  <Card.Header>
    <Typography.H3>카드 제목</Typography.H3>
  </Card.Header>
`
    : "";

  const footer = showFooter
    ? `  <Card.Footer>
    <Typography.Caption color="secondary">마지막 업데이트: 2026.07.07</Typography.Caption>
  </Card.Footer>
`
    : "";

  return `${boxShadow ? "<Card boxShadow" : "<Card"} style={{ maxWidth: 400 }}>
${header}  <Card.Content>
    <Typography.P1>카드 내용은 부모에서 자유롭게 구성할 수 있습니다.</Typography.P1>
  </Card.Content>
${footer}</Card>`;
}

const overviewSource = `<Card boxShadow style={{ maxWidth: 360 }}>
  <Card.Header>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div>
        <Typography.Caption color="secondary">이번 달 매출</Typography.Caption>
        <Typography.H2>₩12,480,000</Typography.H2>
      </div>
      <div style={{ padding: "6px 10px", borderRadius: 9999, background: "..." }}>
        <Typography.Caption color="success">+18.2%</Typography.Caption>
      </div>
    </div>
  </Card.Header>
  <Card.Content>
    <Typography.P2 color="secondary">
      지난달 대비 성장률이 가장 높은 카테고리는 프리미엄 플랜입니다.
    </Typography.P2>
  </Card.Content>
  <Card.Footer>
    <Typography.Caption color="tertiary">업데이트: 5분 전</Typography.Caption>
    <Typography.Caption color="secondary">전체 리포트 보기 →</Typography.Caption>
  </Card.Footer>
</Card>`;

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

function IconBadge({
  src,
  background,
  color,
}: {
  src: string;
  background: string;
  color: string;
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        borderRadius: borderRadius.md,
        backgroundColor: background,
        color,
        flexShrink: 0,
      }}
    >
      <Icon src={src} size="md" />
    </div>
  );
}

function MetricCard() {
  return (
    <Card style={{ ...cardWidth, width: "100%" }} boxShadow>
      <Card.Header>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: spacing[4],
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: spacing[1] }}>
            <Typography.Caption color="secondary">이번 달 매출</Typography.Caption>
            <Typography.H2>₩12,480,000</Typography.H2>
          </div>
          <div
            style={{
              padding: `${spacing[1]}px ${spacing[3]}px`,
              borderRadius: borderRadius.full,
              backgroundColor: `${colors.success[500]}14`,
            }}
          >
            <Typography.Caption color="success">+18.2%</Typography.Caption>
          </div>
        </div>
      </Card.Header>
      <Card.Content>
        <Typography.P2 color="secondary">
          지난달 대비 성장률이 가장 높은 카테고리는 프리미엄 플랜입니다.
        </Typography.P2>
      </Card.Content>
      <Card.Footer>
        <Typography.Caption color="tertiary">업데이트: 5분 전</Typography.Caption>
        <Typography.Caption color="secondary">전체 리포트 보기 →</Typography.Caption>
      </Card.Footer>
    </Card>
  );
}

function PlanCard() {
  const features = ["무제한 프로젝트", "팀 협업 도구", "우선 지원", "API 접근"];

  return (
    <Card style={{ ...cardWidth, width: "100%" }} boxShadow>
      <Card.Header>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: spacing[1] }}>
            <Typography.H3>Pro 플랜</Typography.H3>
            <Typography.P2 color="secondary">성장하는 팀을 위한 플랜</Typography.P2>
          </div>
          <span
            style={{
              padding: `${spacing[1]}px ${spacing[3]}px`,
              borderRadius: borderRadius.full,
              backgroundColor: colors.primary[50],
              color: colors.primary[600],
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            인기
          </span>
        </div>
      </Card.Header>
      <Card.Content>
        <div style={{ display: "flex", alignItems: "baseline", gap: spacing[1], marginBottom: spacing[5] }}>
          <Typography.H1>₩29,000</Typography.H1>
          <Typography.P2 color="tertiary">/월</Typography.P2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: spacing[3] }}>
          {features.map((feature) => (
            <div
              key={feature}
              style={{ display: "flex", alignItems: "center", gap: spacing[2] }}
            >
              <Icon src={checkIcon} size="sm" />
              <Typography.P2>{feature}</Typography.P2>
            </div>
          ))}
        </div>
      </Card.Content>
      <Card.Footer>
        <Typography.Caption color="tertiary">14일 무료 체험</Typography.Caption>
        <Typography.Caption color="secondary">자세히 보기 →</Typography.Caption>
      </Card.Footer>
    </Card>
  );
}

function ActivityCard() {
  const { theme } = useTheme();

  const activities = [
    {
      icon: chartIcon,
      title: "주간 리포트 생성 완료",
      description: "3월 1주차 성과 리포트가 준비되었습니다.",
      time: "10분 전",
    },
    {
      icon: userIcon,
      title: "새 팀원 초대",
      description: "김디자인 님이 디자인 팀에 합류했습니다.",
      time: "1시간 전",
    },
    {
      icon: bellIcon,
      title: "결제 알림",
      description: "Pro 플랜 구독이 갱신되었습니다.",
      time: "어제",
    },
  ];

  return (
    <Card style={{ ...cardWidth, width: "100%" }} boxShadow>
      <Card.Header>
        <Typography.H3>최근 활동</Typography.H3>
      </Card.Header>
      <Card.Content style={{ display: "flex", flexDirection: "column", gap: spacing[5] }}>
        {activities.map((activity, index) => (
          <div key={activity.title}>
            <div style={{ display: "flex", gap: spacing[3] }}>
              <IconBadge
                src={activity.icon}
                background={theme.background.secondary}
                color={theme.action.primary}
              />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: spacing[1] }}>
                <Typography.Label>{activity.title}</Typography.Label>
                <Typography.P2 color="secondary">{activity.description}</Typography.P2>
                <Typography.Caption color="tertiary">{activity.time}</Typography.Caption>
              </div>
            </div>
            {index < activities.length - 1 && (
              <div
                style={{
                  height: 1,
                  backgroundColor: theme.border.default,
                  marginTop: spacing[5],
                }}
              />
            )}
          </div>
        ))}
      </Card.Content>
    </Card>
  );
}

function ProfileCard() {
  const { theme } = useTheme();

  const stats = [
    { label: "프로젝트", value: "24" },
    { label: "완료율", value: "92%" },
    { label: "협업자", value: "8" },
  ];

  return (
    <Card style={{ ...cardWidth, width: "100%" }} boxShadow>
      <Card.Content>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing[4] }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: borderRadius.full,
              background: `linear-gradient(135deg, ${colors.primary[400]}, ${colors.primary[600]})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: colors.white,
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            YJ
          </div>
          <div style={{ textAlign: "center" }}>
            <Typography.H3>김연정</Typography.H3>
            <Typography.P2 color="secondary">Product Designer</Typography.P2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: spacing[2],
              width: "100%",
              padding: spacing[4],
              borderRadius: borderRadius.md,
              backgroundColor: theme.background.secondary,
            }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: spacing[1],
                }}
              >
                <Typography.H3>{stat.value}</Typography.H3>
                <Typography.Caption color="tertiary">{stat.label}</Typography.Caption>
              </div>
            ))}
          </div>
          <Typography.P2 color="secondary" style={{ textAlign: "center" }}>
            디자인 시스템과 프로덕트 경험을 개선하는 일을 하고 있습니다.
          </Typography.P2>
        </div>
      </Card.Content>
      <Card.Footer>
        <Typography.Caption color="tertiary">서울, 대한민국</Typography.Caption>
        <Typography.Caption color="secondary">프로필 보기 →</Typography.Caption>
      </Card.Footer>
    </Card>
  );
}

const meta = {
  title: "Card",
  component: Card,
  parameters: {
    docs: {
      description: {
        component: `
Card는 compound component로 구성되는 컨테이너입니다.
헤더, 본문, 푸터 등 모든 내용은 부모에서 조합합니다.

| 컴포넌트 | 설명 |
| --- | --- |
| \`Card\` | 루트 컨테이너 (\`boxShadow\` prop으로 그림자 적용) |
| \`Card.Header\` | 헤더 영역 (선택) |
| \`Card.Content\` | 본문 영역 |
| \`Card.Footer\` | 푸터 영역 (선택) |
        `.trim(),
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<CardStoryArgs>;

export const Playground: Story = {
  argTypes: {
    showHeader: { control: "boolean", description: "헤더 표시 여부" },
    showFooter: { control: "boolean", description: "푸터 표시 여부" },
    boxShadow: { control: "boolean", description: "그림자 표시 여부" },
  },
  args: {
    showHeader: true,
    showFooter: true,
    boxShadow: false,
  },
  parameters: {
    docs: {
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (_code, { args }) =>
          getPlaygroundSource(
            args.showHeader ?? true,
            args.showFooter ?? true,
            args.boxShadow ?? false,
          ),
      },
    },
  },
  render: ({ showHeader, showFooter, boxShadow }) => (
    <Card style={cardWidth} boxShadow={boxShadow}>
      {showHeader && (
        <Card.Header>
          <Typography.H3>카드 제목</Typography.H3>
        </Card.Header>
      )}
      <Card.Content>
        <Typography.P1>
          카드 내용은 부모에서 자유롭게 구성할 수 있습니다.
        </Typography.P1>
      </Card.Content>
      {showFooter && (
        <Card.Footer>
          <Typography.Caption color="secondary">
            마지막 업데이트: 2026.07.07
          </Typography.Caption>
        </Card.Footer>
      )}
    </Card>
  ),
};

export const Usage: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "필요한 서브 컴포넌트만 조합해 사용합니다. 표시하지 않을 영역은 생략하면 됩니다.",
      },
      source: {
        type: "code",
        language: "tsx",
        code: usageSource,
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <UsageSection title="전체 구성 (Header + Content + Footer)">
        <Card style={cardWidth}>
          <Card.Header>
            <Typography.H3>카드 제목</Typography.H3>
          </Card.Header>
          <Card.Content>
            <Typography.P1>
              헤더, 본문, 푸터를 모두 포함한 기본 카드입니다.
            </Typography.P1>
          </Card.Content>
          <Card.Footer>
            <Typography.Caption color="secondary">
              마지막 업데이트: 2026.07.07
            </Typography.Caption>
          </Card.Footer>
        </Card>
      </UsageSection>

      <UsageSection title="본문만 (Content)">
        <Card style={cardWidth}>
          <Card.Content>
            <Typography.P1>
              헤더와 푸터 없이 본문만 표시하는 카드입니다.
            </Typography.P1>
          </Card.Content>
        </Card>
      </UsageSection>

      <UsageSection title="헤더 + 본문 (Header + Content)">
        <Card style={cardWidth}>
          <Card.Header>
            <Typography.H3>공지사항</Typography.H3>
          </Card.Header>
          <Card.Content>
            <Typography.P1>
              푸터 없이 제목과 내용만 표시할 때 사용합니다.
            </Typography.P1>
          </Card.Content>
        </Card>
      </UsageSection>

      <UsageSection title="본문 + 푸터 (Content + Footer)">
        <Card style={cardWidth}>
          <Card.Content>
            <Typography.P1>
              부가 정보가 필요한 경우 푸터만 추가합니다.
            </Typography.P1>
          </Card.Content>
          <Card.Footer>
            <Typography.Caption color="secondary">부가 정보</Typography.Caption>
          </Card.Footer>
        </Card>
      </UsageSection>
    </div>
  ),
};

export const Overview: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Card 컴포넌트는 레이아웃만 제공합니다. 배지, 아이콘, 통계, 구분선 등은 부모에서 자유롭게 조합할 수 있습니다.",
      },
      source: {
        type: "code",
        language: "tsx",
        code: overviewSource,
      },
    },
  },
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: spacing[6],
        maxWidth: 880,
      }}
    >
      <MetricCard />
      <PlanCard />
      <ActivityCard />
      <ProfileCard />
    </div>
  ),
};
