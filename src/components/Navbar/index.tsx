'use client';
import { NavbarContainer } from './NavbarContainer';
import { Button } from '../ui/button';
import { ThemeSwitcher } from '../Theme/ThemeSwitcher';
import { useState } from 'react';

export default function Navbar() {
  const [logged, setLogged] = useState(true);
  return (
    <NavbarContainer>
      <div className="flex items-center gap-2">
        <ThemeSwitcher />
        {logged ? (
          <></>
        ) : (
          <Button variant="outline" disabled>
            Login
          </Button>
        )}
      </div>
    </NavbarContainer>
  );
}
