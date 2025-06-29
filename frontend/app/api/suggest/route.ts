// app/api/suggest/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
})

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { task } = await req.json()
  if (!task) {
    return NextResponse.json({ error: 'Task required' }, { status: 400 })
  }

  const prompt = `Suggest 3 clear, practical, and actionable tasks related to: "${task}"`

  try {
    const chatCompletion = await groq.chat.completions.create({
      model: 'llama3-70b-8192',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 200,
    })

    const content = chatCompletion.choices[0].message.content || ''
    const suggestions = content
      .split('\n')
      .map(line => line.replace(/^\d+\.\s*/, '').trim())
      .filter(Boolean)

    return NextResponse.json({ suggestions })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Groq suggestion failed' }, { status: 500 })
  }
}
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.json({ message: 'Suggest API is ready to use' })
}