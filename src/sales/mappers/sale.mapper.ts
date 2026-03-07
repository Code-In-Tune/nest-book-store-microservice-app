import { Sale } from '../model/sale.model';
import { FindSalesResponseDto } from '../use-cases/find-all/find-sales-response.dto';
import { FindSaleByIdResponseDto } from '../use-cases/find-by-id/find-sale-by-id-response.dto';
import { SaveSaleResponseDto } from '../use-cases/save/save-sale-response.dt';

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

  toFindSalesResponseDto(sales: Sale[]): FindSalesResponseDto {
    return {
      sales: sales.map((sale) => this.toFindSaleByIdResponseDto(sale)),
    };
  }

  toSaveSaleResponseDto(sale: Sale): SaveSaleResponseDto {
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
