import type { Preview } from '@storybook/react-vite';

import '../index.css';
import { withThemeByClassName } from '@storybook/addon-themes';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (StoryFn, args) => (
      <div className="w-full h-full overflow-hidden">
        <StoryFn {...args} />
        <style>{`
              html,
              body,
              #storybook-root, .sb-main-padded {
                height: 100% !important;
                overflow: hidden !important;
                padding: 0 !important;
                margin: 0 !important;
              }
            `}</style>
      </div>
    ),
    withThemeByClassName({
      themes: {
        dark: 'dark',
        light: 'light',
      },
      defaultTheme: 'dark',
    }),
  ],
};

export default preview;
