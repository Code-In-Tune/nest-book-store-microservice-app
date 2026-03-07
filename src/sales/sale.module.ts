import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SaleMongo, SaleSchema } from './repositories/mongoose/sale.schema';
import { SaleController } from './sale.controller';
import { SaleMapper } from './mappers/sale.mapper';
import { SALE_REPOSITORY } from './tokens/sale.tokens';
import { MongooseSaleRepository } from './repositories/mongoose/mongoose-sale.repository';
import { SaveSaleService } from './use-cases/save/save-sale.service';
import { FindSaleByIdService } from './use-cases/find-by-id/find-sale-by-id.service';
import { FindSalesService } from './use-cases/find-all/find-sales.service';
import { BooksModule } from 'src/books/books.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SaleMongo.name, schema: SaleSchema }]),
    BooksModule,
  ],
  controllers: [SaleController],
  providers: [
    SaleMapper,
    {
      provide: SALE_REPOSITORY,
      useClass: MongooseSaleRepository,
    },
    SaveSaleService,
    FindSaleByIdService,
    FindSalesService,
  ],
  exports: [SALE_REPOSITORY],
})
export class SalesModule {}
