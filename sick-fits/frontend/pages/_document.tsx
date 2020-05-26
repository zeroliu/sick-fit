/* eslint-disable @typescript-eslint/no-explicit-any */
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import React, { ReactElement } from 'react';
import { ServerStyleSheet } from 'styled-components';

interface Props {
  styleTags: ReactElement;
}

export default class Document extends NextDocument<Props> {
  static getInitialProps({ renderPage }: any) {
    const sheet = new ServerStyleSheet();
    const page = renderPage({
      enhanceApp: (App: any) => (props: any) =>
        sheet.collectStyles(<App {...props} />),
    });
    const styleTags = sheet.getStyleElement();
    return {
      ...page,
      styleTags,
    };
  }

  render() {
    return (
      <Html>
        <Head>{this.props.styleTags}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
