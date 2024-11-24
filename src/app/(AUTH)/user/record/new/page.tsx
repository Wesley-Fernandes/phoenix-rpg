import { redirect } from 'next/navigation';
import RecordForm from '../record-form';
import { auth } from '@clerk/nextjs/server';

export default async function NewRecordPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Criar Nova Ficha</h1>
      <RecordForm />
    </div>
  );
}
