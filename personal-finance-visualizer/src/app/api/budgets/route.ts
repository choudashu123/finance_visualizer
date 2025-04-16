// app/api/budgets/route.ts

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongo';

export async function POST(req: Request) {
  try {
    const { category, amount } = await req.json();
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'finance');

    const existing = await db.collection('budgets').findOne({ category });

    if (existing) {
      await db.collection('budgets').updateOne({ category }, { $set: { amount } });
    } else {
      await db.collection('budgets').insertOne({ category, amount });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('POST /budgets error:', err);
    return NextResponse.json({ error: 'Failed to save budget' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'finance');
    const data = await db.collection('budgets').find().toArray();

    return NextResponse.json(data);
  } catch (err) {
    console.error('GET /budgets error:', err);
    return NextResponse.json({ error: 'Failed to fetch budgets' }, { status: 500 });
  }
}
