import { Inject, Injectable } from '@nestjs/common';
import { RemoveBookUseCase } from './remove-book.use-case';
import { BOOK_REPOSITORY } from 'src/books/tokens/book.tokens';
import type { BookRepository } from 'src/books/repositories/book.repository';

@Injectable()
export class RemoveBookService implements RemoveBookUseCase {
  constructor(
    @Inject(BOOK_REPOSITORY)
    private readonly bookRepository: BookRepository,
  ) {}
  async execute(id: string): Promise<void> {
    await this.bookRepository.delete(id);
  }
}
