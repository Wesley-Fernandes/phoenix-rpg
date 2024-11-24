import React from 'react';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';

interface Props {
  userId: string;
}
export default function BanUserButton({}: Props) {
  const submiter = async (event: FormData) => {
    const request = await fetch(`https://api.clerk.com/v1/users`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await request.json();
    console.log(data);
  };
  return (
    <form action={submiter}>
      <Button size="icon" type="submit">
        <Trash2 />
      </Button>
    </form>
  );
}
