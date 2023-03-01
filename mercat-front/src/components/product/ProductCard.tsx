import { useContext } from 'react';
import { FC } from 'react';
import { CartContext } from '../../contexts/cart/provider';
import { Product } from '../../utils/types/Product';
import { MdAddShoppingCart } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Favorites from '../favorite/Favorites';
import { CUSTOMER, UserContext } from '../../contexts/user/types';
import '../../css/productCard.css'


const ProductCard: FC<{ product: Product }> = ({ product }) => {
  const { loggedIn, user } = useContext(UserContext);

  const { addItem: addProduct } = useContext(CartContext);

  return (
    <div key={product._id} className="card">
      <div className="card-image">
        <figure className="image is-center ">
          <img id="picture" src={product.images[0]} alt={`product-${product._id}`} />
          <a className="button is-normal is-rounded"
             id="button-bottom-right"
             href=""
             onClick={(e) => {
               addProduct(product, 1);
             }}
          >

              <MdAddShoppingCart />

          </a>
          {loggedIn && user!.role === CUSTOMER &&
          <a className="button is-normal is-rounded"
             id="button-top-right"
             href=""
          ><Favorites product={product} /></a>
          }
        </figure>
      </div>
      <div className="card-content">
        <div className="media-content">
          <p className="title is-4">{product.name}</p>
        </div>
        <p className="subtitle is-6">Prix : {product.price}€</p>
        {product.quantity === 0 ? (
          <p className="subtitle is-6">
            <strong>Rupture</strong>
          </p>
        ) : <p className="subtitle is-6">
          Disponible
        </p>}
        <p className="subtitle is-6">
          {product.seller && product.seller.store && (
            <a
              href={`/magasins/${product.seller.id}`}
            >{`Magasin: ${product.seller.store}`}</a>
          )}
          <br />
          {/*product.seller &&
            product.seller.description &&
            `${product.seller.description}`*/}
        </p>

        <button className="button is-black is-centered">
          <Link id="link" to={`/produits/${product._id}`}>Détails du produit</Link>
        </button>

      </div>
    </div>
  );
};
export default ProductCard;
