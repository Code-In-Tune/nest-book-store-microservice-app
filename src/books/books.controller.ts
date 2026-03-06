import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SaveBookService } from './use-cases/save/save-book.service';
import { FindBookByIdService } from './use-cases/find-by-id/find-book-by-id.service';
import { FindBooksService } from './use-cases/find-all/find-books.service';
import { UpdateBookService } from './use-cases/update/update-book.service';
import { RemoveBookService } from './use-cases/remove/remove-book.service';
import { SaveBookResponseDto } from './use-cases/save/save-book-response.dto';
import { SaveBookRequestDto } from './use-cases/save/save-book-request.dto';
import { FindBookByIdResponseDto } from './use-cases/find-by-id/find-book-by-id-response.dto';
import { UpdateBookRequestDto } from './use-cases/update/update-book-request.dto';
import { UpdateBookResponseDto } from './use-cases/update/update-book-response.dto';

@Controller('books')
export class BooksController {
  constructor(
    private readonly saveBookUseCase: SaveBookService,
    private readonly findBookByIdUseCase: FindBookByIdService,
    private readonly findAllBooksUseCase: FindBooksService,
    private readonly updateBookUseCase: UpdateBookService,
    private readonly deleteBookUseCase: RemoveBookService,
  ) {}

  @Post()
  async saveBook(
    @Body() request: SaveBookRequestDto,
  ): Promise<SaveBookResponseDto> {
    return this.saveBookUseCase.execute(request);
  }

  @Get(':id')
  async findBookById(
    @Param('id') id: string,
  ): Promise<FindBookByIdResponseDto> {
    return this.findBookByIdUseCase.execute(id);
  }

  @Get()
  async findAllBooks() {
    return this.findAllBooksUseCase.execute();
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<void> {
    return this.deleteBookUseCase.execute(id);
  }

  @Put(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() request: UpdateBookRequestDto,
  ): Promise<UpdateBookResponseDto> {
    return this.updateBookUseCase.execute(request, id);
  }
}
