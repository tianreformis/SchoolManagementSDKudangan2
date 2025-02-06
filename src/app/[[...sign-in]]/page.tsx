'use client'

import * as Clerk from '@clerk/elements/common'
import * as SignIn from '@clerk/elements/sign-in'
import Image from 'next/image'
import Link from 'next/link'

export default function Page() {
  return <div className='flex items-center justify-center h-screen bg-lamaSkyLight'>
    <SignIn.Root>
      <SignIn.Step name='start' className='bg-white rounded-md shadow-2xl p-12 flex flex-col gap-2'>
        <h1 className='text-xl font-bold flex items-center gap-2 justify-center'>
          <Image src="/logo.png" alt="" width={30} height={30} />
          SD Kudangan 2
        </h1>
        <h2 className='text-xs text-gray-400 text-wrap'>
          Masuk ke akun anda jikalau ada permasalahan silahkan
          <Link href="https://wa.me/6285247037566"
            className='font-bold text-blue-500 hover:text-blue-800 ml-2'
          >
            hubungi Admin
          </Link>
        </h2>
        <Clerk.GlobalError />
        <Clerk.Field name="identifier" className='flex flex-col gap-2'>
          <Clerk.Label>Username</Clerk.Label>
          <Clerk.Input
            type="text"
            required
            className='p-2 rounded-md ring-1 ring-gray-300'
          />
          <Clerk.FieldError className='text-xs text-red-400' />
        </Clerk.Field>

        <Clerk.Field name="pasword" className='flex flex-col gap-2'>
          <Clerk.Label>Password</Clerk.Label>
          <Clerk.Input
            type="password"
            required
            className='p-2 rounded-md ring-1 ring-gray-300'
          />
          <Clerk.FieldError className='text-xs text-red-400' />
        </Clerk.Field>
        <SignIn.Action
          submit
          className='bg-blue-500 text-white my-1 rounded-md text-lg p-2 font-bold'
        >SignIn </SignIn.Action>
      </SignIn.Step>
    </SignIn.Root>
  </div>


}