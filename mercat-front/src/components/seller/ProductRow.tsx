import { FC, useState } from 'react';
import { GrAdd, GrSubtractCircle } from 'react-icons/gr';
import { formattedDate } from '../../utils/dateFunctions';
import { useAxios } from '../../utils/hooks/useAxios';
import { Product } from '../../utils/types/Product';
import DeleteValidationModal from './DeleteValidationModal';

const ProductRow: FC<{
  obj: Product;
  deleteObj: () => void;
  setError: (err: string) => void;
}> = ({ obj, deleteObj, setError }) => {
  const axios = useAxios();
  const [product, setProduct] = useState<Product>(obj);
  const [showModal, setShowModal] = useState<boolean>(false);

  const addOne = () => {
    setProduct((p) => {
      return {
        ...p,
        quantity: p.quantity + 1,
      };
    });
    axios
      .patch(`/products/${product._id}`, { quantity: product.quantity + 1 })
      .catch(() => {
        setError('Erreur durant la modification des quantités');
        setProduct((p) => {
          return {
            ...p,
            quantity: p.quantity - 1,
          };
        });
      });
  };

  const removeOne = () => {
    setProduct((p) => {
      return {
        ...p,
        quantity: p.quantity - 1,
      };
    });
    axios
      .patch(`/products/${product._id}`, { quantity: product.quantity - 1 })
      .catch(() => {
        setError('Erreur durant la modification des quantités');
        setProduct((p) => {
          return {
            ...p,
            quantity: p.quantity + 1,
          };
        });
      });
  };

  const onDelete = () => {
    axios
      .delete(`/products/${product._id}`)
      .then(deleteObj)
      .catch(() => setError('Erreur durant la suppression'));
  };

  return (
    <div className="box">
      <div className="columns">
        <div className="column">
          <img src={product.images[0]} alt={`product-${product._id}`} />
        </div>
        <div className="column is-two-thirds">
          <p>{product.name}</p>
          <p>{product.price}€</p>
          <p>
            Quantité restante: {product.quantity}{' '}
            <button onClick={removeOne}>
              <GrSubtractCircle />
            </button>
            <button onClick={addOne}>
              <GrAdd />
            </button>
          </p>
          <p>Quantité vendue: 0</p>
          <p>
            Date de mise en ligne:{' '}
            {formattedDate(new Date(product.created_at!))}
          </p>
        </div>
        <div className="column">
          <a
            className="mb-1 button is-rounded"
            id="orange-button"
            href={`/produits/${product._id}`}
          >
            Aperçu
          </a>
          <br />
          <a
            className="mb-1 button is-rounded"
            id="orange-button"
            href={`/produits/${product._id}/modifier`}
          >
            Modifier
          </a>
          <br />
          <a
            className="button is-rounded"
            id="orange-button"
            onClick={() => setShowModal(true)}
          >
            Supprimer
          </a>
          <DeleteValidationModal
            isOpen={showModal}
            close={() => setShowModal(false)}
            onSuccess={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductRow;
