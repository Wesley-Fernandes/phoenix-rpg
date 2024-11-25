import { getAuth } from '@clerk/nextjs/server';
import database from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { aminoLink, questions, comment } = await request.json();

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

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const recruitments = await database.recruitment.findMany({
      where: {
        creatorId: userId,
      },
      select: {
        id: true,
      },
    });

    return NextResponse.json({
      participating: recruitments.length > 1 ? true : false,
    });
  } catch (error) {
    console.error('Error fetching recruitments:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
