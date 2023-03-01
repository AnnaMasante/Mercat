import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateSellerDto {
  @IsNotEmpty()
  firstname: string;
  @IsNotEmpty()
  lastname: string;
  @IsNotEmpty()
  store: string;
  @IsNotEmpty()
  address: string;
  @IsNotEmpty()
  zipcode: string;
  @IsNotEmpty()
  city: string;
  @IsNotEmpty()
  description: string;
  @IsEmail()
  mail: string;
  @IsNotEmpty()
  password: string;
}
