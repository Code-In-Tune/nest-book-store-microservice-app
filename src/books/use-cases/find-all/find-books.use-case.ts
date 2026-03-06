import { FindBooksResponseDto } from './find-books-response.dto';

export interface FindBooksUseCase {
  execute(): Promise<FindBooksResponseDto>;
}
