import React from 'react';
import { NavbarContainer } from './NavbarContainer';
import { Button } from '../ui/button';
import { ThemeSwitcher } from '../Theme/ThemeSwitcher';

export default function Navbar() {
  return (
    <NavbarContainer>
      <div className="flex items-center gap-2">
        <ThemeSwitcher />
        <Button variant="outline" disabled>
          Login
        </Button>
      </div>
    </NavbarContainer>
  );
}
