import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongo';


export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'finance');

    // Create proper filter based on ID type
    const filter = ObjectId.isValid(params.id)
      ? { _id: new ObjectId(params.id) }
      : { _id: params.id };

    const result = await db.collection('transactions').deleteOne({_id: params.id as any});

    if (result.deletedCount === 1) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
    
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Failed to delete transaction' },
      { status: 500 }
    );
  }
}