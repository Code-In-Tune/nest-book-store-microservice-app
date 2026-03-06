import { UpdateBookRequestDto } from './update-book-request.dto';
import { UpdateBookResponseDto } from './update-book-response.dto';

export interface UpdateBookUseCase {
  execute(
    request: UpdateBookRequestDto,
    id: string,
  ): Promise<UpdateBookResponseDto>;
}
