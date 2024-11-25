import { redirect } from 'next/navigation';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { auth } from '@clerk/nextjs/server';

async function getWikis() {
  return await prisma.wiki.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export default async function WikiListPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const staff = await prisma.staff.findUnique({ where: { userId } });
  if (!staff || staff.permission !== 'ADMIN') {
    redirect('/');
  }

  const wikis = await getWikis();

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Wiki Management</h1>
        <Link href="/admin/wiki/new">
          <Button>Create New Wiki</Button>
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {wikis.map((wiki) => (
          <Card key={wiki.id}>
            <CardHeader>
              <CardTitle>{wiki.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Category: {wiki.category}</p>
              <p>Created: {wiki.createdAt.toLocaleDateString()}</p>
              <div className="mt-4 space-x-2">
                <Link href={`/admin/wiki/${wiki.id}`}>
                  <Button variant="outline">Edit</Button>
                </Link>
                <Link href={`/wiki/${wiki.id}`}>
                  <Button variant="secondary">View</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
