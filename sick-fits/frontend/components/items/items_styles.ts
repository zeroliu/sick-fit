import styled from 'styled-components';

export const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
`;
