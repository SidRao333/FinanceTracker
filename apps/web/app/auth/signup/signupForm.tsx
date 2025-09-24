"use client"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import SubmitButton from '@/components/ui/SubmitButton';
import { signUp } from '@/lib/auth';
import React, { useActionState } from 'react'

const SignupForm = () => {
    const [state, action] = useActionState(signUp, undefined);
  return (
    <form action={action}>
        <div className='flex flex-col gap-2'>
            {state?.message && <p className='text-red-500 text-sm'>{state.message}</p>}
            <div className="flex flex-col gap-1">
                <Label htmlFor='name'>Name</Label>
                <Input id='name' name='name' type='text' placeholder='Enter your name' />
            </div>
            {state?.error?.name && <p className='text-red-500 text-sm'>{state.error.name}</p>}

            <div className="flex flex-col gap-1">
                <Label htmlFor='email'>Email</Label>
                <Input id='email' name='email' type='email' placeholder='Enter your email' />
            </div>
            {state?.error?.email && <p className='text-red-500 text-sm'>{state.error.email}</p>}
            <div className="flex flex-col gap-1">
                <Label htmlFor='password'>Password</Label>
                <Input id='password' name='password' type='password' placeholder='Enter your password' />
            </div>
            {state?.error?.password && (
                <div className="text-sm text-red-500">
                    <p>Password must:</p>
                    <ul>
                    {state.error.password.map((error) => (
                        <li key={error}>{error}</li>
                    ))}
                    </ul>
                </div>
            )}

            <SubmitButton>Sign Up</SubmitButton>
        </div>
    </form>
  );
};

export default SignupForm;