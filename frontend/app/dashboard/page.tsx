'use client'

import { useSession, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [tasks, setTasks] = useState<string[]>([])
  const [newTask, setNewTask] = useState('')
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])
  const [loadingTask, setLoadingTask] = useState(false)
  const [loadingAI, setLoadingAI] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
    else if (status === 'authenticated') fetchTasks()
  }, [status, router])

  const fetchTasks = async () => {
    const res = await fetch('/api/tasks')
    const data = await res.json()
    setTasks(data.tasks.map((t: any) => t.task))
  }

  const handleAddTask = async () => {
    if (!newTask.trim()) return
    setLoadingTask(true)
    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: newTask }),
    })
    setNewTask('')
    await fetchTasks()
    setLoadingTask(false)
  }

  const handleSuggest = async () => {
    if (!newTask.trim()) return
    setLoadingAI(true)
    setAiSuggestions([])

    const res = await fetch('/api/suggest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: newTask }),
    })

    console.log(res)

    const data = await res.json()
    setAiSuggestions(data.suggestions || [])
    setLoadingAI(false)
  }

  const useSuggestion = (text: string) => {
    setNewTask(text)
    setAiSuggestions([])
  }

  if (status === 'loading') return <div className="p-4">Loading...</div>

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Welcome, {session?.user?.email?.split('@')[0]}!</h1>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="flex-grow p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer disabled:opacity-50"
          disabled={loadingTask}
        >
          {loadingTask ? 'Adding...' : 'Add'}
        </button>
        <button
          onClick={handleSuggest}
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition cursor-pointer disabled:opacity-50"
          disabled={loadingAI}
        >
          {loadingAI ? 'Thinking...' : 'Suggest'}
        </button>
      </div>

      {aiSuggestions.length > 0 && (
        <div className="mb-4">
          <h3 className="text-md font-semibold mb-2 text-gray-700">AI Suggestions:</h3>
          <ul className="space-y-2">
            {aiSuggestions.map((suggestion, idx) => (
              <li
                key={idx}
                onClick={() => useSuggestion(suggestion)}
                className="p-3 bg-gray-100 border rounded-md hover:bg-blue-50 transition cursor-pointer"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}

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
