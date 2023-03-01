import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAddressDto {
  _id: string;
  @IsNotEmpty()
  country: string;
  @IsNotEmpty()
  street: string;
  @IsNotEmpty()
  zipcode: string;
  @IsNotEmpty()
  city: string;
  state: string;
  @IsString()
  streetBis: string;
  @IsNotEmpty()
  firstname: string;
  @IsNotEmpty()
  lastname: string;
}
