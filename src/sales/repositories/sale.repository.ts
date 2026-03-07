import { Sale } from '../model/sale.model';

export interface SaleRepository {
  findById(id: string): Promise<Sale | null>;
  findAll(): Promise<Sale[]>;
  save(sale: Sale): Promise<Sale>;
}
