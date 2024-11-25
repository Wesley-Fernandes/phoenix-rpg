'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import { Repeat } from 'lucide-react';

interface Record {
  id: string;
  name: string;
  race: string;
  age: number;
}

export default function RecordReviewList() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['records-pendings'],
    queryFn: async () => {
      const response = await fetch('/api/admin/records/pending');
      const data = await response.json();
      return data as Record[];
    },
  });

  const router = useRouter();

  async function reviewRecord(id: string, action: 'APPROVED' | 'REJECTED') {
    try {
      const response = await fetch(`/api/records/${id}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ approved: action }),
      });

      if (!response.ok) throw new Error('Failed to review record');

      toast(
        `A ficha foi ${action === 'APPROVED' ? 'aprovada' : 'rejeitada'} com sucesso.`
      );

      refetch();
    } catch (error) {
      console.error('Error reviewing record:', error);
      toast('Falha ao revisar a ficha.');
    }
  }

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      {data?.map((record) => (
        <Card key={record.id}>
          <CardHeader>
            <CardTitle>{record.name}</CardTitle>
            <CardDescription>
              {record.race}, {record.age} anos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <Button onClick={() => router.push(`/mod/record/${record.id}`)}>
                Ver Detalhes
              </Button>
              <div className="space-x-2">
                <Button
                  onClick={() => reviewRecord(record.id, 'APPROVED')}
                  variant="default"
                >
                  Aprovar
                </Button>
                <Button
                  onClick={() => reviewRecord(record.id, 'REJECTED')}
                  variant="destructive"
                >
                  Rejeitar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      {data?.length === 0 && (
        <p className="text-center">Não há fichas pendentes para revisão.</p>
      )}
      <div className="flex justify-center space-x-2 mt-4">
        <Button size="icon" variant="outline" onClick={() => refetch()}>
          <Repeat />
        </Button>
      </div>
    </div>
  );
}
