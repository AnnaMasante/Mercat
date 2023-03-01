import CommentCard from './CommentCard';
import { BsStarFill, BsStarHalf } from 'react-icons/all';
import { Review } from '../../utils/types/Review';
import {FC, useContext, useEffect, useState} from 'react';
import TextAreaForm from '../form/TextAreaForm';
import { Product } from '../../utils/types/Product';
import { useAxios } from '../../utils/hooks/useAxios';
import { useForm } from '../../utils/hooks/useForm';
import { SELLER, UserContext } from '../../contexts/user/types';
import StarRating from "./StarRating";

const CommentList: FC<{ product: Product, averageGrade : number, reviews : Review[], setReviews : React.Dispatch<any> }> = ({ product, averageGrade, reviews, setReviews }) => {
  const sortTab = ['Pertinence', 'Les plus récents'];

  const { user, loggedIn } = useContext(UserContext);
  const isSeller = !!(user && user.role === SELLER);
  const isDisabled = isSeller || !loggedIn

  const axios = useAxios();

  const [grade, setGrade] = useState<number>(5)

  const initialState: Record<string, any> = {
    text: '',
    grade: 5,
  };

  const submitReview = () => {
    const newReview: Review = {
      text: values.text,
      idAuthor: user!.sub,
      grade: grade,
      idProduct: product._id,
      idSeller: product.seller.id,
    };
    axios
      .post(`/products/${product._id}/addComment`, newReview)
      .then((res) => setReviews(res.data.reviews));
  };

  const validateForm = (values: Record<string, any>) => {
    let errors: Record<string, string> = {};
    if (values.text.trim().length < 10) {
      errors.text = 'Your comment must have at least 10 characters';
    }
    if (values.grade < 1 || values.grade > 5) {
      errors.grade = 'Your grade cannot be below 1';
    }
    return errors;
  };

  const { onChange, onSubmit, errors, values } = useForm(
    submitReview,
    initialState,
    validateForm,
  );



  return (
    <>
      <section className="section">
        <div className="columns">
          <div className="column is-2"></div>
          <div className="column ">
            <StarRating grade={grade} setGrade={setGrade}></StarRating>
            <TextAreaForm
              onChange={onChange}
              value={values.text}
              title="Commentaire"
              name="text"
              placeholder="Votre commentaire ici"
              error={errors.text}
            ></TextAreaForm>
            {console.log(isSeller)}
            <button
              className="button is-black"
              onClick={(e) => {
                if (!isDisabled) {
                  onSubmit(e);
                }
              }}
              disabled={isDisabled}
            >
              Enregistrer le commentaire
            </button>
          </div>
          <div className="column is-2"></div>
        </div>
      </section>
      <div className="columns">
        <div className="column is-2"> </div>
        <div className="column">
          <div className="columns is-vcentered">
            {/* Commentaires clients*/}
            <div className="column">
              <p className="title">Commentaires client</p>
              <p className="subtitle">
                {averageGrade === -1 && <p>Ce produit n'a pas d'avis</p>}
                {averageGrade != -1 && [...Array(Math.trunc(averageGrade)-1)].map(()=>{return <BsStarFill />})}
                {averageGrade != -1 && averageGrade - Math.trunc(averageGrade) < 0.5 && <BsStarHalf></BsStarHalf>}
                {averageGrade != -1 && <p>&nbsp;{reviews.length} évaluations</p> }
              </p>
            </div>

            {/* Triés les commentaires par */}
            <div className="column has-text-right ">
              <div className="columns">
                <div className="column">
                  <p>Triés par : </p>
                </div>
                <div className="column is-narrow">
                  <div className="select">
                    <select>
                      <option value="">Pertinence</option>
                      <option value="">Les plus récents</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="column is-2"> </div>
      </div>

      {reviews && reviews.map((review) => <CommentCard review={review} />)}
    </>
  );
};
export default CommentList;
