import type { Preview } from '@storybook/react-vite';
import React from 'react';
import {
  Controls,
  Description,
  Primary,
  Source,
  Stories,
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
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    a11y: {
      test: 'todo',
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: { width: '375px', height: '667px' },
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1280px', height: '800px' },
        },
      },
    },
    docs: {
      toc: true,
      controls: {
        exclude: ['style', 'className', 'as'],
      },
      source: {
        type: 'dynamic',
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
          <Source />
          <Stories />
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
