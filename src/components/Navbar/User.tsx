'use client';

import { useAuth, useUser } from '@clerk/nextjs';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useEffect, useState } from 'react';
import { Badge } from '../ui/badge';

type PermissionLevel = 'USER' | 'MODERATOR' | 'ADMIN';

export default function User() {
  const { isLoaded, userId, signOut } = useAuth();
  const [permissionLevel, setPermissionLevel] =
    useState<PermissionLevel>('USER');

  useEffect(() => {
    async function fetchPermissionLevel() {
      if (userId) {
        const response = await fetch('/api/user/permission');
        const data = await response.json();
        setPermissionLevel(data.permissionLevel);
      }
    }

    fetchPermissionLevel();
  }, [userId]);

  if (!isLoaded || !userId) {
    return null;
  }

  const { user } = useUser();

  const logout = async () => {
    await signOut();
  };

  return (
    <div>
      <Button className="py-6 w-full" variant="destructive" onClick={logout}>
        <Avatar className="border-2">
          <AvatarImage src={user?.imageUrl} alt="@shadcn" />
          <AvatarFallback>{user?.firstName?.charAt(0)}</AvatarFallback>
        </Avatar>
        <span>Desconectar-se</span>
      </Button>
      <small className="text-[10px] w-full flex justify-end opacity-10">
        {user?.id}
      </small>
      <div className="text-[10px] w-full flex justify-end text-green-500">
        {permissionLevel !== 'USER' ? <Badge>{permissionLevel}</Badge> : null}
      </div>
    </div>
  );
}
