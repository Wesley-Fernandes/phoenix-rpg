import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container mx-auto py-10 text-center">
      <h2 className="text-3xl font-bold mb-4">Ficha não encontrada</h2>
      <p className="mb-6">
        Desculpe, não foi possível encontrar a ficha que você está procurando.
      </p>
      <Button asChild>
        <Link href="/">Voltar para a página inicial</Link>
      </Button>
    </div>
  );
}
