import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { NextApiRequest } from 'next';
import database from '@/lib/prisma';
import parser from '@/lib/api-tool';

async function isAdmin(userId: string) {
  const staff = await database.staff.findUnique({
    where: { userId },
  });
  return staff?.permission === 'ADMIN';
}

export async function GET(req: NextApiRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId || !(await isAdmin(userId))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const staffMembers = await database.staff.findMany();
    return NextResponse.json(staffMembers);
  } catch (error) {
    console.error('Error fetching staff members:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextApiRequest) {
  try {
    /*
    const { userId } = getAuth(req)
    if (!userId || !(await isAdmin(userId))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    */

    const body = await parser(req.body);
    console.log(body);
    const { name, permission, userId } = body;
    const staff = await database.staff.create({
      data: { userId, name, permission },
    });
    return NextResponse.json(staff, { status: 201 });
  } catch (error) {
    console.error('Error creating staff member:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextApiRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId || !(await isAdmin(userId))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, name, permission } = await req.body;
    const staff = await database.staff.update({
      where: { id },
      data: { name, permission },
    });
    return NextResponse.json(staff);
  } catch (error) {
    console.error('Error updating staff member:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextApiRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId || !(await isAdmin(userId))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await req.body;
    await database.staff.delete({ where: { id } });
    return NextResponse.json({ message: 'staff member deleted successfully' });
  } catch (error) {
    console.error('Error deleting staff member:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
