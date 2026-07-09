import type { Meta, StoryObj } from "@storybook/react-vite";
import { colors } from "@yeoooonn/ds-tokens";
import { Icon } from "./index";
import type { IconColor, IconSize } from "./index";

const iconSources = {
  search: "https://static.toss.im/icons/svg/icon-search-bold-mono.svg",
  bell: "https://static.toss.im/icons/svg/icon-bell-mono.svg",
  user: "https://static.toss.im/icons/svg/icon-user-mono.svg",
  check: "https://static.toss.im/icons/svg/icon-check-circle-green.svg",
  graph: "https://static.toss.im/icons/svg/icon-graph-up-mono.svg",
} as const;

type IconName = keyof typeof iconSources;

const colorOptions: IconColor[] = [
  "primary",
  "secondary",
  "tertiary",
  "success",
  "warning",
  "error",
];

const usageSource = `import { Icon } from "@yeoooonn/ds-web";

// SVG URL과 size로 사용 (부모 color 상속)
<Icon
  src="https://static.toss.im/icons/svg/icon-search-bold-mono.svg"
  size="md"
/>

// color prop으로 시맨틱 색상 지정
<Icon src="..." size="lg" color="primary" />
<Icon src="..." size="lg" color="error" />

// color prop이 없으면 부모 color를 따름
<span style={{ color: "#2563eb" }}>
  <Icon src="..." size="lg" />
</span>`;

type IconPlaygroundArgs = {
  icon: IconName;
  size: IconSize;
  color?: IconColor;
  useColorProp: boolean;
};

const meta: Meta<IconPlaygroundArgs> = {
  title: "Icon",
  component: Icon,
  parameters: {
    controls: {
      exclude: ["src"],
    },
    docs: {
      description: {
        component: `
SVG URL을 \`mask-image\`로 렌더링하는 아이콘 컴포넌트입니다.
\`color\` prop으로 시맨틱 색상을 지정하거나, 생략 시 부모의 \`currentColor\`를 따릅니다.
        `.trim(),
      },
    },
  },
  argTypes: {
    icon: {
      control: "select",
      options: Object.keys(iconSources),
      description: "아이콘 종류",
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
    useColorProp: { control: "boolean", description: "color prop 사용" },
    color: {
      control: "select",
      options: colorOptions,
      if: { arg: "useColorProp", truthy: true },
      description: "시맨틱 색상",
    },
    src: { table: { disable: true } },
  },
  args: {
    icon: "search",
    size: "md",
    useColorProp: true,
    color: "primary",
  },
  render: ({ icon, size, color, useColorProp }) => (
    <Icon
      src={iconSources[icon]}
      size={size}
      color={useColorProp ? color : undefined}
    />
  ),
};

export default meta;
type Story = StoryObj<IconPlaygroundArgs>;

export const Playground: Story = {};

export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <Icon src={iconSources.search} size="sm" />
        <span style={{ fontSize: 12, color: colors.gray[500] }}>sm (16px)</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <Icon src={iconSources.search} size="md" />
        <span style={{ fontSize: 12, color: colors.gray[500] }}>md (20px)</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <Icon src={iconSources.search} size="lg" />
        <span style={{ fontSize: 12, color: colors.gray[500] }}>lg (24px)</span>
      </div>
    </div>
  ),
};

export const Colors: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "`color` prop으로 Typography와 동일한 시맨틱 색상을 지정합니다. prop이 없으면 부모의 color를 따릅니다.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      <Icon src={iconSources.bell} size="lg" color="primary" />
      <Icon src={iconSources.bell} size="lg" color="secondary" />
      <Icon src={iconSources.bell} size="lg" color="success" />
      <Icon src={iconSources.bell} size="lg" color="warning" />
      <Icon src={iconSources.bell} size="lg" color="error" />
    </div>
  ),
};

export const InheritedColor: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "`color` prop 없이 부모 요소의 color를 상속하는 예시입니다.",
      },
    },
  },
  render: () => (
    <span style={{ color: colors.primary[600], display: "inline-flex" }}>
      <Icon src={iconSources.search} size="lg" />
    </span>
  ),
};

export const Overview: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: 16,
        maxWidth: 320,
      }}
    >
      {(Object.entries(iconSources) as [IconName, string][]).map(([name, src]) => (
        <div
          key={name}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Icon src={src} size="md" />
          <span style={{ fontSize: 12, color: colors.gray[500] }}>{name}</span>
        </div>
      ))}
    </div>
  ),
};

export const Usage: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        code: usageSource,
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <Icon src={iconSources.search} size="md" />
      <Icon src={iconSources.search} size="lg" color="primary" />
      <Icon src={iconSources.search} size="lg" color="error" />
    </div>
  ),
};
