import { BookSnapshot } from './book-snapshot.model';

export interface Sale {
  id?: string;
  book: BookSnapshot;
  quantity: number;
  amount: number;
}
