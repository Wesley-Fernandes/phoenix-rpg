import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '../ui/button';
import { Menu } from 'lucide-react';

export function NavbarMenus() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu logado</SheetTitle>
          <SheetDescription>
            Quando você está logado, têm acesso a esse menu.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
