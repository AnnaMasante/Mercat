import { Product } from './Product';
import {Subscription} from "./Subscription";

export type Seller = {
  _id?: string;
  firstname: string;
  lastname: string;
  store: string;
  address: string;
  zipcode: string;
  city: string;
  description: string;
  mail? : string,
  products: Product[];
  password? : string;
  subscription : Subscription;
};

export type SellerAccount = {
  _id?: string;
  firstname: string;
  lastname: string;
  mail: string;
  password: string;
  store: string;
  address: string;
  zipcode: string;
  city: string;
  description: string;
};
