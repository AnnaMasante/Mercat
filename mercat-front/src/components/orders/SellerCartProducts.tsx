import { FC } from 'react';
import { getTotal } from '../../utils/cartFunctions';
import { CartItemType } from '../../utils/types/cart.types';
import { CollectType } from '../../utils/types/Product';
import OrderCartItem from './OrderCartItem';

const SellerCartProducts: FC<{ cartItems: CartItemType[] }> = ({
  cartItems,
}) => {
  const seller = cartItems[0].product.seller;

  const sortCartItemPerCollectType = () => {
    const sortedCartItemsPerCollectType: CartItemType[][] = [[], []];
    cartItems.map((item) => {
      if (item.product.collectType === CollectType.DELIVERY) {
        sortedCartItemsPerCollectType[0].push(item);
      } else {
        sortedCartItemsPerCollectType[1].push(item);
      }
    });
    return sortedCartItemsPerCollectType;
  };

  const sortedCartItems = sortCartItemPerCollectType();

  return (
    <div className="card mb-5">
      <header className="card-header">
        <p className="card-header-title subtitle is-5">{seller.store}</p>
      </header>
      <div className="card-content">
        {sortedCartItems[0] && sortedCartItems[0].length > 0 && (
          <>
            <p className="subtitle is-6">Livraison</p>
            {sortedCartItems[0].map(({ product, amount }) => (
              <OrderCartItem product={product} amount={amount} />
            ))}
          </>
        )}
        {sortedCartItems[1] && sortedCartItems[1].length > 0 && (
          <>
            <p className="subtitle is-6">Click And Collect</p>

            <p className="subtitle is-6">
              Ville : {seller.city} ({seller.zipcode}) <br />
              Adresse : {seller.address}
            </p>
            {sortedCartItems[1].map(({ product, amount }) => (
              <OrderCartItem product={product} amount={amount} />
            ))}
          </>
        )}
      </div>
      <div className="card-footer">
        <p className="subtitle is-6">
          Prix total vendeur : {getTotal(cartItems)}€
        </p>
      </div>
    </div>
  );
};

export default SellerCartProducts;
