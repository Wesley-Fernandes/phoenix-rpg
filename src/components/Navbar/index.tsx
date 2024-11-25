'use client';
import { Toaster } from 'sonner';
import { NavbarContainer } from './NavbarContainer';
import { NavbarMenus } from './NavbarMenus';
import { useTheme } from 'next-themes';

export default function Navbar() {
  const { theme } = useTheme();
  return (
    <NavbarContainer>
      <div className="flex items-center gap-2">
        <NavbarMenus />
        <Toaster theme={theme as 'dark' | 'light' | 'system'} />
      </div>
    </NavbarContainer>
  );
}
