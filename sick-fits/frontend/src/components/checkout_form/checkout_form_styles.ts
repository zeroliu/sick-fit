import styled from 'styled-components';

export const Container = styled.form`
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Header = styled.div`
  border-radius: 4px 4px 0 0;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.lightGrey};
  position: relative;
  align-items: center;
  box-shadow: ${(props) => props.theme.bs};
`;

export const ItemImg = styled.img`
  width: 50px;
  border-radius: 50%;
  margin-top: -25px;
  height: 50px;
  border: 2px white solid;
  box-shadow: ${(props) => props.theme.bs};
`;

export const CloseButton = styled.div`
  position: absolute;
  right: 5px;
  top: 5px;
`;
export const Details = styled.div`
  color: rgba(0, 0, 0, 0.7);
  text-align: center;
  font-size: 12px;
  padding: 5px;
`;

export const StyledCheckoutForm = styled.div`
  width: 30vw;
  min-width: 300px;
  box-shadow: ${(props) => props.theme.bs};
  display: flex;
  flex-direction: column;

  .cardElement {
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    max-height: 44px;
    width: 100%;
    background: white;
    box-sizing: border-box;
  }
`;

export const PayButton = styled.button`
  border: none;
  color: white;
  background: rgb(84, 105, 212);
  margin: 0;
  height: 40px;
  border-radius: 0 0 4px 4px;
`;
