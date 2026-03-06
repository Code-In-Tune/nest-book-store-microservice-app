import { FindBookByIdResponseDto } from '../find-by-id/find-book-by-id-response.dto';

export class FindBooksResponseDto {
  books: FindBookByIdResponseDto[];
}
