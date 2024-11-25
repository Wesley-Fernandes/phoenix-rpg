'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Record } from '@prisma/client';
import { Edit, Eye, Trash2 } from 'lucide-react';

export default function RecordList() {
  const [records, setRecords] = useState<Record[]>([]);

  useEffect(() => {
    async function fetchRecords() {
      const response = await fetch('/api/records');
      const data = await response.json();
      setRecords(data);
    }
    fetchRecords();
  }, []);

  async function deleteRecord(id: string) {
    if (confirm('Tem certeza que deseja excluir esta ficha?')) {
      await fetch(`/api/records/${id}`, { method: 'DELETE' });
      setRecords(records.filter((record) => record.id !== id));
    }
  }

  return (
    <div className="space-y-6">
      <Link href="/user/record/new">
        <Button>Criar Nova Ficha</Button>
      </Link>
      {records.map((record) => (
        <Card key={record.id}>
          <CardHeader>
            <CardTitle>{record.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Raça: {record.race}</p>
            <p>Idade: {record.age}</p>
            <p>Status: {record.approved ? 'Aprovado' : 'Pendente'}</p>
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
