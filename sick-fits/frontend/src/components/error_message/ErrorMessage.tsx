import { ApolloError } from 'apollo-boost';
import React from 'react';

import { StyledError } from './error_message_styles';

interface Props {
  error?: ApolloError;
}

export const ErrorMessage: React.FC<Props> = ({ error }) => {
  if (!error?.message) return null;
  // if (
  //   error.networkError &&
  //   error.networkError.result &&
  //   error.networkError.result.errors.length
  // ) {
  //   return error.networkError.result.errors.map((error, i) => (
  //     <StyledError key={i}>
  //       <p data-test='graphql-error'>
  //         <strong>Shoot!</strong>
  //         {error.message.replace('GraphQL error: ', '')}
  //       </p>
  //     </StyledError>
  //   ));
  // }
  return (
    <StyledError>
      <p data-test='graphql-error'>
        <strong>Shoot!</strong>
        {error.message.replace('GraphQL error: ', '')}
      </p>
    </StyledError>
  );
};
