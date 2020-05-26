import { InferActionType, createAction } from './utils';
import { AppState } from './store';

const CART_OPENED = 'CART_OPENED';
export function cartOpened() {
  return createAction({ type: CART_OPENED });
}

const CART_CLOSED = 'CART_CLOSED';
export function cartClosed() {
  return createAction({ type: CART_CLOSED });
}

export const cartActions = {
  cartOpened,
  cartClosed,
};
export type CartAction = InferActionType<typeof cartActions>;

export interface CartState {
  open: boolean;
}

const initState: CartState = {
  open: false,
};

export function cartReducer(
  state: CartState = initState,
  action: CartAction,
): CartState {
  switch (action.type) {
    case CART_OPENED:
      return { ...state, open: true };
    case CART_CLOSED:
      return { ...state, open: false };
  }
  return state;
}

export function cartOpenSelector(state: AppState) {
  return state.cart.open;
}
