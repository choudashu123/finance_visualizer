// lib/mongo.ts

import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect().then(client => {
    console.log("✅ Connected to MongoDB");
    return client;
  }).catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  });
}

clientPromise = global._mongoClientPromise;

export default clientPromise;

