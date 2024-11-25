import { NextRequest, NextResponse } from 'next/server';
import database from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function GET(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await database.staff.findUnique({
    where: { userId },
  });

  if (
    !user ||
    (user.permission !== 'MODERATOR' && user.permission !== 'ADMIN')
  ) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const records = await database.record.findMany({
      where: { approved: 'PENDING' },
      orderBy: { createdAt: 'asc' },
      take: 10,
    });

    return NextResponse.json(records);
  } catch (error) {
    console.error('Error fetching pending records:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
