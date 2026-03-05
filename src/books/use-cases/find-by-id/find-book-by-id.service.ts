import { Inject, Injectable } from '@nestjs/common';
import { FindBookByIdUseCase } from '../find-book-by-id.use-case';
import type { BookRepository } from 'src/books/repositories/book.repository';
import { FindBookByIdResponseDto } from './find-book-by-id-response.dto';
import { BookMapper } from 'src/books/mappers/book.mapper';
import { BOOK_REPOSITORY } from 'src/books/tokens/book.tokens';
import { BookNotFoundError } from 'src/books/domain/errors/book-not-found-error';

@Injectable()
export class FindBookByIdService implements FindBookByIdUseCase {
  constructor(
    @Inject(BOOK_REPOSITORY)
    private readonly bookRepository: BookRepository,
    private readonly bookMapper: BookMapper,
  ) {}

  async execute(id: string): Promise<FindBookByIdResponseDto> {
    const book = await this.bookRepository.findById(id);

    if (!book) {
      throw new BookNotFoundError(id);
    }

    return this.bookMapper.toFindByIdResponse(book);
  }
}
