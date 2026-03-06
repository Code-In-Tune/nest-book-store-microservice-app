import { FindBookByIdResponseDto } from './find-book-by-id-response.dto';

export interface FindBookByIdUseCase {
  execute(id: string): Promise<FindBookByIdResponseDto>;
}
