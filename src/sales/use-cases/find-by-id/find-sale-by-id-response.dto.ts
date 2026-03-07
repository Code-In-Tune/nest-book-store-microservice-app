export class FindSaleByIdResponseDto {
  id?: string;
  book: {
    bookId: string;
    title: string;
    author: string;
    price: number;
    isbn: string;
  };
  quantity: number;
  amount: number;
}
