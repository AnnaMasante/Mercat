import { FC, useContext, useEffect, useState } from 'react';
import { Product } from '../../utils/types/Product';
import { BsHeart, BsHeartFill } from 'react-icons/all';
import { useAxios } from '../../utils/hooks/useAxios';
import { AxiosError } from 'axios';
import { UserContext } from '../../contexts/user/types';
import { WishListContext } from '../../contexts/wishlist/provider';
import { isInWishList } from '../../utils/wishListFunctions';

const Favorites: FC<{ product: Product }> = ({ product }) => {
  const { wishList, addItem, removeItem } = useContext(WishListContext);
  const [inFavorites, setInFavorites] = useState<boolean>(
    isInWishList(product, wishList),
  );
  const axios = useAxios();
  const { user } = useContext(UserContext);

  useEffect(() => {
    setInFavorites(isInWishList(product, wishList));
  }, [wishList, product]);

  const switchState = () => {
    if (inFavorites) {
      setInFavorites(false);
      axios
        .put(
          '/clients/' + user!.sub + '/' + product._id + '/removefavorites',
          product,
        )
        .then(() => {
          removeItem(product);
        })
        .catch((err: AxiosError) => {
          setInFavorites(true);
        });
    } else {
      setInFavorites(true);
      axios
        .put(
          '/clients/' + user!.sub + '/' + product._id + '/favorites',
          product,
        )
        .then(() => {
          addItem(product);
        })
        .catch((err: AxiosError) => {
          setInFavorites(false);
        });
    }
  };

  return (
    <>
      <span className="icon">
        {inFavorites ? (
          <BsHeartFill onClick={switchState} />
        ) : (
          <BsHeart onClick={switchState} />
        )}
      </span>
    </>
  );
};
export default Favorites;
