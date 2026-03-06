import { Inject, Injectable } from '@nestjs/common';
import { SaveBookRequestDto } from './save-book-request.dto';
import { SaveBookResponseDto } from './save-book-response.dto';
import { SaveBookUseCase } from './save-book.use-case';
import { BOOK_REPOSITORY } from 'src/books/tokens/book.tokens';
import type { BookRepository } from 'src/books/repositories/book.repository';
import { BookMapper } from 'src/books/mappers/book.mapper';
import { Book } from 'src/books/model/book.model';

@Injectable()
export class SaveBookService implements SaveBookUseCase {
  constructor(
    @Inject(BOOK_REPOSITORY)
    private readonly bookRepository: BookRepository,
    private readonly bookMapper: BookMapper,
  ) {}

  async execute(request: SaveBookRequestDto): Promise<SaveBookResponseDto> {
    const bookDomain: Book = this.bookMapper.fromSaveBookRequest(request);
    const savedBook: Book = await this.bookRepository.save(bookDomain);
    const response: SaveBookResponseDto =
      this.bookMapper.toSaveBookResponse(savedBook);
    return response;
  }
}
