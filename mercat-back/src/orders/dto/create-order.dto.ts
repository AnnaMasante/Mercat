import { Address } from 'cluster';
import { Product } from 'src/products/schemas/product.schema';

export class CartItem {
  product: Product;
  amount: number;
}

export class CreateOrderDto {
  items: CartItem[];
  deliveryAddress?: Address;
}
