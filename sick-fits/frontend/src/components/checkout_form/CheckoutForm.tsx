import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { StripeError } from '@stripe/stripe-js';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  StyledCheckoutForm,
  Container,
  PayButton,
  Header,
  ItemImg,
  CloseButton,
  Details,
  Spinner,
} from './checkout_form_styles';
import { countItems, calcTotalPrice } from 'src/lib/cart';
import { formatMoney } from 'src/lib/format_money';
import { checkoutStartedSelector, checkoutCancelled } from 'src/model/checkout';
import { usePayMutation } from 'src/queries/pay';
import { useMeQuery } from 'src/queries/user';

export const CheckoutForm: React.FC = () => {
  const { data, loading } = useMeQuery();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<StripeError | Error | null>(null);
  const started = useSelector(checkoutStartedSelector);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const [pay] = usePayMutation();
  if (!started || loading) {
    return null;
  }
  if (error) {
    alert(error.message);
    setProcessing(false);
    setError(null);
  }
  if (!data?.me) {
    setError(new Error('You must be signed in'));
    return null;
  }
  const { email, cartItems, name } = data.me;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
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
      billing_details: {
        name,
      },
    });
    if (error) {
      setError(error);
      return;
    }
    if (!paymentMethod) {
      setError(new Error('Failed to create the payment id'));
      return;
    }
    try {
      await pay({ variables: { data: { paymentMethodId: paymentMethod.id } } });
    } catch (e) {
      setError(e);
    }
    setProcessing(false);
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
        <PayButton type='submit' disabled={!stripe || processing}>
          {processing ? (
            <Spinner />
          ) : (
            `Pay ${formatMoney(calcTotalPrice(cartItems))}`
          )}
        </PayButton>
      </StyledCheckoutForm>
    </Container>
  );
};
