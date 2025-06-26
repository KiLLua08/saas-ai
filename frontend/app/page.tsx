'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const { data: session } = useSession()
  const router = useRouter()

  if (session) {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-white flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
        Organize Your Day with AI ✨
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mb-8">
        Smart task management powered by AI suggestions. Stay focused, productive, and efficient.
      </p>

      <div className="flex gap-4">
        <Link
          href="/signup"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-lg font-semibold cursor-pointer transition"
        >
          Get Started
        </Link>
        <Link
          href="/login"
          className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-md text-lg font-semibold cursor-pointer transition"
        >
          Login
        </Link>
      </div>
    </div>
  )
}
