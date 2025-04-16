import { ObjectId, Filter, Document, DeleteResult } from 'mongodb';

declare module 'mongodb' {
  interface Collection<T extends Document = Document> {
    deleteOne(
      filter: {
        _id?: ObjectId | string;  // Handles both ObjectId and string UUIDs
        id?: string;              // Handles custom 'id' field
        $or?: Array<{             // Allows $or queries
          _id?: ObjectId | string;
          id?: string;
        }>;
      }
    ): Promise<DeleteResult>;
  }
}

export {}; // Required to be treated as a module