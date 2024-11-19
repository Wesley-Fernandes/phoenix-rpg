'use client';
import Equipament from '@/components/Equipament';
import { Button } from '@/components/ui/button';
import { equipament_list } from '@/constants/equipament';
import { ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

export default function Page() {
  const { eqpId, id } = useParams();
  const equipament = equipament_list.filter((item) => item.id === eqpId)[0];
  const { push } = useRouter();
  const goBack = () => {
    push(`/profile/${id}`);
  };
  return (
    <main className="screen p-1 flex flex-col sm:items-center justify-center">
      <div className="sm:w-96 py-1">
        <Button size="icon" onClick={goBack}>
          <ArrowLeft />
        </Button>
      </div>
      <Equipament equipament={equipament} />
    </main>
  );
}
