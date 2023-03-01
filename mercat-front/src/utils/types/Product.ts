import { Review } from './Review';
import {Discount} from "./Discount";

export enum CollectType {
  DELIVERY = 'DELIVERY',
  CLICKANDCOLLECT = 'CLICKANDCOLLECT',
}

export type Product = {
  _id?: string;
  name: string;
  price: number;
  description: string;
  category: string;
  quantity: number;
  collectType: CollectType;
  created_at?: string;
  images: string[];
  seller: {
    store: string;
    zipcode: string;
    address: string;
    city: string;
    id: string;
  };
  reviews?: Review[];
  discounts?: Discount[]
};
