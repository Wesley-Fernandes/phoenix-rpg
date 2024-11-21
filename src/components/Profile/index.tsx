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
import { Button, buttonVariants } from '../ui/button';
import { User } from 'lucide-react';
import { Badge } from '../ui/badge';
import Link from 'next/link';

export default function Profile({ id }: { id: string }) {
  const { back, push } = useRouter();
  const goToCreator = () => {
    push('/');
  };
  return (
    <Card className="w-full sm:max-w-96 h-fit mt-4">
      <CardHeader>
        <CardTitle className="flex items-center w-full justify-between">
          Guts
          <Badge className="bg-green-500 uppercase font-black">Aprovado</Badge>
        </CardTitle>
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
        <Link
          href="http://aminoapps.com/p/hswe22"
          className={buttonVariants({ variant: 'outline', size: 'icon' })}
        >
          <User />
        </Link>
      </CardFooter>
    </Card>
  );
}
