import { redirect } from 'next/navigation';
import StaffManagement from './staff-management';
import database from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

async function isAdmin(userId: string) {
  const staff = await database.staff.findUnique({
    where: { userId },
  });
  return staff?.permission === 'ADMIN';
}

async function getStaffMembers() {
  return await database.staff.findMany();
}

export default async function StaffPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect('/sign-in');
  }

  const isUserAdmin = await isAdmin(userId);
  if (!isUserAdmin) {
    redirect('/');
  }

  const staffMembers = await getStaffMembers();

  return (
    <main className="container mx-auto screen pt-8 pb-1 overflow-y-auto">
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-lg font-bold text-center uppercase">
          Gerenciamento de Staff
        </h1>
        <small>Somente lideres podem acessar</small>
      </div>
      <StaffManagement initialStaffMembers={staffMembers} />
    </main>
  );
}
