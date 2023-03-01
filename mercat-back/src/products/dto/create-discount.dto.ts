import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDiscountDto {
  @IsDate()
  beginning: Date;
  @IsDate()
  ending: Date;
  @IsNumber()
  discount: number;
  @IsNotEmpty()
  typeDiscount: string;
}
