
import { ObjectId } from 'mongodb';

declare module 'mongodb' {
  interface Collection {
    deleteOne(
      filter: { _id: ObjectId | string }
    ): Promise<DeleteResult>;
  }
}