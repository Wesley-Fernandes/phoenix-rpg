import links from './links.json';
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';

export default function Links() {
  const { isSignedIn } = useAuth();
  const status: 'authenticated' | 'unauthenticated' = isSignedIn
    ? 'authenticated'
    : 'unauthenticated';
  return (
    <ul className="flex flex-col w-full gap-1 py-2">
      {links[status].map((link, index) => (
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
