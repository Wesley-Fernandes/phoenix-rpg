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

  const page = parseInt(request.nextUrl.searchParams.get('page') || '1');
  const pageSize = 10;

  try {
    const records = await database.record.findMany({
      where: { approved: 'PENDING' },
      orderBy: { createdAt: 'asc' },
      take: pageSize,
      skip: (page - 1) * pageSize,
    });

    const totalRecords = await database.record.count({
      where: { approved: 'PENDING' },
    });

    console.log(records);

    return NextResponse.json({
      records,
      totalPages: Math.ceil(totalRecords / pageSize),
      currentPage: page,
    });
  } catch (error) {
    console.error('Error fetching pending records:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
