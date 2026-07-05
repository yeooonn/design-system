import type { Preview } from '@storybook/react-vite';
import React from 'react';
import {
  Controls,
  Description,
  Primary,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import { ThemeProvider } from '../src/theme/ThemeProvider';

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
        </>
      ),
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
