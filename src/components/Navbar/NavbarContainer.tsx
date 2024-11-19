import Link from 'next/link';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
export function NavbarContainer({ children }: Props) {
  return (
    <header className="flex h-14 border-b px-2 items-center justify-between">
      <h1 className="font-black uppercase">
        <Link href="/">Phoenix</Link>
      </h1>
      {children}
    </header>
  );
}
