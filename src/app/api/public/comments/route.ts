import database from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { content, wikiId } = await request.json();

  try {
    const user = await database.staff.findUnique({ where: { userId } });
    const authorName = user ? user.name : 'Anonymous';

    const comment = await database.comment.create({
      data: {
        content,
        authorId: userId,
        authorName,
        contentId: wikiId,
      },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
