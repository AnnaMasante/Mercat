import { FC, useContext } from 'react';
import Loading from '../components/Loading';
import OrderRow from '../components/orders/OrderRow';
import { UserContext } from '../contexts/user/types';
import { useGet } from '../utils/hooks/useGet';
import { Order } from '../utils/types/Order';

const SellerSalesPage: FC = () => {
  const { user } = useContext(UserContext);
  const [orders, isPending] = useGet<Order[]>(`/orders/sellers/${user?.sub}`);

  return (
    <div>
      <p className="title">Mes ventes</p>
      {isPending && <Loading />}
      {orders &&
        (orders.length === 0
          ? 'Pas de ventes'
          : orders.map((order) => {
              return <OrderRow data={order} sellerMode={true} />;
            }))}
    </div>
  );
};

export default SellerSalesPage;
