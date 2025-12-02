import { getSession } from '@/lib/session';
import Link from 'next/link';
import React from 'react'
import { LogOut } from 'lucide-react'

const SignOutButton = async () => {
    const session = await getSession();
  return (
    <div className='flex items-center gap-2 ml-auto'>
        {!session || !session.user ? (
            <>
            <Link href='/auth/signin'>Sign In</Link>
            <Link href='/auth/signup'>Sign Up</Link>
            </>
        ):
        (<>
            <p>{session.user.name}</p>
            <Link href='/api/auth/signout'>
            <LogOut className='w-5 h-5' />
            </Link>
        </>
        )}
    </div>
  )
}

export default SignOutButton