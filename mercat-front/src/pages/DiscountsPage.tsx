import {useContext} from "react";
import {UserContext} from "../contexts/user/types";
import CreateDiscount from "../components/discount/CreateDiscount";
import {useGet} from "../utils/hooks/useGet";
import {Seller} from "../utils/types/Seller";
import Loading from "../components/Loading";
import Discounts from "../components/discount/Discounts";

const DiscountsPage = () => {

    const { user } = useContext(UserContext);
    const [seller, isPending, error, setSeller] = useGet<Seller>('/sellers/profile');

    return(
        <>
            {isPending && Loading}
            {seller &&
                <div className="columns">
                    <div className="column is-2"></div>
                    <div className="column">
                        <h2 className="title is-2">
                            Articles en promotion
                        </h2>
                        <CreateDiscount seller={seller}></CreateDiscount>
                        <Discounts seller={seller}></Discounts>
                    </div>
                    <div className="column is-2"></div>


                </div>

            }
        </>
    )
}
export default DiscountsPage
