'use client';
import { useEffect, useState } from 'react';
import RecruitmentList from './recruitment-list';
import { Button } from '@/components/ui/button';

async function getRecruitments() {
  const request = await fetch('/api/recruitment', {
    headers: { Accept: 'application/json' },
  });
  console.log(request);
  return await request.json();
}

export default function RecruitmentPage() {
  const [recruitments, setRecruitments] = useState([]);

  useEffect(() => {
    async function getRecruitments() {
      const request = await fetch('/api/recruitment', {
        headers: { Accept: 'application/json' },
      });

      const response = await request.json();
      setRecruitments(response);
    }

    getRecruitments();
  }, []);

  return (
    <main className="screen overflow-y-auto">
      <header className="h-14 flex items-center justify-between px-2">
        <h1 className="text-lg font-bold mb-6 text-center">
          Candidatos ao Recrutamento
        </h1>
        <div className="flex gap-3">
          <Button variant="secondary">Desativar</Button>
          <Button variant="destructive">Deletar todos</Button>
        </div>
      </header>
      <section className="container mx-auto py-10">
        <RecruitmentList recruitments={recruitments} />
      </section>
    </main>
  );
}
