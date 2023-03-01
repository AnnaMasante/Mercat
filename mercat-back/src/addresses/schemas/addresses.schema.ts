import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Address {
  _id: string;
  @Prop()
  firstname: string;
  @Prop()
  lastname: string;
  @Prop()
  country: string;
  @Prop()
  street: string;
  @Prop()
  city: string;
  @Prop()
  streetBis: string;
  @Prop()
  state: string;
  @Prop()
  zipcode: string;
}
export const AddressSchema = SchemaFactory.createForClass(Address);
