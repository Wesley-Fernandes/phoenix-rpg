import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <main className="flex screen items-center justify-center">
      <SignUp />
    </main>
  );
}
