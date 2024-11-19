import React from 'react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

export function ProfileBasic({ id }: { id: string }) {
  return (
    <AccordionItem value="basic-info">
      <AccordionTrigger className="font-black uppercase">
        Informações basicas
      </AccordionTrigger>
      <AccordionContent className="flex flex-col text-secondary-foreground/60">
        <span>
          <strong>HP: </strong> 5000/100000
        </span>
        <span>
          <strong>MP: </strong> 40/500
        </span>
        <span>
          <strong>LV: </strong> 185
        </span>
        <span>
          <strong>XP: </strong> 142312/182312
        </span>
        <span>
          <strong>Classe: </strong> Paladino
        </span>
      </AccordionContent>
    </AccordionItem>
  );
}
