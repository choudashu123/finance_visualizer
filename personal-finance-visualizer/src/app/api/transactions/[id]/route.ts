import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongo';

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: 'Transaction ID is required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'finance');

    const filter = ObjectId.isValid(id)
      ? { _id: new ObjectId(id) }
      : { id };

    const result = await db.collection('transactions').deleteOne(filter);

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
