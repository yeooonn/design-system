import React from "react";
import type { Preview } from "@storybook/react-native";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ToastProvider } from "../src/components/Toast";
import { ThemeProvider, useTheme } from "../src/theme/ThemeProvider";
import { StoryCanvas } from "../src/stories/layout";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <SafeAreaProvider>
        <ThemeProvider>
          <ToastProvider style={{ flex: 1 }}>
            <ThemedStoryFrame>
              <Story />
            </ThemedStoryFrame>
          </ToastProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    ),
  ],
};

function ThemedStoryFrame({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        backgroundColor: theme.background.primary,
        paddingHorizontal: 24,
        paddingTop: 16,
      }}
    >
      <StoryCanvas>{children}</StoryCanvas>
    </View>
  );
}

export default preview;
