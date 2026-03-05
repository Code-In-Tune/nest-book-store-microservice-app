import { Injectable } from '@nestjs/common';
import { Book } from '../model/book.model';
import { FindBookByIdResponseDto } from '../use-cases/find-by-id/find-book-by-id-response.dto';

@Injectable()
export class BookMapper {
  toFindByIdResponse(book: Book): FindBookByIdResponseDto {
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      isbn: book.isbn,
      publisher: book.publisher,
      availability: book.availability,
      quantity: book.quantity,
    };
  }
}
