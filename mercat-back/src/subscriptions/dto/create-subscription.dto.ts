import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSubscriptionDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  @IsNumber()
  min_product: number;
  @IsNumber()
  max_number: number;
  @IsNumber()
  price: number;
}
