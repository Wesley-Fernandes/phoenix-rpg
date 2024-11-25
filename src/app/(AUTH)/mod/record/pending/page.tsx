import { redirect } from 'next/navigation';
import database from '@/lib/prisma';
import RecordReviewList from './record-view-list';
import { auth } from '@clerk/nextjs/server';

async function getUserPermission(userId: string) {
  const staff = await database.staff.findUnique({
    where: { userId },
  });
  return staff?.permission || 'USER';
}

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const userPermission = await getUserPermission(userId);
  if (!['MODERATOR', 'ADMIN'].includes(userPermission)) {
    redirect('/');
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Fichas Pendentes</h1>
      <RecordReviewList />
    </div>
  );
}
