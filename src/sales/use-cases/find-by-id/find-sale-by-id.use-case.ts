import { FindSaleByIdResponseDto } from './find-sale-by-id-response.dto';

export interface FindSaleByIdUseCase {
  execute(id: string): Promise<FindSaleByIdResponseDto>;
}
