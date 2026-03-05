import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BookRepository } from '../book.repository';
import { Book } from '../../model/book.model';
import { BookMongo, BookDocument } from './book.schema';

@Injectable()
export class MongooseBookRepository implements BookRepository {
  constructor(
    @InjectModel(BookMongo.name)
    private readonly bookModel: Model<BookMongo>,
  ) {}

  async findById(id: string): Promise<Book | null> {
    if (!Types.ObjectId.isValid(id)) return null;

    const doc = await this.bookModel.findById(id).lean<BookDocument>().exec();
    return doc ? this.toDomain(doc) : null;
  }

  async findAll(): Promise<Book[]> {
    const docs = await this.bookModel.find().lean<BookDocument[]>().exec();
    return docs.map((doc) => this.toDomain(doc));
  }

  async save(input: Book): Promise<Book> {
    if (input.id) {
      if (!Types.ObjectId.isValid(input.id)) {
        throw new Error(`Invalid book id ${input.id}`);
      }

      const { id, ...rest } = input;

      const updated = await this.bookModel
        .findByIdAndUpdate(
          id,
          { $set: rest },
          { new: true, runValidators: true },
        )
        .lean<BookDocument>()
        .exec();

      if (!updated) {
        throw new Error(`Book with id ${id} not found`);
      }

      return this.toDomain(updated);
    }

    const created = await this.bookModel.create({
      ...input,
      availability: input.availability ?? true,
      quantity: input.quantity ?? 0,
    });

    return this.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) return;

    await this.bookModel.findByIdAndDelete(id).exec();
  }

  private toDomain(doc: BookMongo & { _id: any }): Book {
    return {
      id: String(doc._id),
      title: doc.title,
      author: doc.author,
      price: doc.price,
      isbn: doc.isbn,
      publisher: doc.publisher,
      availability: doc.availability,
      quantity: doc.quantity,
    };
  }
}
