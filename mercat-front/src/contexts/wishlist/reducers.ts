import {Product} from '../../utils/types/Product';
import {WishListAction, WishListActionType} from "../../utils/types/wishList.types";

const addItemToWishList = (
    product: Product,
    prevState: string[]
) => {
    if(prevState.includes(product._id!)){
        return prevState
    }
    const newList = [...prevState]
    newList.push(product._id!)
    return newList
};

const removeItemFromWishList = (
    product: Product,
    prevState: string[]
) => {
    const newList = prevState.filter((elem) => elem!==product._id)
    return newList
};


export const wishListReducer = (prevState: string[], action: WishListAction, payload? : string[]) => {
    switch (action.type) {
        case WishListActionType.ADD:
            return addItemToWishList(action.product, prevState)
        case WishListActionType.REMOVE:
            return removeItemFromWishList(action.product, prevState)
        default:
            return prevState;
    }
};
