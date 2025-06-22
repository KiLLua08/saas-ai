import './globals.css'
import type { Metadata } from 'next'
import Header from './components/Header'
import Footer from './components/Footer'
import Providers from './providers' // ✅

export const metadata: Metadata = {
  title: 'AI Task Manager',
  description: 'Organize your day with AI-powered task suggestions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800">
        <Providers> {/* ✅ Wrap everything in SessionProvider */}
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto p-4">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
