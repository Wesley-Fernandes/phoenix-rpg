import React from 'react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { ProfileBackpackItem } from './ProfileBackpackItem';

export function ProfileBackpack({ id }: { id: string }) {
  return (
    <AccordionItem value="backpack-info">
      <AccordionTrigger className="font-black uppercase">
        Mochila - 1/5
      </AccordionTrigger>
      <AccordionContent className="grid grid-cols-3 sm:grid-cols-4">
        <ProfileBackpackItem id={id} />
      </AccordionContent>
    </AccordionItem>
  );
}
