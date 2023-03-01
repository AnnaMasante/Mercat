import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Seller } from '../../sellers/schemas/seller.schema';
import { Client } from '../../clients/schemas/client.schema';
import { Product } from '../../products/schemas/product.schema';

export type ReviewDocument = Review & Document;

@Schema()
export class Review {
  @Prop({ required: true })
  text: string;
  @Prop()
  published_date: Date;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Seller' })
  idSeller: Seller;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
  idAuthor: Client;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  idProduct: Product;
  @Prop()
  grade: number;
  @Prop()
  created_at: Date;
}
export const ReviewSchema = SchemaFactory.createForClass(Review);
