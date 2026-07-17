import { Link } from 'react-router-dom'
import { Avatar } from '../ui/Avatar'
import { Button } from '../ui/Button'
import { formatDate } from '../../utils/helpers'

export function ProfileHeader({ user, isOwner }) {
  return (
    <div className="mb-6 overflow-hidden rounded-xl border bg-white shadow-sm">
      <div
        className="h-40 w-full bg-gradient-to-r from-blue-400 to-purple-500 bg-cover bg-center"
        style={user.coverImage ? { backgroundImage: `url(${user.coverImage})` } : undefined}
      />
      <div className="relative px-6 pb-6">
        <div className="-mt-10 mb-3">
          <Avatar src={user.avatar} name={user.name} size="lg" />
        </div>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold">{user.name}</h1>
            {user.bio && <p className="mt-1 text-gray-600">{user.bio}</p>}
            <p className="mt-1 text-sm text-gray-400">
              {user.location && `${user.location} · `}Joined {formatDate(user.joinedAt)}
            </p>
          </div>
          {isOwner && (
            <Link to="/dashboard/settings">
              <Button variant="secondary" size="sm">Edit Profile</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}