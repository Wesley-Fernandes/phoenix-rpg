import { NextResponse } from 'next/server';
import database from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const staffMember = await database.staff.findUnique({
      where: { userId },
    });

    const permissionLevel = staffMember ? staffMember.permission : 'USER';

    return NextResponse.json({ permissionLevel });
  } catch (error) {
    console.error('Error fetching user permission:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
