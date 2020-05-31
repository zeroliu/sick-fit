import ApolloClient from 'apollo-boost';
import withApollo from 'next-with-apollo';

import { endpoint, prodEndpoint } from 'src/config';

export default withApollo(({ headers }) => {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
    request: (operation) => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
  });
});
