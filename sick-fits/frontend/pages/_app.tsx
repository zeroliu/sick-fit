import NextApp, { Container } from 'next/app';
import { Page } from 'components/page/Page';

export default class App extends NextApp {
  render() {
    const { Component } = this.props;
    return (
      <Container>
        <Page>
          <Component></Component>
        </Page>
      </Container>
    );
  }
}
