import {Product} from "./types/Product";

export function isInWishList(product: Product, wishList: string[]){
    let found : boolean = false
    wishList.forEach((id) => {
        if(id===product._id){
            found = true
        }
    })
    return found
}
