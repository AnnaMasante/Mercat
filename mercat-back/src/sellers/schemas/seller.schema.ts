import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Subscription } from '../../subscriptions/schemas/subscription.schema';

export type SellerDocument = Seller & Document;

@Schema()
export class Seller {
  _id: string;
  @Prop({ required: true })
  firstname: string;
  @Prop({ required: true })
  lastname: string;
  @Prop({ required: true, unique: true })
  store: string;
  @Prop()
  address: string;
  @Prop()
  zipcode: string;
  @Prop()
  city: string;
  @Prop()
  description: string;
  @Prop({ required: true, unique: true })
  mail: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  subscription: Subscription;
  /*@Prop({ type: [{ type: Product, ref: 'Product' }] })
  products: Product[];*/
}
export const SellerSchema = SchemaFactory.createForClass(Seller);
