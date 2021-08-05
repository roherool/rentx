import { IRead } from './IRead';
import { IWrite } from './IWrite'

import { MongoClient, Db, Collection } from 'mongodb'
import { AppError } from '@shared/errors/AppError';

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  public readonly _collection: Collection;

  constructor(db: Db, collectionName: string) {
    this._collection = db.collection(collectionName);
  }

  async create(item: T): Promise<boolean> {
    const result = await this._collection.insertOne(item);

    return !!result;
  }

  update(id: string, item: T): Promise<boolean> {
    throw new AppError('Method not implemented.');
  }
  delete(id: string): Promise<boolean> {
    throw new AppError('Method not implemented.');
  }
  find(item: T): Promise<T[]> {
    const result = this._collection.find(item)

    return 
  }
  findOne(id: string): Promise<T> {
    throw new AppError('Method not implemented.');
  }
}