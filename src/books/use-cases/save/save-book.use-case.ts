import { SaveBookRequestDto } from './save-book-request.dto';
import { SaveBookResponseDto } from './save-book-response.dto';

export interface SaveBookUseCase {
  execute(request: SaveBookRequestDto): Promise<SaveBookResponseDto>;
}
