import { useContext, useState } from 'react';
import { FC } from 'react';
import { CartContext } from '../contexts/cart/provider';
import { getNumberOfProducts, getTotal } from '../utils/cartFunctions';
import { GrAdd, GrSubtractCircle, TiDeleteOutline } from 'react-icons/all';
import { CollectType, Product } from '../utils/types/Product';
import { useAxios } from '../utils/hooks/useAxios';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../contexts/user/types';
import { CartItemType } from '../utils/types/cart.types';

const CartPage: FC = () => {
  const axios = useAxios();
  const history = useHistory();
  const { loggedIn } = useContext(UserContext);
  const { cart, addItem, removeFromItem, removeItem, setCart } =
    useContext(CartContext);
  const [error, setError] = useState<string | null>(null);

  const refreshCart = async () => {
    const cartItems = await axios.post<Product[]>('/products/cart', {
      productIds: cart.map((i) => i.product._id!),
    });

    if (cartItems.data) {
      const newCartItems: CartItemType[] = [];
      cartItems.data.forEach((item: Product, index) => {
        if (cart[index].amount > item.quantity) {
          removeFromItem(item, cart[index].amount - item.quantity);
        }
        if (item.quantity !== 0) {
          newCartItems.push({
            product: item,
            amount: cart[index].amount,
          });
        }
      });
      setCart(newCartItems);
    }
  };

  //onComponentLoad check whether or not there is sufficient items to provide this cart
  useEffect(() => {
    refreshCart();
  }, []);

  const handleOrder = () => {
    loggedIn ? history.push('/commander') : history.push('/connexion');
  };

  return (
    <div className="columns">
      <div className="column is-2"></div>
      <div className="column">
        <table className="table">
          {error && (
              <div className="notification is-warning">
                <button className="delete" onClick={() => setError(null)}></button>
                {error}
              </div>
          )}
          <thead>
          <th></th>
          <th>Produit</th>
          <th>Prix</th>
          <th>Quantité</th>
          <th>Type de collecte</th>
          <th>Vendeur</th>
          <th>Coût</th>
          </thead>
          {cart && (
              <tfoot>
              <th>Total</th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th>{getNumberOfProducts(cart)}</th>
              <th>{getTotal(cart)}€</th>
              </tfoot>
          )}
          <tbody>
          {cart &&
          cart.map(({ product, amount }, index) => (
              <tr>
                <th>
                  <img
                      width="180"
                      height="180"
                      src={product.images[0]}
                      alt={`panier-${index}`}
                  />
                </th>
                <th>
                  <a href={`/produits/${product._id}`}>{product.name}</a>
                </th>
                <th>{product.price}€</th>
                <th>
                  <p>{amount}</p>
                  <button onClick={() => removeFromItem(product, 1)}>
                    <GrSubtractCircle />
                  </button>
                  <button onClick={() => addItem(product, 1)}>
                    <GrAdd />
                  </button>
                  <button onClick={() => removeItem(product)}>
                    <TiDeleteOutline />
                  </button>
                </th>
                <th>
                  {product.collectType === CollectType.DELIVERY
                      ? 'Livraison'
                      : 'Click&Collect'}
                </th>
                <th>{product.seller.store}</th>
                <th>
                  <strong>{amount * product.price}€</strong>
                </th>
              </tr>
          ))}
          </tbody>
        </table>
        {cart.length !== 0 && (
            <button
                className="button is-success is-large is-outlined"
                onClick={handleOrder}
            >
              Commander
            </button>
        )}
      </div>
      <div className="column is-2"></div>


    </div>
  );
};

export default CartPage;
