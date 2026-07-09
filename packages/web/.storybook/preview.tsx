import type { Preview } from '@storybook/react-vite';
import React from 'react';
import {
  Controls,
  Description,
  Primary,
  Source,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import { darkTheme, lightTheme } from '@yeoooonn/ds-tokens';
import { ThemeProvider } from '../src/theme/ThemeProvider';

type ColorScheme = 'light' | 'dark';

const preview: Preview = {
  tags: ['autodocs'],
  globalTypes: {
    colorScheme: {
      description: 'Color scheme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    colorScheme: 'light',
  },
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Source />
          <Controls />
        </>
      ),
    },
  },
  decorators: [
    (Story, { globals, viewMode }) => {
      const colorScheme = (globals.colorScheme ?? 'light') as ColorScheme;
      const theme = colorScheme === 'light' ? lightTheme : darkTheme;
      const isDocs = viewMode === 'docs';

      return (
        <ThemeProvider defaultScheme={colorScheme} key={colorScheme}>
          <div
            style={{
              backgroundColor: theme.background.primary,
              color: theme.text.primary,
              padding: isDocs ? 16 : 24,
              minHeight: isDocs ? undefined : '100vh',
            }}
          >
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
