import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongo';

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    if (!params?.id) {
      return NextResponse.json(
        { error: 'Transaction ID is required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'finance');

    // Handle both ObjectId and string UUIDs
    let query;
    if (ObjectId.isValid(params.id)) {
      query = { _id: new ObjectId(params.id) };
    } else {
      query = { _id: params.id };
    }

    const result = await db.collection('transactions').deleteOne(query as any);

    if (result.deletedCount === 1) {
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json(
      { error: 'Transaction not found' },
      { status: 404 }
    );
    
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
};