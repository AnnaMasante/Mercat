import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type SubscriptionDocument = Subscription & Document;

@Schema()
export class Subscription {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  min_product: number;
  @Prop({ required: true })
  max_product: number;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  price: number;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
