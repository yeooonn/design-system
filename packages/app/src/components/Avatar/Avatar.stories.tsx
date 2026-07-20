import type { Meta, StoryObj } from "@storybook/react-native";
import { OverviewRoot, Row, SubSection } from "../../stories/layout";
import { Avatar } from "./index";
import type { AvatarSize } from "./index";

type AvatarPlaygroundArgs = {
  name: string;
  showImage: boolean;
  size: AvatarSize;
};

const avatarImage = {
  uri: "https://api.dicebear.com/7.x/avataaars/png?seed=ds-app",
};

const meta = {
  title: "Components/Avatar",
  argTypes: {
    name: { control: "text" },
    showImage: { control: "boolean" },
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
  },
  args: {
    name: "Kim Yeonjeong",
    showImage: false,
    size: "md",
  },
  render: ({ name, showImage, size }) => (
    <Avatar name={name} size={size} src={showImage ? avatarImage : undefined} />
  ),
} satisfies Meta<AvatarPlaygroundArgs>;

export default meta;
type Story = StoryObj<AvatarPlaygroundArgs>;

export const Playground: Story = {};

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <OverviewRoot>
      <SubSection title="Initials">
        <Row gap={12}>
          <Avatar name="Kim Yeonjeong" size="sm" />
          <Avatar name="Kim Yeonjeong" size="md" />
          <Avatar name="Kim Yeonjeong" size="lg" />
          <Avatar name="Kim Yeonjeong" size="xl" />
        </Row>
      </SubSection>
      <SubSection title="Fallback">
        <Row gap={12}>
          <Avatar size="md" />
          <Avatar name="단일이름" size="md" />
          <Avatar name="홍 길동" size="lg" />
        </Row>
      </SubSection>
    </OverviewRoot>
  ),
};
