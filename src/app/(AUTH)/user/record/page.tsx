import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import RecordList from './record-list';

export default async function RecordPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Minhas Fichas</h1>
      <RecordList />
    </div>
  );
}
