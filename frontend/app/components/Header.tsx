'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'


export default function Header() {
  const { data: session, status } = useSession()

  return (
    <header className="bg-white shadow py-4 px-6 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-blue-600">
        <Image src="/images/app.png" alt="icon" width={40} height={40} />
      </Link>

      {status === 'loading' ? null : session ? (
        <div className="flex gap-4 items-center">
          <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
            Dashboard
          </Link>
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-4 items-center">
          <Link
            href="/login"
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="border border-blue-500 text-blue-500 px-4 py-1 rounded hover:bg-blue-50 transition"
          >
            Sign up
          </Link>
        </div>
      )}
    </header>
  )
}
