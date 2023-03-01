import { useReducer } from 'react';
import { createContext } from 'react';
import { FC } from 'react';
import { CartActionType, CartItemType } from '../../utils/types/cart.types';
import { Product } from '../../utils/types/Product';
import { cartReducer } from './reducers';

interface CartCtxType {
  cart: CartItemType[];
  addItem: (p: Product, amount: number) => void;
  removeFromItem: (p: Product, amount: number) => void;
  removeItem: (p: Product) => void;
  setCart: (c: CartItemType[]) => void;
}

export const CartContext = createContext<CartCtxType>({
  cart: [],
  addItem: (p, a) => {},
  removeFromItem: (p, a) => {},
  removeItem: (p) => {},
  setCart: (c) => {},
});

const getCartFromLocalStorage = () => {
  const stringifiedCart = localStorage.getItem('shopping_cart');
  if (stringifiedCart) {
    try {
      const cart: CartItemType[] = JSON.parse(stringifiedCart);
      return cart;
    } catch {
      return [];
    }
  }
  return [];
};

export const CartProvider: FC = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, getCartFromLocalStorage());

  return (
    <CartContext.Provider
      value={{
        cart: cart,
        addItem: (p, amount) =>
          dispatch({ type: CartActionType.ADD, product: p, amount }),
        removeFromItem: (p, amount) =>
          dispatch({ type: CartActionType.REMOVE, product: p, amount }),
        removeItem: (p) =>
          dispatch({ type: CartActionType.REMOVE_ALL, product: p }),
        setCart: (c) =>
          dispatch({ type: CartActionType.OVERWRITE_CART, newCart: c }),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
