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

interface Record {
  id: string;
  name: string;
  race: string;
  age: number;
}

export default function RecordReviewList() {
  const [records, setRecords] = useState<Record[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  useEffect(() => {
    fetchRecords();
  }, [currentPage]);

  async function fetchRecords() {
    try {
      const response = await fetch(`/api/records/pending?page=${currentPage}`);
      if (!response.ok) throw new Error('Failed to fetch records');
      const data = await response.json();
      setRecords(data.records);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching records:', error);
      toast('Falha ao carregar as fichas pendentes.');
    }
  }

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

      // Remove the reviewed record from the list
      setRecords(records.filter((record) => record.id !== id));

      if (records.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        fetchRecords();
      }
    } catch (error) {
      console.error('Error reviewing record:', error);
      toast('Falha ao revisar a ficha.');
    }
  }

  return (
    <div className="space-y-6">
      {records.map((record) => (
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
      {records.length === 0 && (
        <p className="text-center">Não há fichas pendentes para revisão.</p>
      )}
      <div className="flex justify-center space-x-2 mt-4">
        <Button
          onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </Button>
        <Button
          onClick={() =>
            setCurrentPage((page) => Math.min(totalPages, page + 1))
          }
          disabled={currentPage === totalPages}
        >
          Próxima
        </Button>
      </div>
    </div>
  );
}
