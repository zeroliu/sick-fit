import { CartItem } from 'src/queries/user';

export function calcTotalPrice(cartItems: CartItem[]) {
  return cartItems.reduce((tally, cartItem) => {
    if (!cartItem.item) return tally;
    return tally + cartItem.quantity * cartItem.item.price;
  }, 0);
}

export function countItems(cartItems: CartItem[]) {
  return cartItems.reduce((tally, cartItem) => {
    if (!cartItem.item) return tally;
    return tally + cartItem.quantity;
  }, 0);
}
