import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongo';
import { ObjectId } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config({path: '.env.local'});

export async function GET() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const transactions = await db.collection('transactions').find().toArray();

  return NextResponse.json(transactions);
}

export async function POST(req: Request) {
  const body = await req.json();
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const transaction = {
    ...body,
    _id: new ObjectId()  // Generating a valid MongoDB ObjectId
  };

  const result = await db.collection('transactions').insertOne(body);
  return NextResponse.json({ ...body, _id: result.insertedId });
}
