import { IsNumber, IsString } from 'class-validator';

export class SaveSaleRequestDto {
  @IsString()
  bookId: string;
  @IsNumber()
  quantity: number;
}
