import database from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const staff = await database.staff.findUnique({ where: { userId } });
  if (!staff || staff.permission !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { title, category, content } = await request.json();

  try {
    const wiki = await database.wiki.create({
      data: {
        title,
        category,
        content,
        creatorId: userId,
      },
    });
    return NextResponse.json(wiki, { status: 201 });
  } catch (error) {
    console.error('Error creating wiki:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    const wiki = await database.wiki.findUnique({ where: { id } });
    if (!wiki) {
      return NextResponse.json({ error: 'Wiki not found' }, { status: 404 });
    }
    return NextResponse.json(wiki);
  } else {
    const wikis = await database.wiki.findMany();
    return NextResponse.json(wikis);
  }
}

export async function PUT(request: NextRequest) {
  const { userId } = await auth();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id') as string;

  if (!id) {
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
  }
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const staff = await database.staff.findUnique({ where: { userId } });
  if (!staff || staff.permission !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { title, category, content } = await request.json();
  console.log({ title, category, content });

  try {
    const updatedWiki = await database.wiki.update({
      where: { id },
      data: { title, category, content, updatedAt: new Date() },
    });
    return NextResponse.json(updatedWiki);
  } catch (error) {
    console.error('Error updating wiki:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const staff = await database.staff.findUnique({ where: { userId } });
  if (!staff || staff.permission !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Wiki ID is required' }, { status: 400 });
  }

  try {
    await database.wiki.delete({ where: { id } });
    return NextResponse.json({ message: 'Wiki deleted successfully' });
  } catch (error) {
    console.error('Error deleting wiki:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
