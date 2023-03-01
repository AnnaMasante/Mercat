import { FC, useContext, useState } from 'react';
import { Subscription } from '../../utils/types/Subscription';
import { useAxios } from '../../utils/hooks/useAxios';
import { UserContext } from '../../contexts/user/types';
import { AxiosError } from 'axios';

const SubscriptionBox: FC<{
  subscription: Subscription;
  setSubscription: (subscription: Subscription) => void;
}> = ({ subscription, setSubscription }) => {
  const [isSelected, setIsSelected] = useState(false);
  const axios = useAxios();
  const { user } = useContext(UserContext);

  const submitSubscription = () => {
    setSubscription(subscription);
    axios
      .patch(`sellers/${user!.sub}`, {
        subscription: subscription,
      })
      //TODO : afficher une erreur
      .catch((err: AxiosError) => console.log(err.message));
  };

  return (
    <>
      <div className="column">
        <div
          className="box"
          onClick={() => setIsSelected(true)}
          id={isSelected ? 'bigSubscription' : 'normalSubscription'}
        >
          <h1 className="title is-1 ">{subscription.title}</h1>
          <h1 className="title is-1 ">{subscription.price}€</h1>
          <p>{subscription.description}</p>
          {subscription.min_product === 0 ? (
            <p>Ajouter jusqu'à {subscription.max_product} produits</p>
          ) : (
            <p>
              De {subscription.min_product} à {subscription.max_product}
            </p>
          )}
          <button className="button is-black" onClick={submitSubscription}>
            Commencer
          </button>
        </div>
      </div>
    </>
  );
};
export default SubscriptionBox;
