import NextApp from 'next/app';
import { Page } from 'components/page/Page';

export default class App extends NextApp {
  render() {
    const { Component } = this.props;
    return (
      <Page>
        <Component></Component>
      </Page>
    );
  }
}
