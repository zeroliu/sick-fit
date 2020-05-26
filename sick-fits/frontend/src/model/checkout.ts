import { AppState } from './store';
import { InferActionType, createAction } from './utils';

const CHECKOUT_STARTED = 'CHECKOUT_STARTED';
export function checkoutStarted() {
  return createAction({ type: CHECKOUT_STARTED });
}

const CHECKOUT_CANCELLED = 'CHECKOUT_CANCELLED';
export function checkoutCancelled() {
  return createAction({ type: CHECKOUT_CANCELLED });
}

export const checkoutActions = {
  checkoutStarted,
  checkoutCancelled,
};
export type CheckoutAction = InferActionType<typeof checkoutActions>;

export interface CheckoutState {
  started: boolean;
  token: string;
}
const initState: CheckoutState = {
  started: false,
  token: '',
};

export function checkoutReducer(
  state: CheckoutState = initState,
  action: CheckoutAction,
): CheckoutState {
  switch (action.type) {
    case CHECKOUT_STARTED:
      return {
        started: true,
        token: '',
      };
    case CHECKOUT_CANCELLED:
      return {
        started: false,
        token: '',
      };
  }
  return state;
}

export function checkoutStartedSelector(state: AppState) {
  return state.checkout.started;
}
