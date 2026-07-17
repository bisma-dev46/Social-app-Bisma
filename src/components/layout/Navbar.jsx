import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { Avatar } from '../ui/Avatar'
import { Button } from '../ui/Button'

export function Navbar() {
  const { currentUser, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <nav className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-bold text-blue-600">
          SocialApp
        </Link>

        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <Link to="/dashboard/posts" className="text-sm font-medium text-gray-700 hover:text-blue-600">
              Dashboard
            </Link>
            <Link to={`/profile/${currentUser.id}`}>
              <Avatar src={currentUser.avatar} name={currentUser.name} size="sm" />
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link to="/signup">
              <Button variant="primary" size="sm">Signup</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
