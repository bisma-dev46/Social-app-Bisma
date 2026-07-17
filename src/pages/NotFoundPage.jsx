import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
      <h1 className="mb-2 text-4xl font-bold">404</h1>
      <p className="mb-6 text-gray-500">This page doesn't exist.</p>
      <Link to="/" className="text-blue-600 hover:underline">Go back home</Link>
    </div>
  )
}