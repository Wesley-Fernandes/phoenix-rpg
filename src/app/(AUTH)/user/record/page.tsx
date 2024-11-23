import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CalendarDays, Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function page() {
  return (
    <main className="screen">
      <header className="h-14 border-b flex items-center justify-end px-2">
        <Link
          className={buttonVariants({ variant: 'outline', size: 'icon' })}
          href="/record/create"
        >
          <Plus />
        </Link>
      </header>
      <ul className="p-1 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <li className="col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center w-full justify-between">
                <span>Guts</span>
                <Badge className="bg-green-500 hover:bg-green-700 uppercase font-black">
                  Aprovado
                </Badge>
              </CardTitle>
              <div className="h-28 w-full border-4">
                <img
                  className="h-full w-full object-cover"
                  src="https://i.ibb.co/YQ1mBpm/guts-rain.gif"
                  alt="profile-picture"
                />
              </div>
              <CardDescription>
                Guts é um ex-mercenário e integrante do Bando do Falcão,
                atualmente um viajante com a marca do sacrifício no qual viaja
                pelo mundo em constantes conflitos entre alcançar seus objetivos
                e zelar pelos próximos a ele.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-col items-start">
              <div className="flex items-center gap-1 opacity-70 text-xs">
                <CalendarDays size={18} />
                Ultima atualização em <span>14/11/24</span>
              </div>
              <div className="flex items-center pt-2 w-full">
                <Link
                  href="/profile/1"
                  className={buttonVariants({
                    variant: 'outline',
                    className: 'w-full',
                  })}
                >
                  Ir para ficha
                </Link>
              </div>
            </CardFooter>
          </Card>
        </li>
      </ul>
    </main>
  );
}
