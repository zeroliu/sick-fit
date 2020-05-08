import { SignUp } from 'src/components/signup/SignUp';
import styled from 'styled-components';

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

export default function SignUpPage() {
  return (
    <Columns>
      <SignUp></SignUp>
      <SignUp></SignUp>
      <SignUp></SignUp>
    </Columns>
  );
}
