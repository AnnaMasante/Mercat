import "../../css/starRating.css"
import {BsStarFill} from "react-icons/all";
import {FC, useState} from "react";

const StarRating : FC<{grade : number, setGrade : (grade : number) => void}> = ({grade, setGrade}) => {

    const [rating, setRating] = useState<number>(5)
    const [hover, setHover] = useState(5)

    const onModify = (ratingValue : number) => {
        setRating(ratingValue)
        setGrade(ratingValue)
    }
    return(
        <>
            <div id="star-rating">
                {[...Array(5)].map((star,i) => {
                    const ratingValue = i + 1
                    return (
                        <label>
                            <input type="radio"
                                   name="rating"
                                   value={ratingValue}
                                   onClick={() =>onModify(ratingValue)}

                            />
                            <BsStarFill
                                id="star"
                                color={ratingValue <= (hover || rating ) ? "#ffc107" : "#e4e5e9"}
                                size={25}
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={()=> onModify(ratingValue)}
                            />
                        </label>)
                })}

            </div>
        </>
    )
}
export default StarRating
