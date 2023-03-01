import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop({ unique: true, required: true })
  label: string;
}
export const CategorySchema = SchemaFactory.createForClass(Category);
