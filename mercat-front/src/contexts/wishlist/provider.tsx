import { useContext, useEffect, useReducer } from 'react';
import { createContext } from 'react';
import { FC } from 'react';
import { Product } from '../../utils/types/Product';
import { UserContext } from '../user/types';
import { WishListActionType } from '../../utils/types/wishList.types';
import { wishListReducer } from './reducers';
import { useGet } from '../../utils/hooks/useGet';

interface WishListCtxType {
  wishList: string[];
  addItem: (p: Product) => void;
  removeItem: (p: Product) => void;
}

export const WishListContext = createContext<WishListCtxType>({
  wishList: [],
  addItem: (p) => {},
  removeItem: (p) => {},
});

export const WishListProvider: FC = ({ children }) => {
  const { user } = useContext(UserContext);
  const [favorites, isPending] = useGet<Product[]>(
    `clients/${user!.sub}/favorites`,
  );
  const [wishList, dispatch] = useReducer(wishListReducer, []);

  useEffect(() => {
    if (!isPending && favorites) {
      favorites.forEach((favorite) =>
        dispatch({ type: WishListActionType.ADD, product: favorite }),
      );
    }
  }, [isPending, favorites]);
  return (
    <WishListContext.Provider
      value={{
        wishList: wishList,
        addItem: (p) => dispatch({ type: WishListActionType.ADD, product: p }),
        removeItem: (p) =>
          dispatch({ type: WishListActionType.REMOVE, product: p }),
      }}
    >
      {children}
    </WishListContext.Provider>
  );
};
