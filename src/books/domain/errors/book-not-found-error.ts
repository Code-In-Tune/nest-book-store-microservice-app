import { DomainError } from './domain-error';

export class BookNotFoundError extends DomainError {
  constructor(id: string) {
    super(`Book with id ${id} not found`, 'BOOK_NOT_FOUND', { id });
  }
}
