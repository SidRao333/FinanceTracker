import { getSession } from "@/lib/session";
import { redirect } from 'next/navigation';
import React from 'react';

export default async function Home() {
  const session = await getSession();
  if(!session || !session.user) redirect('/auth/signin');
  console.log({ session });

  return (
    <div>HOME
    </div>
  );
}