import React from 'react';

import { SignIn } from 'src/components/sign_in/SignIn';
import { useMeQuery } from 'src/queries/user';

export const CheckAuth: React.FC = ({ children }) => {
  const { data, loading } = useMeQuery();
  if (loading) {
    return <p>Loading...</p>;
  }
  if (!data?.me) {
    return (
      <div>
        <p>Please sign in</p>
        <SignIn />
      </div>
    );
  }
  return <div>{children}</div>;
};
