import { useState } from 'react';
import { useGet } from '../utils/hooks/useGet';
import { Seller } from '../utils/types/Seller';
import Loading from '../components/Loading';
import SellerModal from '../components/seller/SellerModal';
import { Subscription } from '../utils/types/Subscription';
import ChoiceSubscription from '../components/subscription/ChoiceSubscription';

const SellerProfile = () => {
  const [seller, isPending, , setSeller] = useGet<Seller>('/sellers/profile');
  const [showModal, setShowModal] = useState(false);
  const [subscription, setSubscription] = useState<Subscription>({
    title: '',
    description: '',
    min_product: -1,
    max_product: -1,
    price: -1,
  });

  return (
    <>
      {isPending && Loading}
      {seller && (
        <>
          <div className="columns">
            <div className="column is-2"></div>
            <div className="column">
              <div className="box">
                <h3 className="title is-3">Informations du compte</h3>
                <p>Nom du magasin : {seller.store}</p>
                <p>Nom : {seller.lastname}</p>
                <p>Prénom : {seller.firstname}</p>
                <p>Description : {seller.description}</p>
                <p>
                  Adresse du magasin : {seller.address}, {seller.zipcode}{' '}
                  {seller.city}
                </p>
                <button
                    className="button is-info"
                    onClick={() => setShowModal(true)}
                >
                  Modifier mes informations
                </button>
                <SellerModal
                    show={showModal}
                    seller={seller}
                    setSeller={setSeller}
                    onHide={() => setShowModal(false)}
                ></SellerModal>
              </div>
              <div className="box">
                <button className="button is-black">Modifier mes produits</button>
              </div>
              <ChoiceSubscription
                  subscription={subscription}
                  setSubscription={setSubscription}
              ></ChoiceSubscription>
            </div>
            <div className="column is-2"></div>
          </div>

        </>
      )}
    </>
  );
};

export default SellerProfile;
