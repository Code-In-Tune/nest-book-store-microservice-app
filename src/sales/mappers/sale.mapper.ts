import { Sale } from '../model/sale.model';
import { FindSaleByIdResponseDto } from '../use-cases/find-by-id/find-sale-by-id-response.dto';

export class SaleMapper {
  toFindSaleByIdResponseDto(sale: Sale): FindSaleByIdResponseDto {
    return {
      id: sale.id,
      book: {
        bookId: sale.book.bookId,
        title: sale.book.title,
        author: sale.book.author,
        price: sale.book.price,
        isbn: sale.book.isbn,
      },
      quantity: sale.quantity,
      amount: sale.amount,
    };
  }
}
