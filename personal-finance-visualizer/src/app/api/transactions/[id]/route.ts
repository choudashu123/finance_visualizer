import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongo';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params?.id) {
      return NextResponse.json(
        { error: 'Transaction ID is required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'finance');

    // Solution 1: Type-safe branching
    let result;
    if (ObjectId.isValid(params.id)) {
      result = await db.collection('transactions').deleteOne({ 
        _id: new ObjectId(params.id) 
      });
    } else {
      // For string IDs, we need to assert the type
      result = await db.collection('transactions').deleteOne({ 
        _id: params.id as unknown as ObjectId 
      });
    }

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
}