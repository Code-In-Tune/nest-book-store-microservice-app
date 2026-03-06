import { Inject, Injectable } from '@nestjs/common';
import { BookMapper } from 'src/books/mappers/book.mapper';
import type { BookRepository } from 'src/books/repositories/book.repository';
import { BOOK_REPOSITORY } from 'src/books/tokens/book.tokens';
import { FindBooksUseCase } from './find-books.use-case';
import { FindBooksResponseDto } from './find-books-response.dto';

@Injectable()
export class FindBooksService implements FindBooksUseCase {
  constructor(
    @Inject(BOOK_REPOSITORY)
    private readonly bookRepository: BookRepository,
    private readonly bookMapper: BookMapper,
  ) {}

  async execute(): Promise<FindBooksResponseDto> {
    const books = await this.bookRepository.findAll();

    return this.bookMapper.toFindAllResponse(books);
  }
}
