import database from '@/lib/prisma';
import { NextResponse } from 'next/server';


type ParamsProp = {
  params: Promise<{ id: string }>
}
export async function GET(
  request: Request,
  { params }:ParamsProp
) {
  try {
    const { id } = await params;
    const record = await database.record.findUnique({
      where: { id },
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

    return NextResponse.json(record);
  } catch (error) {
    console.error('Error fetching public record:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

