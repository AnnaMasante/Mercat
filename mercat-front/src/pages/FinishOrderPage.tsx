import { useEffect } from 'react';
import { FC, useContext, useState } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BsPen } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import SellerCartProducts from '../components/orders/SellerCartProducts';
import { CartContext } from '../contexts/cart/provider';
import { getTotal } from '../utils/cartFunctions';
import { useAxios } from '../utils/hooks/useAxios';
import { useGet } from '../utils/hooks/useGet';
import { Address } from '../utils/types/Address';
import { CartItemType } from '../utils/types/cart.types';
import { Client } from '../utils/types/Client';

const FinishOrderPage: FC = () => {
  const { cart, setCart } = useContext(CartContext);
  const [user] = useGet<Client>('/clients/profile');
  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const history = useHistory();
  const axios = useAxios();

  const sortCartPerSeller = (cart: CartItemType[]) => {
    let sellerIdArray: string[] = [];
    let sortedCart: CartItemType[][] = [];
    cart.map((item) => {
      const index = sellerIdArray.findIndex(
        (sellerId) => sellerId === item.product.seller.id,
      );
      if (index === -1) {
        sellerIdArray.push(item.product.seller.id);
        sortedCart.push([item]);
      } else {
        sortedCart[index].push(item);
      }
    });
    return sortedCart;
  };

  const getDeliveryFee = (cart: CartItemType[]) => {
    return 0;
  };

  const createOrder = () => {
    axios
      .post('/orders', { items: cart, deliveryAddress: selectedAddress })
      .then(() => {
        setCart([]);
        history.push('/commandes');
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (cart.length === 0) {
      history.push('/');
    }
  }, [cart]);

  return (
    <div>
      <div className="tabs is-centered is-boxed">
        <ul>
          <li
            className={activeTab === 0 ? 'is-active' : ''}
            onClick={() => setActiveTab(0)}
          >
            <a>Récapitulatif</a>
          </li>
          <li
            className={activeTab === 1 ? 'is-active' : ''}
            onClick={() => setActiveTab(1)}
          >
            <a>Coordonnées</a>
          </li>
          <li
            className={activeTab === 2 ? 'is-active' : ''}
            onClick={() => selectedAddress && setActiveTab(2)}
          >
            <a>Paiement</a>
          </li>
        </ul>
      </div>
      <div className="container">
        {activeTab === 0 && (
          <div id="tab-content">
            {sortCartPerSeller(cart).map((sellerProducts) => {
              return <SellerCartProducts cartItems={sellerProducts} />;
            })}
            <p className="subtitle is-5">Sous-total : {getTotal(cart)}€</p>
          </div>
        )}
        {activeTab === 1 && (
          <div id="tab-content">
            <p className="subtitle is-5">
              Choisissez une adresse de facturation/livraison
            </p>
            {user &&
              user.addresses.map((address) => (
                <div className="box">
                  <div className="columns">
                    <div className="column">
                      {address.firstname} &nbsp; {address.lastname},{' '}
                      {address.street}, {address.zipcode} &nbsp; {address.city},{' '}
                      {address.country}
                    </div>
                    <div className="column is-1">
                      <button
                        className={
                          selectedAddress && selectedAddress._id === address._id
                            ? 'button is-success'
                            : 'button is-info'
                        }
                        onClick={() =>
                          selectedAddress && selectedAddress._id === address._id
                            ? setSelectedAddress(null)
                            : setSelectedAddress(address)
                        }
                      >
                        <span className="icon">
                          {!!selectedAddress &&
                          selectedAddress._id === address._id ? (
                            <AiOutlineCheckCircle />
                          ) : (
                            <BsPen />
                          )}
                        </span>
                        <span>
                          {selectedAddress &&
                          selectedAddress._id === address._id
                            ? ''
                            : 'Choisir cette addresse'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
        {activeTab === 2 && (
          <div id="tab-content">
            <p className="subtitle is-5">
              Total : {getTotal(cart) + getDeliveryFee(cart)}€
            </p>
            <div className="box">
              <button onClick={createOrder}>Payer</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinishOrderPage;
