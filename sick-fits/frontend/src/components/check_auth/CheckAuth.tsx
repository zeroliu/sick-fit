import React from 'react';

import { useMeQuery } from 'src/queries/user';
import { SignIn } from 'src/components/sign_in/SignIn';

export const CheckAuth: React.FC = ({ children }) => {
  const { data, loading } = useMeQuery();
  if (loading) {
    return <p>Loading...</p>;
  }
  if (!data?.me) {
    return (
      <div>
        <p>Please sign in</p>
        <SignIn></SignIn>
      </div>
    );
  }
  return <div>{children}</div>;
};
