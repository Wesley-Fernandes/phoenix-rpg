import React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import menu_items from '@/constants/menu';
import { MenuItem } from './MenuItem';

export function MenuCategory() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="ajuda">
        <AccordionTrigger className="font-black uppercase">
          Para novos membros
        </AccordionTrigger>
        <AccordionContent>
          <ul>
            {menu_items['ajuda'].map((i) => {
              return <MenuItem key={i.key} href={i.href} label={i.label} />;
            })}
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="plataformas">
        <AccordionTrigger className="font-black uppercase">
          Nossas plataformas
        </AccordionTrigger>
        <AccordionContent>
          <ul>
            {menu_items['plataformas'].map((i) => {
              return <MenuItem key={i.key} href={i.href} label={i.label} />;
            })}
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="sistemas">
        <AccordionTrigger className="font-black uppercase">
          Nossos sistemas
        </AccordionTrigger>
        <AccordionContent>
          <ul>
            {menu_items['sistemas'].map((i) => {
              return <MenuItem key={i.key} href={i.href} label={i.label} />;
            })}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
