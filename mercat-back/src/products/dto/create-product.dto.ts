import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateDiscountDto } from './create-discount.dto';

export class CreateProductDto {
  @IsString()
  name: string;
  @IsNumber()
  price: number;
  @IsString()
  description: string;
  @IsNumber()
  quantity: number;
  @IsDateString()
  created_at: Date;
  @IsNotEmpty()
  images: string[];

  seller: {
    store: string;
    zipcode: string;
    address: string;
    city: string;
    id: string;
  };

  discounts: CreateDiscountDto[];
}
