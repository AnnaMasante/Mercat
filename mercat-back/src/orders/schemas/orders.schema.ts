import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Address } from 'cluster';
import * as mongoose from 'mongoose';
import { AddressSchema } from 'src/addresses/schemas/addresses.schema';
import {
  SoldProduct,
  SoldProductSchema,
} from 'src/products/schemas/soldProduct.schema';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  _id: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
  clientId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Seller' })
  sellerId: string;

  @Prop({ required: true })
  paid: boolean;

  @Prop({ required: true })
  price: number;

  @Prop({ type: [SoldProductSchema], required: true })
  products: SoldProduct[];

  @Prop({ default: Date.now() })
  created_at: Date;

  @Prop({ type: AddressSchema })
  deliveryAddress: Address;

  @Prop()
  deliveryFee?: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
