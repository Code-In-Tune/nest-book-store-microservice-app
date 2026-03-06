import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BookMapper } from './mappers/book.mapper';
import { BOOK_REPOSITORY } from './tokens/book.tokens';
import { MongooseBookRepository } from './repositories/mongoose/mongoose-book.repository';
import { SaveBookService } from './use-cases/save/save-book.service';
import { UpdateBookService } from './use-cases/update/update-book.service';
import { RemoveBookService } from './use-cases/remove/remove-book.service';
import { FindBookByIdService } from './use-cases/find-by-id/find-book-by-id.service';
import { FindBooksService } from './use-cases/find-all/find-books.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookMongo, BookSchema } from './repositories/mongoose/book.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BookMongo.name, schema: BookSchema }]),
  ],
  controllers: [BooksController],
  providers: [
    BookMapper,
    {
      provide: BOOK_REPOSITORY,
      useClass: MongooseBookRepository,
    },
    SaveBookService,
    UpdateBookService,
    RemoveBookService,
    FindBookByIdService,
    FindBooksService,
  ],
})
export class BooksModule {}
