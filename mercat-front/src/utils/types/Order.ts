import { Address } from './Address';
import { Product } from './Product';

enum ProductOrderStatus {
  'waiting for delivery',
  'sent',
  'delivered',
  'not retrieved',
  'retrieved',
}

export type SoldProduct = Product & {
  amount: number;
  status: string;
};

export type Order = {
  _id?: string;
  clientId: string;
  sellerId: string;
  paid: boolean;
  price: number;
  products: SoldProduct[];
  created_at: Date;
  deliveryAddress: Address;
  deliveryFee?: number;
};
