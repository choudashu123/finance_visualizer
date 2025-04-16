

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}
export {};

import { ObjectId, Condition } from 'mongodb';

declare module 'mongodb' {
  interface Filter<T> {
    _id?: string | ObjectId | Condition<ObjectId>;
  }
}

