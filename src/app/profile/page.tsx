'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export default function page() {
  const { back } = useRouter();
  return (
    <main className="screen flex items-center justify-center p-1">
      <Card className="w-80">
        <CardHeader>
          <CardTitle className="font-bold uppercase text-blue-600">
            Pagina não encontrada - 404
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            A pagina solicitada não existe. Por favor, verifique novamente ou
            entre em contato com o suporte.
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={back}>
            Retonar a pagina anterior
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
