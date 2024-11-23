import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import React from 'react';

export default function page() {
  return (
    <main className="screen p-1 flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle className="font-bold text-2xl">
            Administrar fichas
          </CardTitle>
          <CardDescription>
            Opções para administrar fichas dos usuarios.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col">
            <li>
              <Link href="/admin/record/search">Procurar uma fichas</Link>
            </li>
            <li>
              <Link href="/admin/record/feed">
                Ultimas solicitações de aprovação
              </Link>
            </li>
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}
