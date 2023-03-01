import { IsEmail, IsNotEmpty } from 'class-validator';
import { CreateAddressDto } from '../../addresses/dto/create-address.dto';

export class CreateClientDto {
  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;

  @IsEmail()
  mail: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  addresses: CreateAddressDto[];
}
