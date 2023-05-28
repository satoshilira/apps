import type { Preview } from "@storybook/react";
import {withThemeFromJSXProvider} from "@storybook/addon-styling";
import {createGlobalStyle, ThemeProvider} from "styled-components";
import darkTheme from '../src/theme'

const GlobalStyles = createGlobalStyle`
  body {
    font-family: "Apercu Mono Pro", "Avenir Next", Helvetica, Arial, sans-serif;
  }
`;

export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      dark: darkTheme,
      light: darkTheme,
    },
    defaultTheme: 'light',
    Provider: ThemeProvider,
    GlobalStyles,
  })];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
