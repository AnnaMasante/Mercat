import '../css/storeDetails.css';
import {
  BsFillStarFill,
  BsStarHalf,
  FaAngleDown,
  GrContact,
  GrFavorite,
} from 'react-icons/all';
import ProductCard from '../components/product/ProductCard';
import { useParams } from 'react-router-dom';
import { useGet } from '../utils/hooks/useGet';
import { Seller } from '../utils/types/Seller';

const StoreDetails = () => {
  const { id: storeId } = useParams<{ id: string }>();
  const [seller, isPending] = useGet<Seller>(`sellers/${storeId}`);
  return (
    <div>
      {isPending && <p>Loading...</p>}
      {seller && (
        <>
          <div className="columns">
            <div className="column">
              <figure className="image is-3by1">
                <img
                  src="https://images.pexels.com/photos/5998091/pexels-photo-5998091.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  height="20"
                  alt="People sunbathing in the pool"
                />
                <a
                  className="button is-normal is-rounded"
                  id="button_above"
                  href=""
                >
                  <GrFavorite></GrFavorite>&nbsp;Ajouter à vos favoris
                </a>
              </figure>
            </div>
          </div>

          {/*Le reste*/}
          {/*Bannière 1 */}
          <div className="columns">
            <div className="column is-2"></div>
            <div className="column">
              <div className="columns">
                <div className="column is-7">
                  <div className="columns">
                    <div className="column is-narrow">
                      <figure className="image is-96x96">
                        <img
                          src="https://bulma.io/images/placeholders/96x96.png"
                          alt="96x96"
                        />
                      </figure>
                    </div>
                    <div className="column">
                      <p> {seller.store} </p>
                      <p id="slogan"> Un slogan </p>
                      <p>
                        {seller.city} ({seller.zipcode})
                      </p>
                      <p>
                        <BsFillStarFill></BsFillStarFill>
                        <BsFillStarFill></BsFillStarFill>
                        <BsFillStarFill></BsFillStarFill>
                        <BsFillStarFill></BsFillStarFill>
                        <BsStarHalf></BsStarHalf>&nbsp;(664 avis)
                      </p>
                    </div>
                  </div>
                </div>
                <div className="column"></div>
                <div className="column is-1">
                  <GrContact></GrContact>Contactez-nous!
                </div>
              </div>
            </div>
            <div className="column is-2"></div>
          </div>

          {/*Bannière 2 : La description */}
          <div className="columns">
            <div className="column is-3"></div>
            <div className="column">
              <p>{seller.description}</p>
            </div>
            <div className="column is-3"></div>
          </div>

          {/*3 : Le bloc */}
          <div className="columns">
            {/*3.1 : Featured items */}
            <div className="column is-2"></div>

            <div className="column">
              <div className="columns">
                {/* Titre et  "sort" */}
                <div className="column is-9">
                  <p className="title is-3">Produits mis en avant</p>
                </div>
                <div className="column">
                  <p>Triés par : </p>
                  <div className="dropdown is-active">
                    <div className="dropdown-trigger">
                      <button className="button">
                        <span>Pertinence</span>
                        <span className="icon is-small">
                          <FaAngleDown></FaAngleDown>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* 2 Grosses images*/}
              <div className="columns">
                {seller.products &&
                  seller.products.map((product, index) => {
                    return (
                      <div className="column is-one-third" key={index}>
                        <ProductCard product={product} />
                      </div>
                    );
                  })}
              </div>
              {/* 3 Plus petites */}
              <div className="columns"></div>
            </div>

            <div className="column is-2"></div>
          </div>
        </>
      )}
    </div>
  );
};
export default StoreDetails;
