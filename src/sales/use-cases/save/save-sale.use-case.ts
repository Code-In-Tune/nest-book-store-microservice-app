import { SaveSaleRequestDto } from './save-sale-request.dto';
import { SaveSaleResponseDto } from './save-sale-response.dt';

export interface SaveSaleUseCase {
  execute(request: SaveSaleRequestDto): Promise<SaveSaleResponseDto>;
}
