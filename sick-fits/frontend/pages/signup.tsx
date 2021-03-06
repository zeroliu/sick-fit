import React from 'react';
import styled from 'styled-components';

import { RequestReset } from 'src/components/request_reset/RequestReset';
import { SignIn } from 'src/components/sign_in/SignIn';
import { SignUp } from 'src/components/sign_up/SignUp';

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

export default function SignUpPage() {
  return (
    <Columns>
      <SignUp />
      <SignIn />
      <RequestReset />
    </Columns>
  );
}
