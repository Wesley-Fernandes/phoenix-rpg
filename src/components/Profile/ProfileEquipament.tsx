import React from 'react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import Link from 'next/link';

export function ProfileEquipament({ id }: { id: string }) {
  return (
    <AccordionItem value="equip-info">
      <AccordionTrigger className="font-black uppercase">
        Equipamentos
      </AccordionTrigger>
      <AccordionContent className="flex flex-col">
        <span>
          <strong>Elmo: </strong>
          <Link href="#" className="text-red-600">
            N/A
          </Link>
        </span>
        <span>
          <strong>Armadura: </strong>
          <Link
            href={`/profile/${id}/equipament/berserk-armour`}
            className="text-blue-500"
          >
            Berserk armour
          </Link>
        </span>
        <span>
          <strong>Arma: </strong>
          <Link
            href={`/profile/${id}/equipament/DragonSlayer-sword`}
            className="text-blue-500"
          >
            Dragon slayer
          </Link>
        </span>
        <span>
          <strong>Escudo: </strong>{' '}
          <Link href="#" className="text-red-600">
            N/A
          </Link>
        </span>
      </AccordionContent>
    </AccordionItem>
  );
}
