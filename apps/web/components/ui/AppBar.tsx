import React from 'react'
import Link from 'next/link'
import { Home } from 'lucide-react'
import Menu from './Menu'
import SignOutButton from './SignOutButton'
const AppBar = () => {
    return (
        <div className='p-2 shadow flex gap-3 bg-gradient-to-br from-blue-500 to-purple-600 text-white'>
            <Menu />
            <Link
                href="/"
                className='hover:bg-white/10 p-2 rounded-full transition flex items-center justify-center'
            >
                <Home className='w-5 h-5' />
            </Link>
            <SignOutButton />
        </div>
    )
}

export default AppBar