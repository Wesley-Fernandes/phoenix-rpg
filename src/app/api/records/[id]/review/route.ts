import database from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

async function getUserPermission(userId: string) {
  const staff = await database.staff.findUnique({
    where: { userId },
  });
  return staff?.permission || 'USER';
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const userPermission = await getUserPermission(userId);
    if (!['MODERATOR', 'ADMINISTRATOR'].includes(userPermission)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { approved } = await request.json();

    const record = await database.record.update({
      where: { id: params.id },
      data: {
        approved,
        reviewedBy: userId,
        reviewedAt: new Date(),
      },
    });

    return NextResponse.json(record);
  } catch (error) {
    console.error('Error reviewing record:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
