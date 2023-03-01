import { Product } from './Product';

export interface CartItemType {
  product: Product;
  amount: number;
}

export interface CartAction {
  product?: Product;
  type: CartActionType;
  amount?: number;
  newCart?: CartItemType[];
}

export enum CartActionType {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
  REMOVE_ALL = 'REMOVE_ALL',
  OVERWRITE_CART = 'OVERWRITE_CART',
}
