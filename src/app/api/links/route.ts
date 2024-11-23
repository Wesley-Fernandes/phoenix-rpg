import { NextResponse } from 'next/server';
import links from '@/components/Navbar/links.json';
import database from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

interface LinkProps {
  label: string;
  href: string;
}
export interface linksArrayProps {
  unauthenticated?: LinkProps[];
  user?: LinkProps[];
  moderator?: LinkProps[];
  administrator?: LinkProps[];
}
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

    let data: linksArrayProps = { user: links.authenticated };

    if (permissionLevel === 'MODERATOR' || permissionLevel === 'ADMIN') {
      data.moderator = links.MODERATOR;
    }

    if (permissionLevel === 'ADMIN') {
      data.administrator = links.ADMINISTRATOR;
    }

    return NextResponse.json({ links: data });
  } catch (error) {
    console.error('Error fetching user links:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
