'use client';
import { NavbarContainer } from './NavbarContainer';
import { NavbarMenus } from './NavbarMenus';

export default function Navbar() {
  return (
    <NavbarContainer>
      <div className="flex items-center gap-2">
        <NavbarMenus />
      </div>
    </NavbarContainer>
  );
}
