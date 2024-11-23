import { NextResponse } from 'next/server';
import links from '@/components/Navbar/links.json';
import { PrismaClient } from '@prisma/client';
import database from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ links: links.unauthenticated });
  }

  try {
    const staffMember = await database.staff.findUnique({
      where: { userId },
    });

    const permissionLevel = staffMember ? staffMember.permission : 'USER';

    let userLinks = [...links.authenticated];

    if (permissionLevel === 'MODERATOR' || permissionLevel === 'ADMIN') {
      userLinks = [...userLinks, ...links.MODERATOR];
    }

    if (permissionLevel === 'ADMIN') {
      userLinks = [...userLinks, ...links.ADMINISTRATOR];
    }

    return NextResponse.json({ links: userLinks });
  } catch (error) {
    console.error('Error fetching user links:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
