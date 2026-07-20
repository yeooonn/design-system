import type { Meta, StoryObj } from "@storybook/react-native";
import { OverviewRoot, Row, Stack, SubSection } from "../../stories/layout";
import { useTheme } from "../../theme/ThemeProvider";
import { Spinner } from "./index";
import type { SpinnerSize } from "./index";

type SpinnerPlaygroundArgs = {
  size: SpinnerSize;
};

const meta = {
  title: "Components/Spinner",
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
  args: { size: "md" },
  render: ({ size }) => <Spinner size={size} />,
} satisfies Meta<SpinnerPlaygroundArgs>;

export default meta;
type Story = StoryObj<SpinnerPlaygroundArgs>;

export const Playground: Story = {};

export const Overview: Story = {
  parameters: { controls: { disable: true } },
  render: function SpinnerOverviewStory() {
    const { theme } = useTheme();

    return (
      <OverviewRoot>
        <SubSection title="Sizes">
          <Row gap={24}>
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
            <Spinner size="md" color={theme.status.error} />
          </Row>
        </SubSection>
      </OverviewRoot>
    );
  },
};
