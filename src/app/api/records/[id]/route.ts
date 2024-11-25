import database from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

async function getUserPermission(userId: string) {
  const staff = await database.staff.findUnique({
    where: { userId },
  });
  return staff?.permission || 'USER';
}

type ParamsProp = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: ParamsProp) {
  const { id } = await params;
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const record = await database.record.findUnique({
      where: { id },
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

export async function PUT(request: Request, { params }: ParamsProp) {
  const { userId } = await auth();
  const { id } = await params;
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const existingRecord = await database.record.findUnique({
      where: { id },
    });

    if (!existingRecord) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    const userPermission = await getUserPermission(userId);
    if (
      existingRecord.creatorId !== userId &&
      !['MODERATOR', 'ADMIN'].includes(userPermission)
    ) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    if (
      existingRecord.approved &&
      (JSON.stringify(body.powers) !== JSON.stringify(existingRecord.powers) ||
        JSON.stringify(body.skills) !== JSON.stringify(existingRecord.skills))
    ) {
      body.approved = 'PENDING';
    }

    const record = await database.record.update({
      where: { id },
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

export async function DELETE(request: Request, { params }: ParamsProp) {
  const { userId } = await auth();
  const { id } = await params;
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const record = await database.record.findUnique({
      where: { id },
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
      where: { id },
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
