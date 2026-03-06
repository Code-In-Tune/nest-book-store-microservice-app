import type { BookRepository } from 'src/books/repositories/book.repository';
import { UpdateBookRequestDto } from './update-book-request.dto';
import { UpdateBookResponseDto } from './update-book-response.dto';
import { UpdateBookUseCase } from './update-book.use-case';
import { BOOK_REPOSITORY } from 'src/books/tokens/book.tokens';
import { Inject, Injectable } from '@nestjs/common';
import { BookMapper } from 'src/books/mappers/book.mapper';
import { Book } from 'src/books/model/book.model';

@Injectable()
export class UpdateBookService implements UpdateBookUseCase {
  constructor(
    @Inject(BOOK_REPOSITORY)
    private readonly bookRepository: BookRepository,
    private readonly bookMapper: BookMapper,
  ) {}

  async execute(
    request: UpdateBookRequestDto,
    id: string,
  ): Promise<UpdateBookResponseDto> {
    const bookDomain: Book = this.bookMapper.fromUpdateBookRequest(request, id);
    const updatedBook: Book = await this.bookRepository.save(bookDomain);
    const response: UpdateBookResponseDto =
      this.bookMapper.toUpdateBookResponse(updatedBook);
    return response;
  }
}
