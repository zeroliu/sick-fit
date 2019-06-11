import React from 'react';

import { ErrorStyles } from './styles';

interface Props {
  error?: Error;
}

export const ErrorMessage = ({ error }: Props) => {
  if (!error || !error.message) return null;
  // if (
  //   error.networkError &&
  //   error.networkError.result &&
  //   error.networkError.result.errors.length
  // ) {
  //   return error.networkError.result.errors.map((error, i) => (
  //     <ErrorStyles key={i}>
  //       <p data-test='graphql-error'>
  //         <strong>Shoot!</strong>
  //         {error.message.replace('GraphQL error: ', '')}
  //       </p>
  //     </ErrorStyles>
  //   ));
  // }
  return (
    <ErrorStyles>
      <p data-test='graphql-error'>
        <strong>Shoot!</strong>
        {error.message.replace('GraphQL error: ', '')}
      </p>
    </ErrorStyles>
  );
};
