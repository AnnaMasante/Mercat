import { useContext } from 'react';
import { FC } from 'react';
import Loading from '../components/Loading';
import OrderRow from '../components/orders/OrderRow';
import { UserContext } from '../contexts/user/types';
import { useGet } from '../utils/hooks/useGet';
import { Order } from '../utils/types/Order';

const CustomerOrdersPage: FC = () => {
  const { user } = useContext(UserContext);
  const [orders, isPending] = useGet<Order[]>(`/orders/clients/${user?.sub}`);

  return (
    <div>
      <p className="title">Mes commandes</p>
      {isPending && <Loading />}
      {orders &&
        (orders.length === 0
          ? 'Pas de commandes'
          : orders.map((order) => {
              return <OrderRow data={order} sellerMode={false} />;
            }))}
    </div>
  );
};

export default CustomerOrdersPage;
