import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-950">
      <SignIn />;
    </main>
  );
}
