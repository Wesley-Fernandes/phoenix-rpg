'use client';

import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface LinkItem {
  label: string;
  href: string;
}

export default function Links() {
  const { isSignedIn } = useAuth();
  const [links, setLinks] = useState<LinkItem[]>([]);

  useEffect(() => {
    async function fetchLinks() {
      const response = await fetch('/api/links');
      const data = await response.json();
      setLinks(data.links);
    }

    fetchLinks();
  }, [isSignedIn]);

  if (!isSignedIn) {
    return (
      <ul className="flex flex-col w-full gap-1 py-2">
        {links.map((link, index) => (
          <li
            key={index}
            className="py-1 w-full hover:bg-blue-300 hover:cursor-pointer border-transparent hover:border-blue-800 dark:hover:bg-blue-600 border-l-4 indent-1 rounded-r-xl"
          >
            <Link className="flex" href={link.href}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <Accordion
      type="multiple"
      className="w-full border mt-6 mb-2 p-1 bg-secondary shadow"
    >
      <AccordionItem value="links">
        <AccordionTrigger>Menu</AccordionTrigger>
        <AccordionContent>
          <ul className="flex flex-col w-full gap-1 py-2">
            {links.map((link, index) => (
              <li
                key={index}
                className="py-1 w-full hover:bg-blue-300 hover:cursor-pointer border-transparent hover:border-blue-800 dark:hover:bg-blue-600 border-l-4 indent-1 rounded-r-xl"
              >
                <Link className="flex" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
