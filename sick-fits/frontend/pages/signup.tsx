import { SignUp } from 'src/components/sign_up/SignUp';
import styled from 'styled-components';
import { SignIn } from 'src/components/sign_in/SignIn';

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

export default function SignUpPage() {
  return (
    <Columns>
      <SignUp></SignUp>
      <SignIn></SignIn>
    </Columns>
  );
}
