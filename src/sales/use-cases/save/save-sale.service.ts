import { Inject, Injectable } from '@nestjs/common';
import { SALE_REPOSITORY } from 'src/sales/tokens/sale.tokens';
import type { SaleRepository } from 'src/sales/repositories/sale.repository';
import { SaleMapper } from 'src/sales/mappers/sale.mapper';
import { SaveSaleUseCase } from './save-sale.use-case';
import { SaveSaleResponseDto } from './save-sale-response.dt';
import { SaveSaleRequestDto } from './save-sale-request.dto';
import type { BookRepository } from 'src/books/repositories/book.repository';
import { BOOK_REPOSITORY } from 'src/books/tokens/book.tokens';
import { BookNotFoundError } from 'src/books/domain/errors/book-not-found-error';
import { Sale } from 'src/sales/model/sale.model';

@Injectable()
export class SaveSaleService implements SaveSaleUseCase {
  constructor(
    @Inject(SALE_REPOSITORY)
    private readonly saleRepository: SaleRepository,
    @Inject(BOOK_REPOSITORY)
    private readonly bookRepostory: BookRepository,
    private readonly saleMapper: SaleMapper,
  ) {}

  async execute(request: SaveSaleRequestDto): Promise<SaveSaleResponseDto> {
    const book = await this.bookRepostory.findById(request.bookId);

    if (!book) {
      throw new BookNotFoundError(request.bookId);
    }

    book.quantity -= request.quantity;
    await this.bookRepostory.save(book);

    const sale: Sale = {
      book: {
        bookId: book.id,
        title: book.title,
        price: book.price,
        isbn: book.isbn,
        author: book.author,
      },
      quantity: request.quantity,
      amount: book.price * request.quantity,
    };

    const saleSaved = await this.saleRepository.save(sale);
    return this.saleMapper.toSaveSaleResponseDto(saleSaved);
  }
}
