'use client';
import Equipament from '@/components/Equipament';
import { Button } from '@/components/ui/button';
import { equipament_list } from '@/constants/equipament';
import { ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

export default function Page() {
  const { eqpId, id }: { eqpId: string; id: string } = useParams();
  const equipament = equipament_list.filter((item) => item.id === eqpId)[0];
  return (
    <main className="screen p-1 flex sm:items-center justify-center overflow-y-auto">
      <Equipament equipament={equipament} id={id} />
    </main>
  );
}
