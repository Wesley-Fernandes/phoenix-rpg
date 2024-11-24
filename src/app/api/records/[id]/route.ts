import database from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

async function getUserPermission(userId: string) {
  const staff = await database.staff.findUnique({
    where: { userId },
  });
  return staff?.permission || 'USER';
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const record = await database.record.findUnique({
      where: { id: params.id },
    });

    if (!record) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    const userPermission = await getUserPermission(userId);
    if (
      record.creatorId !== userId &&
      !['MODERATOR', 'ADMINISTRATOR'].includes(userPermission)
    ) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json(record);
  } catch (error) {
    console.error('Error fetching record:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const existingRecord = await database.record.findUnique({
      where: { id: params.id },
    });

    if (!existingRecord) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    const userPermission = await getUserPermission(userId);
    if (
      existingRecord.creatorId !== userId &&
      !['MODERATOR', 'ADMINISTRATOR'].includes(userPermission)
    ) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Check if powers or skills have changed and the record was previously approved
    if (
      existingRecord.approved &&
      (JSON.stringify(body.powers) !== JSON.stringify(existingRecord.powers) ||
        JSON.stringify(body.skills) !== JSON.stringify(existingRecord.skills))
    ) {
      body.approved = false;
    }

    const record = await database.record.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json(record);
  } catch (error) {
    console.error('Error updating record:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const record = await database.record.findUnique({
      where: { id: params.id },
    });

    if (!record) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    const userPermission = await getUserPermission(userId);
    if (
      record.creatorId !== userId &&
      !['MODERATOR', 'ADMINISTRATOR'].includes(userPermission)
    ) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await database.record.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error deleting record:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}