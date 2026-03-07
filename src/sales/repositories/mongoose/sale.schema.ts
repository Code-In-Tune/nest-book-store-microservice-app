import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import type { BookSnapshot } from 'src/sales/model/book-snapshot.model';

export type SaleDocument = HydratedDocument<SaleMongo>;

@Schema({ collection: 'sales', timestamps: true })
export class SaleMongo {
  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  book: BookSnapshot;
}

export const SaleSchema = SchemaFactory.createForClass(SaleMongo);
