import { FC } from 'react';
import { SoldProduct } from '../../utils/types/Order';
import { CollectType } from '../../utils/types/Product';

const SoldProductRow: FC<{
  soldProduct: SoldProduct;
  sellerMode: boolean;
  changeProductStatus?: (id: string, newStatus: string) => void;
}> = ({ soldProduct, sellerMode, changeProductStatus }) => {
  const getStatus = () => {
    switch (soldProduct.status) {
      case 'not retrieved':
        return 'A récupérer';
      case 'retrieved':
        return 'Vous avez récupéré ce produit';
      case 'waiting for delivery':
        return 'En attente de livraison';
      case 'sent':
        return 'Envoyé';
      case 'delivered':
        return 'Ce produit a été livré';
    }
  };

  const switchStatus = (newStatus: string) => {
    if (changeProductStatus) {
      changeProductStatus(soldProduct._id!, newStatus);
    }
  };

  return (
    <div className="columns">
      <div className="column is-one-third">
        <img
          src={soldProduct.images[0]}
          alt={`soldProduct-${soldProduct._id}`}
          width="180"
          height="180"
        />
      </div>
      <div className="column is-two-third">
        <p>{soldProduct.name}</p>
        <div className="columns">
          <div className="column">
            <p>Quantité commandée: {soldProduct.amount}</p>
            <p>Prix: {soldProduct.amount * soldProduct.price}€</p>
          </div>
          <div className="column">
            <p>Prix unitaire: {soldProduct.price}€</p>
            <p>
              Mode d'achat:{' '}
              {soldProduct.collectType === CollectType.CLICKANDCOLLECT
                ? 'Click and Collect'
                : 'Livraison'}
            </p>
          </div>
        </div>
        {!sellerMode && <p>Statut : {getStatus()}</p>}
        {sellerMode &&
          (soldProduct.collectType === CollectType.CLICKANDCOLLECT ? (
            soldProduct.status === 'not retrieved' ? (
              <button
                className="button is-warning"
                onClick={() => switchStatus('retrieved')}
              >
                En attente du client
              </button>
            ) : (
              <button
                className="button is-primary"
                onClick={() => switchStatus('not retrieved')}
              >
                Récupéré
              </button>
            )
          ) : soldProduct.status === 'waiting for delivery' ? (
            <button
              className="button is-danger"
              onClick={() => switchStatus('sent')}
            >
              Livraison en attente
            </button>
          ) : soldProduct.status === 'sent' ? (
            <button
              className="button is-warning"
              onClick={() => switchStatus('delivered')}
            >
              Colis expédié
            </button>
          ) : (
            <button
              className="button is-primary"
              onClick={() => switchStatus('waiting for delivery')}
            >
              Colis reçu
            </button>
          ))}
      </div>
    </div>
  );
};

export default SoldProductRow;
