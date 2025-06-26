'use client'

import { useSession, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [tasks, setTasks] = useState<string[]>([])
  const [newTask, setNewTask] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status])

  useEffect(() => {
    if (status === 'authenticated') fetchTasks()
  }, [status])

  const fetchTasks = async () => {
    const res = await fetch('/api/tasks')
    const data = await res.json()
    setTasks(data.tasks.map((t: any) => t.task))
  }

  const handleAddTask = async () => {
    if (!newTask) return
    setLoading(true)
    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: newTask }),
    })
    setNewTask('')
    fetchTasks()
    setLoading(false)
  }

  if (status === 'loading') return <div className="p-4">Loading...</div>

  return (
    <div className="max-w-2xl mx-auto p-6 mt-8 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Your Tasks</h1>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition cursor-pointer"
        >
          Logout
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="flex-grow p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter a task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          onClick={handleAddTask}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Task'}
        </button>
      </div>

      <ul className="space-y-2">
        {tasks.map((task, idx) => (
          <li
            key={idx}
            className="p-3 border rounded-md bg-gray-50 text-gray-700"
          >
            {task}
          </li>
        ))}
      </ul>
    </div>
  )
}
