import { notFound, redirect } from 'next/navigation';
import RecordForm from '../record-form';
import { Prisma } from '@prisma/client';
import { auth } from '@clerk/nextjs/server';
import database from '@/lib/prisma';

type PageProps = {
  params: Promise<{ id: string }>;
};
export default async function EditRecordPage({ params }: PageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const record = await database.record.findUnique({
    where: { id },
  });

  if (!record || record.creatorId !== userId) {
    redirect('/user/record');
  }

  const safeRecord: Prisma.RecordGetPayload<{}> = {
    ...record,
    powers: Array.isArray(record.powers) ? record.powers : [],
    skills: Array.isArray(record.skills) ? record.skills : [],
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    reviewedBy: record.reviewedBy,
    reviewedAt: record.reviewedAt,
  };

  return (
    <main className="screen container mx-auto py-10 overflow-y-auto px-2">
      <h1 className="text-3xl font-bold mb-6">Editar Ficha</h1>
      <RecordForm initialData={safeRecord} />
    </main>
  );
}
