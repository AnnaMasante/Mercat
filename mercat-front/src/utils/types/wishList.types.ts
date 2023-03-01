import { Product } from './Product';

export interface WishListAction {
    product: Product;
    type: WishListActionType;
}

export enum WishListActionType {
    ADD = 'ADD',
    REMOVE = 'REMOVE',
}
