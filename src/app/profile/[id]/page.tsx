'use client';
import Profile from '@/components/Profile';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useParams } from 'next/navigation';

export default function page() {
  const { id } = useParams();
  return (
    <main className="screen p-1 flex sm:items-center justify-center overflow-y-auto">
      <Profile id={id as string} />
    </main>
  );
}
