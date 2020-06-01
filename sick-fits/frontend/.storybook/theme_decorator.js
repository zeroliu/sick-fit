import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from '../src/lib/global_styles';

export const themeDecorator = (storyFn) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {storyFn()}
  </ThemeProvider>
);
