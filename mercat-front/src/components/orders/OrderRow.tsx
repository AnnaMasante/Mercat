import { FC, useState } from 'react';
import { useAxios } from '../../utils/hooks/useAxios';
import { useGet } from '../../utils/hooks/useGet';
import { Order } from '../../utils/types/Order';
import { Seller } from '../../utils/types/Seller';
import SoldProductRow from '../product/SoldProductRow';
import SellerCartProducts from './SellerCartProducts';

const OrderRow: FC<{ data: Order; sellerMode: boolean }> = ({
  data,
  sellerMode,
}) => {
  const [seller] = useGet<Seller>(`/sellers/${data.sellerId}`);
  const axios = useAxios();
  const [order, setOrder] = useState<Order>(data);

  const changeProductStatus = (idProduct: string, newStatus: string) => {
    const prevOrder = order;
    setOrder((prevState) => {
      return {
        ...prevState,
        products: prevState.products.map((soldProduct) => {
          if (soldProduct._id === idProduct) {
            return { ...soldProduct, status: newStatus };
          }
          return soldProduct;
        }),
      };
    });
    axios
      .patch(`/orders/${order._id}`, {
        products: prevOrder.products.map((soldProduct) => {
          if (soldProduct._id === idProduct) {
            return { ...soldProduct, status: newStatus };
          }
          return soldProduct;
        }),
      })
      .catch(() => setOrder(prevOrder));
  };

  return (
    <div className="box">
      {!sellerMode && (
        <>
          <p>Vendeur: {!seller ? '...' : seller.store}</p>
          <p>Prix total : {order.price}€</p>
        </>
      )}
      <div>
        Addresse de facturation/livraison:
        <div className="columns">
          <div className="column is-one-third">
            <div className="box">
              {order.deliveryAddress.firstname} &nbsp;{' '}
              {order.deliveryAddress.lastname}, {order.deliveryAddress.street},{' '}
              {order.deliveryAddress.zipcode} &nbsp;{' '}
              {order.deliveryAddress.city}, {order.deliveryAddress.country}
            </div>
          </div>
        </div>
      </div>
      <p>
        Produits :{' '}
        {order.products &&
          order.products.map((soldProduct) => {
            return (
              <SoldProductRow
                soldProduct={soldProduct}
                sellerMode={sellerMode}
                changeProductStatus={changeProductStatus}
              />
            );
          })}
      </p>
    </div>
  );
};

export default OrderRow;
