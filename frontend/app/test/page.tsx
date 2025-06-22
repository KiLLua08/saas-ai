'use client'
import { auth } from '@/lib/firebase'

export default function TestPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Firebase Connected ✅</h1>
      <p>Auth object exists: {auth ? 'Yes' : 'No'}</p>
    </div>
  )
}
