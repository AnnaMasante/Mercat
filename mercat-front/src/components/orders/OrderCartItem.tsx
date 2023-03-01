import { FC } from 'react';
import { Product } from '../../utils/types/Product';

const OrderCartItem: FC<{ product: Product; amount: number }> = ({
  product,
  amount,
}) => {
  return (
    <div className="box">
      <div className="columns">
        <div className="column">
          <img
            width="180"
            height="180"
            src={product.images[0]}
            alt={`product-${product._id}`}
          />
        </div>
        <div className="column is-two-thirds">
          <p>{product.name}</p>
          <p>Prix unitaire {product.price}€</p>
          <p>Quantité à commander: {amount}</p>
          <p>Prix total : {product.price * amount}€</p>
        </div>
      </div>
    </div>
  );
};

export default OrderCartItem;
