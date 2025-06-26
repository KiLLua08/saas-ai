// app/api/suggest/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { OpenAI } from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
console.log("OPENAI KEY heeeeeeeeeeeeeey:", process.env.OPENAI_API_KEY)

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { task } = await req.json()
  if (!task) {
    return NextResponse.json({ error: 'Task required' }, { status: 400 })
  }

  const prompt = `Suggest 3 related actionable tasks for: "${task}"`

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 100,
    })

    const suggestionText = chatCompletion.choices[0].message.content
    const suggestions = suggestionText
      ?.split('\n')
      .map(line => line.replace(/^\d+\.\s*/, '').trim())
      .filter(Boolean)

    return NextResponse.json({ suggestions })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to generate suggestions' }, { status: 500 })
  }
}


//daed island 2