'use client';
import React from 'react';
import { Button } from '../ui/button';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Toaster } from 'sonner';

type THEME = 'light' | 'dark';
export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const toogle = () => {
    switch (theme as THEME) {
      case 'dark':
        setTheme('light');
        break;
      case 'light':
        setTheme('dark');
        break;
    }
  };
  return (
    <Button onClick={toogle} variant="outline" className="w-full py-6">
      {(theme as THEME) == 'light' ? <Moon /> : <Sun />}
      <span>Tema {(theme as THEME) == 'light' ? 'Claro' : 'Escuro'}</span>
      <Toaster theme={theme as "dark"|"light"|"system"}/>
    </Button>
  );
}
