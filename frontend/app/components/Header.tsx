export default function Header() {
    return (
      <header className="bg-white shadow-md">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">AI Task Manager</h1>
          <nav className="space-x-4">
            <a href="/" className="text-gray-600 hover:text-blue-600">Home</a>
            <a href="/dashboard" className="text-gray-600 hover:text-blue-600">Dashboard</a>
          </nav>
        </div>
      </header>
    )
  }
  