'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Badge } from '../ui/badge';
import { EquipamentType } from '@/constants/equipament';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

export default function Equipament({
  equipament,
  id,
}: {
  equipament: EquipamentType;
  id: string;
}) {
  const { push } = useRouter();

  const goToBack = () => {
    push(`/profile/${id}`);
  };
  return (
    <Card className="w-full sm:max-w-96 h-fit">
      <CardHeader>
        <CardTitle>{equipament.title}</CardTitle>
        <div className="h-40 w-full border-4">
          <img
            src={equipament.picture}
            alt="equipament-image"
            className="h-full w-full object-cover"
          />
        </div>
        <CardDescription>{equipament.description}</CardDescription>
        <div className="w-full flex justify-end">
          <Badge variant="secondary" className="w-fit">
            {equipament.rarity}
          </Badge>
        </div>
        <CardContent>
          <ul>
            {equipament.status.map((prop, index) => {
              return <li key={index}>{prop.description}</li>;
            })}
          </ul>
        </CardContent>
        <CardFooter className="flex flex-col">
          <small className="text-red-600">
            Usuarios abaixo do nivel {equipament.requirements.level} e que não
            sejam da classe {equipament.requirements.classe} não têm poder
            suficiente para utilizar.
          </small>
          <Button className="w-full mt-4" onClick={goToBack}>
            Voltar
          </Button>
        </CardFooter>
      </CardHeader>
    </Card>
  );
}
