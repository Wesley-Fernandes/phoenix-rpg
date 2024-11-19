'use client';
import React from 'react';
import { Button } from '../ui/button';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

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
    <Button onClick={toogle} variant="outline" size="icon">
      {(theme as THEME) == 'light' ? <Moon /> : <Sun />}
    </Button>
  );
}
