"use client"
import { Eye, EyeOff } from "lucide-react";
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import SubmitButton from '@/components/ui/SubmitButton';
import { signIn } from '@/lib/auth';
import Link from 'next/link'
import React, { useActionState } from 'react'

const SignInForm = () => {
    const [state, action] = useActionState(signIn, undefined);
    const [showPassword, setShowPassword] = React.useState(false);
    return (
        <form action={action}>
            <div className='flex flex-col gap-2 w-64'>
                {state?.message && <p className='text-red-500 text-sm'>{state.message}</p>}
                <div className="flex flex-col gap-1">
                    <Label htmlFor='email'>Email</Label>
                    <Input
                        id='email'
                        name='email'
                        placeholder='johnemail@email.com'
                        type='email'
                    />
                </div>
                {state?.error?.email && <p className='text-red-500 text-sm'>{state.error.email}</p>}
                <div className="flex flex-col gap-1 relative">
                    <Label htmlFor='password'>Password</Label>
                    <Input
                        id='password'
                        name='password'
                        placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;'
                        type={showPassword ? 'text' : 'password'}
                    />
                    <Button
                        className="absolute top-2 right-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        size="icon"
                        type="button"
                        variant="ghost"
                    >
                        {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                        ) : (
                            <Eye className="h-4 w-4" />
                        )}
                    </Button>
                </div>
                {state?.error?.name && <p className='text-red-500 text-sm'>{state.error.password}</p>}
                <Link className='text-sm underline' href='#'>Forgot Password?
                </Link>
                <SubmitButton>Sign In</SubmitButton>
            </div>
        </form>
    );
};

export default SignInForm