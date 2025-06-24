// app/api/tasks/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/firebase'
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const q = query(
    collection(db, 'tasks'),
    where('user', '==', session.user?.email)
  )
  const querySnapshot = await getDocs(q)

  const tasks = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))

  return NextResponse.json({ tasks })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { task } = body

  if (!task) {
    return NextResponse.json({ error: 'Missing task' }, { status: 400 })
  }

  const docRef = await addDoc(collection(db, 'tasks'), {
    user: session.user?.email,
    task,
    createdAt: new Date()
  })

  return NextResponse.json({ id: docRef.id })
}
