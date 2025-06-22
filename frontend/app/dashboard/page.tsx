'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'

export default function DashboardPage() {
  const { data: session } = useSession()
  const [tasks, setTasks] = useState<string[]>([])
  const [newTask, setNewTask] = useState('')
  const [aiSuggestion, setAiSuggestion] = useState('')

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask.trim()])
      setNewTask('')
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Tasks</h1>

      {/* Task Input */}
      <div className="flex space-x-2 mb-4">
        <input
          className="flex-grow border p-2 rounded"
          placeholder="New task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={addTask}
        >
          Add
        </button>
      </div>

      {/* Task List */}
      <ul className="space-y-2">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="p-3 bg-white rounded shadow flex justify-between"
          >
            <span>{task}</span>
            <button className="text-red-500" onClick={() => {
              setTasks(tasks.filter((_, i) => i !== index))
            }}>
              ✕
            </button>
          </li>
        ))}
      </ul>

      {/* AI Suggestion Placeholder */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">AI Suggestion</h2>
        <p className="bg-gray-100 p-3 rounded text-sm text-gray-700">
          {aiSuggestion || "Coming soon..."}
        </p>
      </div>
    </div>
  )
}
