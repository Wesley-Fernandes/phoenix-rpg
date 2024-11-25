import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import WikiForm from '../wiki-form';
import { auth } from '@clerk/nextjs/server';
type PageProps = {
  params: Promise<{ id: string }>;
};
export default async function EditWikiPage({ params }: PageProps) {
  const { id } = await params;
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const staff = await prisma.staff.findUnique({ where: { userId } });
  if (!staff || staff.permission !== 'ADMIN') {
    redirect('/');
  }

  const wiki = await prisma.wiki.findUnique({
    where: { id },
  });

  if (!wiki) {
    redirect('/admin/wiki');
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Editar wiki</h1>
      <WikiForm initialData={wiki} />
    </div>
  );
}
