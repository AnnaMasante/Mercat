import {
  BsCaretLeft,
  BsCaretRight,
  BsFillStarFill,
  BsStar, BsStarFill, BsStarHalf,
} from 'react-icons/all';
import { CollectType, Product } from '../../utils/types/Product';
import { useParams } from 'react-router-dom';
import CommentList from '../comment/CommentList';
import { useGet } from '../../utils/hooks/useGet';
import Loading from '../Loading';
import {useEffect, useState} from 'react';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart/provider';
import { SELLER, UserContext } from '../../contexts/user/types';
import {Review} from "../../utils/types/Review";

const ProductDetails = () => {
  let { id: idProduct } = useParams<{ id: string }>();
  const [product, isPending] = useGet<Product>(`/products/${idProduct}`);
  const [mainIndex, setMainIndex] = useState<number>(0);
  const { addItem } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const isSeller = !!(user && user.role === SELLER);


  const [reviews, setReviews] = useState<Review[]>([]);

  const [averageGrade, setAverageGrade] = useState<number>(5)

  const setAverage = (reviews : Review[]) => {
    if(reviews.length === 0){
      setAverageGrade(-1)
    }else{
      let sum = 0
      reviews.forEach((review) => {
        sum += review.grade})
      setAverageGrade(sum/reviews.length)
    }
  }
  useEffect(() => {
    if(product !== null){
      if(product.reviews){
        setAverage(reviews)
      }}
  }, [product])
  console.log(product, isPending)
  return (
    <>
      {isPending && <Loading />}
      {product !== null && (
        <>
          <section className="section">
            <div className="columns">
              <div className="column is-2"></div>
              <div className="column  ">
                <div className="columns">
                  <div className="column is-one-fifth">
                    <span
                      className="icon"
                      onClick={() =>
                        setMainIndex((prevInd) => {
                          if (prevInd - 1 < 0) {
                            return product.images.length - 1;
                          }
                          return prevInd - 1;
                        })
                      }
                    >
                      <BsCaretLeft />
                    </span>
                  </div>
                  <div className="column is-three-fifths">
                    <figure className="image">
                      <img src={product.images[mainIndex]} alt="main-product" />
                    </figure>
                  </div>
                  <div className="column is-one-fifth">
                    <span
                      className="icon"
                      onClick={() =>
                        setMainIndex((prevInd) => {
                          if (prevInd + 1 >= product.images.length) {
                            return 0;
                          }
                          return prevInd + 1;
                        })
                      }
                    >
                      <BsCaretRight />
                    </span>
                  </div>
                </div>
                {product.images.length > 1 && (
                  <div className="columns ">
                    {product.images.map((img_p, index) => {
                      if (index !== mainIndex) {
                        return (
                          <div
                            className="column"
                            onClick={() => setMainIndex(index)}
                          >
                            <img
                              width="250"
                              height="250"
                              src={img_p}
                              alt={`product-${index}`}
                            />
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                )}
              </div>
              <div className="column ">
                <div className="columns">
                  <div className="column">
                    <p className="title is-3">{product.name}</p>
                  </div>
                </div>

                <div className="columns">
                  <div className="column">
                    <p className="subtitle is-5">
                      Visiter la boutique :{' '}
                      <a href={`/magasins/${product.seller.id}`}>
                        {product.seller.store}
                      </a>
                    </p>
                    <p className="subtitle is-5">
                      Ville : {product.seller.city} ({product.seller.zipcode}){' '}
                      <br />
                      Adresse : {product.seller.address}
                    </p>
                  </div>
                </div>
                <p className="subtitle is-5">
                  {product.collectType === CollectType.DELIVERY
                    ? 'Disponible en livraison'
                    : 'A récupérer en click and collect'}
                </p>
                <div className="columns is-vcentered">
                  <div className="column is-narrow has-text-centered">
                    <p>Prix :</p>
                  </div>
                  <div className="column is-narrow has-text-centered">
                    <p className="subtitle is-5">{product.price}€ </p>
                  </div>
                  <div className="column has-text-centered">
                    <button
                      className="button is-fullwidth is-normal"
                      onClick={() => {
                        if (!isSeller) {
                          addItem(product, 1);
                        }
                      }}
                      disabled={isSeller}
                    >
                      Ajouter au panier
                    </button>
                  </div>
                </div>
                <div className="columns">
                  <div className="column is-narrow">
                    <p>Avis et notes : </p>
                  </div>
                  <div className="column">
                    {averageGrade === -1 && <p>Ce produit n'a pas d'avis</p>}
                    {averageGrade != -1 && [...Array(Math.trunc(averageGrade)-1)].map(()=>{return <BsStarFill />})}
                    {averageGrade != -1 && averageGrade - Math.trunc(averageGrade) < 0.5 && <BsStarHalf></BsStarHalf>}
                    {averageGrade != -1 && <p>&nbsp;{reviews.length} évaluations</p> }
                  </div>
                </div>
                <div className="columns">
                  <div className="column">
                    <p>Description : {product.description}</p>
                  </div>
                </div>
              </div>
              <div className="column is-2"></div>
            </div>

            <CommentList product={product} reviews={reviews} setReviews={setReviews} averageGrade={averageGrade} />
          </section>
        </>
      )}
    </>
  );
};
export default ProductDetails;
