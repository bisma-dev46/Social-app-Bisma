import { NavLink, Outlet } from 'react-router-dom'
import clsx from 'clsx'

export function DashboardLayout() {
  const linkClass = ({ isActive }) =>
    clsx(
      'block rounded-lg px-3 py-2 text-sm font-medium',
      isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
    )

  return (
    <div className="mx-auto flex max-w-4xl gap-6 px-4 py-6">
      <aside className="w-48 shrink-0 space-y-1">
        <NavLink to="/dashboard/posts" className={linkClass}>My Posts</NavLink>
        <NavLink to="/dashboard/create" className={linkClass}>Create Post</NavLink>
        <NavLink to="/dashboard/settings" className={linkClass}>Profile Settings</NavLink>
      </aside>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}