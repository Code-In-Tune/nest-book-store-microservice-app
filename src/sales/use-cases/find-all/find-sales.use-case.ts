import { FindSalesResponseDto } from './find-sales-response.dto';

export interface FindSalesUseCase {
  execute(): Promise<FindSalesResponseDto>;
}
