import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import WikiForm from '../wiki-form';
import { auth } from '@clerk/nextjs/server';

export default async function NewWikiPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const staff = await prisma.staff.findUnique({ where: { userId } });
  if (!staff || staff.permission !== 'ADMIN') {
    redirect('/');
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Create New Wiki</h1>
      <WikiForm />
    </div>
  );
}
