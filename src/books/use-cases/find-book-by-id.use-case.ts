import { FindBookByIdResponseDto } from './find-by-id/find-book-by-id-response.dto';

export interface FindBookByIdUseCase {
  execute(id: string): Promise<FindBookByIdResponseDto>;
}
