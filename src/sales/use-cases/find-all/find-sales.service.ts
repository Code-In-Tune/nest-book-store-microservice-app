import { Inject, Injectable } from '@nestjs/common';
import { SALE_REPOSITORY } from 'src/sales/tokens/sale.tokens';
import type { SaleRepository } from 'src/sales/repositories/sale.repository';
import { SaleMapper } from 'src/sales/mappers/sale.mapper';
import { FindSalesUseCase } from './find-sales.use-case';
import { FindSalesResponseDto } from './find-sales-response.dto';

@Injectable()
export class FindSalesService implements FindSalesUseCase {
  constructor(
    @Inject(SALE_REPOSITORY)
    private readonly saleRepository: SaleRepository,
    private readonly saleMapper: SaleMapper,
  ) {}

  async execute(): Promise<FindSalesResponseDto> {
    const sales = await this.saleRepository.findAll();

    return this.saleMapper.toFindSalesResponseDto(sales);
  }
}
