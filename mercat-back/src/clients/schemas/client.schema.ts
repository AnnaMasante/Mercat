import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';
import {
  Address,
  AddressSchema,
} from '../../addresses/schemas/addresses.schema';

export type ClientDocument = Client & Document;

@Schema()
export class Client {
  _id: string;
  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true, unique: true })
  mail: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    default: [],
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  })
  favorites: string[];

  @Prop({ type: [AddressSchema], default: [] })
  addresses: Address[];
}

export const ClientSchema = SchemaFactory.createForClass(Client);
