import React from 'react';
import { useSignOutMutation, ME_QUERY } from 'src/queries/user';

export const SignOut: React.FC = () => {
  const [signOut, { error }] = useSignOutMutation({
    refetchQueries: [{ query: ME_QUERY }],
  });
  if (error) {
    throw error;
  }

  return <a onClick={() => signOut()}>Sign Out</a>;
};
