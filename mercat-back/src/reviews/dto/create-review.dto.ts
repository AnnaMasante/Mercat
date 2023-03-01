import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateReviewDto {
  _id: string;
  @IsNotEmpty()
  idAuthor: string;
  @IsNotEmpty()
  text: string;
  idProduct: string;
  @IsNotEmpty()
  idSeller: string;
  @IsDateString()
  created_at: Date;
  grade: number;
}
