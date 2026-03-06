import { Type } from 'class-transformer';
import {
  IsCurrency,
  IsISBN,
  IsNumber,
  IsString,
  Matches,
  Min,
} from 'class-validator';

export class UpdateBookRequestDto {
  @Matches(/^[\p{L}0-9\s'’:.,-]+$/u, {
    message: 'Title must contain only letters, numbers and spaces',
  })
  @IsString({ message: 'Title must be a string' })
  title: string;
  @Matches(/^[\p{L}0-9\s'’:.,-]+$/u, {
    message: 'Author must contain only letters, numbers and spaces',
  })
  @IsString({ message: 'Author must be a string' })
  author: string;
  @IsCurrency({}, { message: 'Price must be a valid currency format' })
  price: string;
  @IsISBN('13', { message: 'ISBN must be a valid ISBN-13 format' })
  isbn: string;
  @Matches(/^[\p{L}0-9\s'’:.,-]+$/u, {
    message: 'Publisher must contain only letters, numbers and spaces',
  })
  @IsString({ message: 'Publisher must be a string' })
  publisher: string;
  @IsNumber({}, { message: 'Quantity must be a number' })
  @Type(() => Number)
  @Min(0, { message: 'Quantity must be greater than or equal to 0' })
  quantity: number;
}
