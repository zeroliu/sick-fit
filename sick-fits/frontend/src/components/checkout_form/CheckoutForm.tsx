import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  StyledCheckoutForm,
  Container,
  PayButton,
  Header,
  ItemImg,
  CloseButton,
  Details,
} from './checkout_form_styles';
import { countItems, calcTotalPrice } from 'src/lib/cart';
import { formatMoney } from 'src/lib/format_money';
import { checkoutStartedSelector, checkoutCancelled } from 'src/model/checkout';
import { useMeQuery } from 'src/queries/user';

export const CheckoutForm: React.FC = () => {
  const { data, loading } = useMeQuery();
  const started = useSelector(checkoutStartedSelector);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  if (!started || loading) {
    return null;
  }
  if (!data?.me) {
    alert('You must be signed in');
    return null;
  }
  const { email, cartItems } = data.me;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });
    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }
  };

  const getPreviewImg = () => {
    if (!cartItems.length) {
      return;
    }
    return cartItems[0].item.image;
  };

  const closeCheckout = () => {
    dispatch(checkoutCancelled());
  };

  return (
    <Container>
      <StyledCheckoutForm onSubmit={handleSubmit}>
        <Header>
          <ItemImg src={getPreviewImg() || 'no_img.jpg'} />
          <CloseButton className='flaticon-close' onClick={closeCheckout} />
          <Details>
            <div className='description'>
              Order of {countItems(cartItems)} items
            </div>
            <div className='email'>{email}</div>
          </Details>
        </Header>
        <CardElement className='cardElement' />
        <PayButton type='submit' disabled={!stripe}>
          Pay {formatMoney(calcTotalPrice(cartItems))}
        </PayButton>
      </StyledCheckoutForm>
    </Container>
  );
};
