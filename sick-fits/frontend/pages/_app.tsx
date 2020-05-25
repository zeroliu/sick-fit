/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import NextApp, { AppContext } from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-boost';

import { Page } from 'src/components/page/Page';
import withData from 'src/lib/withData';
import { wrapper } from 'src/model/store';

class App extends NextApp<{ apollo: ApolloClient<any> }> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps: any = {};
    if (Component.getInitialProps) {
      try {
        pageProps = await Component.getInitialProps(ctx);
      } catch (e) {
        console.error(e);
      }
    }
    pageProps.query = ctx.query;
    return { pageProps };
  }
  render() {
    const { Component, apollo, pageProps } = this.props;
    return (
      <ApolloProvider client={apollo}>
        <Page>
          <Component {...pageProps}></Component>
        </Page>
      </ApolloProvider>
    );
  }
}

export default wrapper.withRedux(withData(App));
