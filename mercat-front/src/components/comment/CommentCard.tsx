import { BsStarFill, BsStarHalf } from 'react-icons/all';
import { Review } from '../../utils/types/Review';
import { FC } from 'react';

const CommentCard: FC<{ review: Review }> = ({ review }) => {
  return (
    <>
      <div className="columns">
        <div className="column is-2"></div>

        <div className="column box" id="comment">
          <div className="columns">
            {/* Comment card*/}
            <div className="column">
              {/*La photo, le nom de la personne, la note et la date*/}
              <div className="columns">
                <div className="column is-narrow">
                  <figure className="image is-48x48">
                    <img
                      className="is-rounded"
                      src="https://bulma.io/images/placeholders/128x128.png"
                      alt=""
                    />
                  </figure>
                </div>
                <div className="column">
                  <p>{review.idAuthor}</p>
                  {[...Array(Math.trunc(review.grade))].map(() => {
                    return <BsStarFill />;
                  })}
                  {review.grade - Math.trunc(review.grade) >= 0.5 && (
                    <BsStarHalf></BsStarHalf>
                  )}
                </div>
              </div>

              {/*L'avis de la personne*/}
              <div className="columns">
                <div className="column">
                  <p> {review.text}</p>
                </div>
              </div>

              {/*Le lien vers l'objet acheté*/}
              {/*<div className="columns is-vcentered">
                <div className="column is-1">
                  <figure className="image is-48x48">
                    <img
                      src="https://bulma.io/images/placeholders/128x128.png"
                      alt=""
                    />
                  </figure>
                </div>
                 <div className="column">
                  <a href="/produit"> Un super produit trop beau trop cool</a>
                </div>
              </div>*/}
            </div>
          </div>
        </div>

        <div className="column is-2"></div>
      </div>
    </>
  );
};
export default CommentCard;
