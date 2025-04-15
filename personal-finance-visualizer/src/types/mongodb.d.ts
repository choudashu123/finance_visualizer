import { ObjectId, Condition } from 'mongodb';

declare module 'mongodb' {
  interface Filter<T> {
    _id?: string | ObjectId | Condition<ObjectId>;
  }
}