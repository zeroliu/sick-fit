import Router from 'next/router';
import Nprogress from 'nprogress';
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { CheckoutForm } from 'src/components/checkout_form/CheckoutForm';
import { Header } from 'src/components/header/Header';
import { Meta } from 'src/components/Meta';
import { theme, GlobalStyle } from 'src/lib/global_styles';

Router.events.on('routeChangeStart', () => {
  Nprogress.start();
});

Router.events.on('routeChangeComplete', () => {
  Nprogress.done();
});

Router.events.on('routeChangeError', () => {
  Nprogress.done();
});

const StyledPage = styled.div`
  background: white;
  color: ${(props) => props.theme.black};
`;

const Inner = styled.div`
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

export const Page: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <StyledPage>
      <Meta />
      <Header />
      <Inner>{children}</Inner>
    </StyledPage>
    <CheckoutForm />
  </ThemeProvider>
);
