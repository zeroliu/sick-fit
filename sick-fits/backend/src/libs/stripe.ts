import Stripe from 'stripe';

let stripe: Stripe;

export function getStripe() {
  if (!process.env.STRIPE_SECRET) {
    throw new Error('Stripe secret is not provided');
  }
  if (!stripe) {
    stripe = new Stripe(process.env.STRIPE_SECRET, {
      apiVersion: '2020-03-02',
    });
  }
  return stripe;
}
