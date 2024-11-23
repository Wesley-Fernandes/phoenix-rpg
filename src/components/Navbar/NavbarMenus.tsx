import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '../ui/button';
import { Menu } from 'lucide-react';
import { ThemeSwitcher } from '../Theme/ThemeSwitcher';
import User from './User';
import Links from './Links';

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
          <SheetTitle className="hidden">Menu</SheetTitle>
        </SheetHeader>
        <div>
          <Links />
          <div className="flex gap-2 flex-col">
            <ThemeSwitcher />
            <User />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
