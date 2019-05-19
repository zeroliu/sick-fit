import React, { Component } from 'react';
import { Header } from 'components/header';
import { Meta } from 'components/meta';
import { StyledPage, Inner } from './styles';
import { ThemeProvider } from 'styled-components';
import { theme } from 'global';

export class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <Header />
          <Inner>{this.props.children}</Inner>
        </StyledPage>
      </ThemeProvider>
    );
  }
}
