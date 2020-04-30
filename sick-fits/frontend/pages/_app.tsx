import NextApp from 'next/app';
import { Page } from 'src/components/page/Page';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-boost';
import withData from 'src/lib/withData';

class App extends NextApp<{ apollo: ApolloClient<any> }> {
  static async getInitialProps({ Component, ctx }: any) {
    let pageProps: any = {};
    if (Component.getInitialProps) {
      try {
        pageProps = await Component.getInitialProps();
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

export default withData(App);
