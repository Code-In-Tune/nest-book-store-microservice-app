import { DomainError } from './domain-error';

export class SaleNotFoundError extends DomainError {
  constructor(id: string) {
    super(`Sale with id ${id} not found`, 'SALE_NOT_FOUND', { id });
  }
}
