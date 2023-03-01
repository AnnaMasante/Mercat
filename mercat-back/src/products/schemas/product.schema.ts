import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Review, ReviewSchema } from '../../reviews/schemas/reviews.schema';
import { CreateDiscountDto } from '../dto/create-discount.dto';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  _id: string;
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  created_at: Date;

  @Prop({ type: [String], required: true })
  images: string[];

  @Prop(
    raw({
      store: { type: String },
      zipcode: { type: String },
      address: { type: String },
      city: { type: String },
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller' },
    }),
  )
  seller: Record<string, any>;

  @Prop({
    default: 'CLICKANDCOLLECT',
    enum: ['DELIVERY', 'CLICKANDCOLLECT'],
    required: true,
  })
  collectType: string;

  @Prop({ type: [ReviewSchema], default: [] })
  reviews?: Review[];

  @Prop({ default: [] })
  discounts: CreateDiscountDto[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
