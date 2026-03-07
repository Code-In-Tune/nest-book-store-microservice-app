import { Inject, Injectable } from '@nestjs/common';
import { FindSaleByIdUseCase } from './find-sale-by-id.use-case';
import { SALE_REPOSITORY } from 'src/sales/tokens/sale.tokens';
import type { SaleRepository } from 'src/sales/repositories/sale.repository';
import { SaleMapper } from 'src/sales/mappers/sale.mapper';
import { FindSaleByIdResponseDto } from './find-sale-by-id-response.dto';
import { SaleNotFoundError } from 'src/sales/domain/errors/sale-not-found-error';

@Injectable()
export class FindSaleByIdService implements FindSaleByIdUseCase {
  constructor(
    @Inject(SALE_REPOSITORY)
    private readonly saleRepository: SaleRepository,
    private readonly saleMapper: SaleMapper,
  ) {}

  async execute(id: string): Promise<FindSaleByIdResponseDto> {
    const sale = await this.saleRepository.findById(id);

    if (!sale) {
      throw new SaleNotFoundError(id);
    }

    return this.saleMapper.toFindSaleByIdResponseDto(sale);
  }
}
