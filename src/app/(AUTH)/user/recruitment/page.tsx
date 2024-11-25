import React from 'react';
import RecruitmentForm from './recruitment-form';
import database from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const getUserPermission = async (creatorId: string) => {
  const recruitments = await database.recruitment.findMany({
    where: {
      creatorId,
    },
    select: {
      id: true,
    },
  });

  return recruitments.length > 0;
};
export default async function page() {
  const { userId } = await auth();
  if (!userId) {
    redirect('/sign-in');
  }
  const request = await getUserPermission(userId);

  if (request) {
    return (
      <main className="screen flex items-center justify-center">
        <p className="font-bold text-2xl">
          Você já está participando do recrutamento.
        </p>
      </main>
    );
  }
  return (
    <main className="screen overflow-y-scroll">
      <RecruitmentForm />
    </main>
  );
}
