'use client';

import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useQuery } from '@tanstack/react-query';
import { linksArrayProps } from '@/app/api/links/route';
import { ChevronRight } from 'lucide-react';
import links from './links.json';

export default function Links() {
  const { isSignedIn } = useAuth();
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ['linksCaches'],
    queryFn: async () => {
      const request = await fetch('/api/links');
      const response = await request.json();
      const resJson = response.links as linksArrayProps;
      console.log(resJson);
      return resJson;
    },
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  if (!isSignedIn) {
    return (
      <ul className="flex flex-col w-full gap-1 py-2">
        {links.unauthenticated.map((link, index) => (
          <li
            key={index}
            className="py-1 w-full hover:bg-blue-300 hover:cursor-pointer border-transparent hover:border-blue-800 dark:hover:bg-blue-600 border-l-4 indent-1 rounded-r-xl"
          >
            <Link className="flex items-center" href={link.href}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <Accordion type="single" className="w-full mt-6 mb-2 p-1">
      <AccordionItem value="userMenu">
        <AccordionTrigger>Menu do usuario</AccordionTrigger>
        <AccordionContent>
          <ul className="flex flex-col w-full gap-1 py-2">
            {data.user?.map((link, index) => (
              <li
                key={index}
                className="py-1 w-full hover:bg-blue-300 hover:cursor-pointer border-transparent hover:border-blue-800 dark:hover:bg-blue-600 border-l-4 indent-1 rounded-r-xl"
              >
                <Link className="flex items-center" href={link.href}>
                  <ChevronRight /> {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>

      {data.moderator && (
        <AccordionItem value="modMenu">
          <AccordionTrigger>Menu do curador</AccordionTrigger>
          <AccordionContent>
            <ul className="w-full py-2 list-disc">
              {data.moderator?.map((link, index) => (
                <li
                  key={index}
                  className="py-1 w-full hover:bg-blue-300 hover:cursor-pointer border-transparent hover:border-blue-800 dark:hover:bg-blue-600 border-l-4 indent-1 rounded-r-xl"
                >
                  <Link className="flex items-center" href={link.href}>
                    <ChevronRight /> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      )}
      {data.administrator && (
        <AccordionItem value="modLider">
          <AccordionTrigger>Menu do lider</AccordionTrigger>
          <AccordionContent>
            <ul className="flex flex-col w-full gap-1 py-2">
              {data.administrator?.map((link, index) => (
                <li
                  key={index}
                  className="py-1 w-full hover:bg-blue-300 hover:cursor-pointer border-transparent hover:border-blue-800 dark:hover:bg-blue-600 border-l-4 indent-1 rounded-r-xl"
                >
                  <Link className="flex items-center" href={link.href}>
                    <ChevronRight /> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      )}
    </Accordion>
  );
}
