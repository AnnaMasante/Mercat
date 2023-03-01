import { CartItemType } from './types/cart.types';

export function getTotal(cart: CartItemType[]) {
  return cart.reduce((count, curItem) => {
    return count + curItem.product.price * curItem.amount;
  }, 0);
}

export function getNumberOfProducts(cart: CartItemType[]) {
  return cart.reduce((count, curItem) => {
    return count + curItem.amount;
  }, 0);
}
