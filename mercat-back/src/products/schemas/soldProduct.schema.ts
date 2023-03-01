import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Product } from './product.schema';

@Schema()
export class SoldProduct extends Product {
  @Prop({ min: 1 })
  amount: number;

  @Prop({
    enum: [
      'waiting for delivery',
      'sent',
      'delivered',
      'not retrieved',
      'retrieved',
    ],
  })
  status: string;
}

export const SoldProductSchema = SchemaFactory.createForClass(SoldProduct);
