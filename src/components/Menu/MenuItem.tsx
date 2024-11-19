import Link from 'next/link';
import React from 'react';

interface Props {
  href: string;
  label: string;
}
export function MenuItem({ href, label }: Props) {
  return (
    <li className="w-full hover:text-blue-500">
      <Link href={href} className="w-full">
        {label}
      </Link>
    </li>
  );
}
