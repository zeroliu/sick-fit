import styled from 'styled-components';

export const StyledCartItem = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid ${(props) => props.theme.lightGrey};
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  img {
    margin-right: 10px;
  }
  h3,
  p {
    margin: 0;
  }
`;
