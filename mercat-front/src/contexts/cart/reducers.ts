import {
  CartAction,
  CartActionType,
  CartItemType,
} from '../../utils/types/cart.types';
import { Product } from '../../utils/types/Product';

const addItemToCart = (
  product: Product,
  amount: number,
  cart: CartItemType[],
) => {
  let newCart = [...cart];
  const productIndex = newCart.findIndex(
    (item) => item.product._id === product._id,
  );
  if (productIndex < 0) {
    if (product.quantity < amount) {
      newCart.push({ product: product, amount: product.quantity });
    } else {
      newCart.push({ product: product, amount });
    }
  } else {
    const updatedItem = {
      ...newCart[productIndex],
    };
    updatedItem.amount += amount;
    if (updatedItem.amount > product.quantity) {
      updatedItem.amount = product.quantity;
    }
    newCart[productIndex] = updatedItem;
  }
  localStorage.setItem('shopping_cart', JSON.stringify(newCart));
  return newCart;
};

const removeItemFromCart = (
  productId: string,
  amount: number,
  cart: CartItemType[],
) => {
  let newCart = [...cart];
  const productIndex = newCart.findIndex(
    (item) => item.product._id === productId,
  );
  if (productIndex !== -1) {
    if (newCart[productIndex].amount > amount) {
      const updatedItem = {
        ...newCart[productIndex],
      };
      updatedItem.amount -= amount;
      newCart[productIndex] = updatedItem;
    } else {
      newCart.splice(productIndex, 1);
    }

    localStorage.setItem('shopping_cart', JSON.stringify(newCart));
  }
  return newCart;
};

const removeAllItemsFromCart = (productId: string, cart: CartItemType[]) => {
  let newCart = [...cart];
  const productIndex = newCart.findIndex(
    (item) => item.product._id === productId,
  );
  if (productIndex !== -1) {
    newCart.splice(productIndex, 1);

    localStorage.setItem('shopping_cart', JSON.stringify(newCart));
  }
  return newCart;
};

export const cartReducer = (prevState: CartItemType[], action: CartAction) => {
  switch (action.type) {
    case CartActionType.ADD:
      return addItemToCart(action.product!, action.amount!, prevState);
    case CartActionType.REMOVE:
      return removeItemFromCart(
        action.product!._id!,
        action.amount!,
        prevState,
      );
    case CartActionType.REMOVE_ALL:
      return removeAllItemsFromCart(action.product!._id!, prevState);
    case CartActionType.OVERWRITE_CART:
      return action.newCart!;
    default:
      return prevState;
  }
};
