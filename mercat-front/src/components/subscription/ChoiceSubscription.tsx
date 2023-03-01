import { useGet } from '../../utils/hooks/useGet';
import { Subscription } from '../../utils/types/Subscription';
import SubscriptionBox from './SubscriptionBox';
import Loading from '../Loading';
import { FC } from 'react';

const ChoiceSubscription: FC<{
  subscription: Subscription | null;
  setSubscription: (subscription: Subscription) => void;
}> = ({ subscription, setSubscription }) => {
  const [subscriptions, isPending] = useGet<Subscription[]>(`subscriptions`);

  console.log(subscriptions);
  return (
    <>
      {isPending && Loading}
      {subscriptions && (
        <div className="columns">
          {subscriptions.map((subscription) => {
            return (
              <SubscriptionBox
                subscription={subscription}
                setSubscription={setSubscription}
              />
            );
          })}
        </div>
      )}
    </>
  );
};
export default ChoiceSubscription;
