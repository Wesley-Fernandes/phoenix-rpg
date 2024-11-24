import database from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const record = await database.record.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        name: true,
        race: true,
        aminoLink: true,
        photo: true,
        age: true,
        height: true,
        weight: true,
        gender: true,
        fisionomy: true,
        history: true,
        powers: true,
        skills: true,
        approved: true,
      },
    });

    if (!record) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    if (!record.approved) {
      return NextResponse.json({ error: 'This character sheet is not yet approved' }, { status: 403 });
    }

    return NextResponse.json(record);
  } catch (error) {
    console.error('Error fetching public record:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

