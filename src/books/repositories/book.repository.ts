import { Book } from '../model/book.model';

export interface BookRepository {
  findById(id: string): Promise<Book | null>;
  findAll(): Promise<Book[]>;
  save(book: Book): Promise<Book>;
  delete(id: string): Promise<void>;
}
