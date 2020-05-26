/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApolloProvider } from '@apollo/react-hooks';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ApolloClient } from 'apollo-boost';
import NextApp, { AppContext } from 'next/app';
import React from 'react';

import { Page } from 'src/components/page/Page';
import { stripePublicKey } from 'src/config';
import withData from 'src/lib/withData';
import { wrapper } from 'src/model/store';

const stripe = loadStripe(stripePublicKey);

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
      <Elements stripe={stripe}>
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Elements>
    );
  }
}

export default wrapper.withRedux(withData(App));
