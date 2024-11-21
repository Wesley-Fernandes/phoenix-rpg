'use client';
import { useAuth, useUser } from '@clerk/nextjs';
import { Button } from '../ui/button';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function User() {
  const { isLoaded, userId, signOut } = useAuth();

  if (!isLoaded || !userId) {
    return null;
  }

  const { user } = useUser();

  const logout = async () => {
    await signOut();
  };
  return (
    <Button className="py-6 w-full" variant="destructive" onClick={logout}>
      <Avatar className="border-2">
        <AvatarImage src={user?.imageUrl} alt="@shadcn" />
        <AvatarFallback>{user?.firstName?.charAt(0)}</AvatarFallback>
      </Avatar>
      <span>Desconectar-se</span>
    </Button>
  );
}
