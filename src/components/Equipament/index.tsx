import React from 'react';
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

export default function Equipament({
  equipament,
}: {
  equipament: EquipamentType;
}) {
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
          <Badge className="w-fit">{equipament.rarity}</Badge>
        </div>
        <CardContent>
          <ul>
            {equipament.status.map((prop, index) => {
              return <li key={index}>{prop.description}</li>;
            })}
          </ul>
        </CardContent>
        <CardFooter>
          <small className="text-red-600">
            Usuarios abaixo do nivel {equipament.requirements.level} e que não
            sejam da classe {equipament.requirements.classe} não têm poder
            suficiente para utilizar.
          </small>
        </CardFooter>
      </CardHeader>
    </Card>
  );
}
