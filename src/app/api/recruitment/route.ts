import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import database from '@/lib/prisma';
import { NextApiRequest } from 'next';
import parser from '@/lib/api-tool';

export async function POST(request: NextApiRequest) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { aminoLink, questions, comment } = await parser(request.body);

    const recruitment = await database.recruitment.create({
      data: {
        creatorId: userId,
        aminoLink,
        questions,
        comment,
      },
    });

    return NextResponse.json(recruitment, { status: 201 });
  } catch (error) {
    console.error('Error creating recruitment:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextApiRequest) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const recruitments = await database.recruitment.findMany({
      orderBy: {
        creatorAt: 'desc',
      },
    });

    return NextResponse.json(recruitments);
  } catch (error) {
    console.error('Error fetching recruitments:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextApiRequest) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if the user has admin permissions
    const staffMember = await database.staff.findUnique({
      where: { userId },
    });

    if (!staffMember || staffMember.permission !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await database.recruitment.deleteMany({});

    return NextResponse.json({
      message: 'All recruitments deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting recruitments:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
