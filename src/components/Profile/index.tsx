'use client';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { ProfileBasic } from './ProfileBasic';
import { ProfileEquipament } from './ProfileEquipament';
import { ProfileBackpack } from './ProfileBackpack';
import { useRouter } from 'next/navigation';
import { Accordion } from '../ui/accordion';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ArrowLeft, User } from 'lucide-react';

export default function Profile({ id }: { id: string }) {
  const { back, push } = useRouter();
  const goToCreator = () => {
    push('/');
  };
  return (
    <Card className="w-full sm:max-w-96 h-fit">
      <CardHeader>
        <CardTitle>Guts</CardTitle>
        <div className="h-28 w-full border-4">
          <img
            className="h-full w-full object-cover"
            src="https://i.ibb.co/YQ1mBpm/guts-rain.gif"
            alt="profile-picture"
          />
        </div>
        <CardDescription>
          Guts é um ex-mercenário e integrante do Bando do Falcão, atualmente um
          viajante com a marca do sacrifício no qual viaja pelo mundo em
          constantes conflitos entre alcançar seus objetivos e zelar pelos
          próximos a ele.
        </CardDescription>
        <Accordion type="single" collapsible>
          <ProfileBasic id={id} />
          <ProfileEquipament id={id} />
          <ProfileBackpack id={id} />
        </Accordion>
      </CardHeader>
      <CardFooter className="flex items-center justify-end">
        <Button
          onClick={goToCreator}
          variant="outline"
          size="icon"
          title="Ir para criador"
          disabled
        >
          <User />
        </Button>
      </CardFooter>
    </Card>
  );
}
