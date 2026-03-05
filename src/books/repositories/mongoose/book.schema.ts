import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookDocument = HydratedDocument<BookMongo>;

@Schema({ collection: 'books', timestamps: true })
export class BookMongo {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, trim: true })
  author: string;

  @Prop({ required: true })
  price!: number;

  @Prop({ required: true, unique: true, index: true, trim: true })
  isbn: string;

  @Prop({ required: true, trim: true })
  publisher: string;

  @Prop({ required: true, default: true })
  availability: boolean;

  @Prop({ required: true, default: 0, min: 0 })
  quantity: number;
}

export const BookSchema = SchemaFactory.createForClass(BookMongo);
