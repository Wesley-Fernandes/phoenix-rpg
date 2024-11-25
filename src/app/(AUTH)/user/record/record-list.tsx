'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Record } from '@prisma/client';
import { Edit, Eye, Plus, Trash2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

export default function RecordList() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['user-records'],
    queryFn: async () => {
      const response = await fetch('/api/records');
      const data = await response.json();
      return data as Record[];
    },
  });

  async function deleteRecord(id: string) {
    if (confirm('Tem certeza que deseja excluir esta ficha?')) {
      await fetch(`/api/records/${id}`, { method: 'DELETE' });
      refetch();
    }
  }

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (isError || !data) {
    return (
      <p>Houve um erro ao carregar as fichas. Tente novamente mais tarde.</p>
    );
  }

  if (data.length < 1) {
    return <p>Você não possui fichas cadastradas.</p>;
  }

  return (
    <div className="space-y-6">
      <Link href="/user/record/new">
        <Button size="icon">
          <Plus />
        </Button>
      </Link>
      {data.map((record) => (
        <Card key={record.id}>
          <CardHeader>
            <CardTitle className="text-2xl">{record.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Raça:</strong> {record.race}
            </p>
            <p>
              <strong>Idade:</strong> {record.age}
            </p>
            <p>
              <strong>Status:</strong> {record.approved}
            </p>
            <div className="mt-4 justify-end gap-6 flex items-center">
              <Link href={`/user/record/${record.id}`}>
                <Button variant="outline" size="icon">
                  <Edit />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="icon"
                onClick={() => deleteRecord(record.id)}
              >
                <Trash2 />
              </Button>
              <Link href={`/character/${record.id}`}>
                <Button variant="outline" size="icon">
                  <Eye />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
