import withApollo, { InitApolloOptions } from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { endpoint } from '../config';

function createClient({ headers }: InitApolloOptions<{}>) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
      return Promise.resolve();
    },
  });
}

export const withData = withApollo(createClient);
