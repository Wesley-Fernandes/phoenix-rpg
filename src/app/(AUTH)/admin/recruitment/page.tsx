'use client';
import RecruitmentList from './recruitment-list';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { Recruitment } from '@prisma/client';
import { toast } from 'sonner';

async function getRecruitments() {
  const request = await fetch('/api/recruitment', {
    headers: { Accept: 'application/json' },
  });
  console.log(request);
  return await request.json();
}

export default function RecruitmentPage() {
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ['users-recruitments'],
    queryFn: async () => {
      const request = await fetch('/api/admin/recruitment', {
        headers: { Accept: 'application/json' },
      });

      const response = await request.json();
      return response as Recruitment[];
    },
  });

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (isError) {
    return <p>Ocorreu um erro ao carregar os dados.</p>;
  }

  if (!data || data.length < 1) {
    return <p>Sem recrutados, tente novamente.</p>;
  }

  const deleteAll = async () => {
    const request = await fetch('/api/admin/recruitment', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (request.ok) {
      toast.success('Todos os candidatos ao recrutamento foram excluídos.');
      refetch();
    } else {
      toast.error('Ocorreu um erro ao excluir os candidatos ao recrutamento.');
    }
  };

  return (
    <main className="screen overflow-y-auto">
      <header className="h-14 flex items-center justify-between px-2">
        <h1 className="text-lg font-bold mb-6 text-center">
          Candidatos ao Recrutamento
        </h1>
        <div className="flex gap-3">
          <Button variant="secondary">Desativar</Button>
          <Button variant="destructive" onClick={deleteAll}>
            Deletar todos
          </Button>
        </div>
      </header>
      <section className="container mx-auto py-10">
        <RecruitmentList recruitments={data} />
      </section>
    </main>
  );
}
