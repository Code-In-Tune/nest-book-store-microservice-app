import { Model, Types } from 'mongoose';
import { SaleRepository } from '../sale.repository';
import { SaleDocument, SaleMongo } from './sale.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Sale } from 'src/sales/model/sale.model';

@Injectable()
export class MongooseSaleRepository implements SaleRepository {
  constructor(
    @InjectModel(SaleMongo.name)
    private readonly saleModel: Model<SaleMongo>,
  ) {}

  async findById(id: string): Promise<Sale | null> {
    if (!Types.ObjectId.isValid(id)) return null;

    const doc = await this.saleModel.findById(id).lean<SaleDocument>().exec();
    return doc ? this.toDomain(doc) : null;
  }

  async findAll(): Promise<Sale[]> {
    const docs = await this.saleModel.find().lean<SaleDocument[]>().exec();
    return docs.map((doc) => this.toDomain(doc));
  }

  async save(input: Sale): Promise<Sale> {
    if (input.id) {
      if (!Types.ObjectId.isValid(input.id)) {
        throw new Error(`Invalid sale id ${input.id}`);
      }

      const { id, ...rest } = input;

      const updated = await this.saleModel
        .findByIdAndUpdate(
          id,
          { $set: rest },
          { new: true, runValidators: true },
        )
        .lean<SaleDocument>()
        .exec();

      if (!updated) {
        throw new Error(`Sale with id ${id} not found`);
      }

      return this.toDomain(updated);
    }

    const created = await this.saleModel.create({
      ...input,
    });

    return this.toDomain(created);
  }

  private toDomain(doc: SaleMongo & { _id: any }): Sale {
    return {
      id: String(doc._id),
      book: doc.book,
      quantity: doc.quantity,
      amount: doc.amount,
    };
  }
}
