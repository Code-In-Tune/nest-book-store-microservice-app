import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SaveSaleService } from './use-cases/save/save-sale.service';
import { FindSalesService } from './use-cases/find-all/find-sales.service';
import { FindSaleByIdService } from './use-cases/find-by-id/find-sale-by-id.service';
import { SaveSaleRequestDto } from './use-cases/save/save-sale-request.dto';

@Controller('sales')
export class SaleController {
  constructor(
    private readonly saveSaleService: SaveSaleService,
    private readonly findSaleByIdService: FindSaleByIdService,
    private readonly findAllSalesService: FindSalesService,
  ) {}

  @Post()
  async saveSale(@Body() request: SaveSaleRequestDto) {
    return this.saveSaleService.execute(request);
  }

  @Get(':id')
  async findSaleById(@Param('id') id: string) {
    return this.findSaleByIdService.execute(id);
  }

  @Get()
  async findAllSales() {
    return this.findAllSalesService.execute();
  }
}
