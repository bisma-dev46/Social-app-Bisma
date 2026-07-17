import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { usePosts } from '../../hooks/usePosts'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Modal } from '../../components/ui/Modal'
import { formatDate } from '../../utils/helpers'

export function PostsDashboard() {
  const { currentUser } = useAuth()
  const { getPostsByUser, deletePost, updatePost, getLikesForPost, getCommentsForPost } = usePosts()
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)
  const [, forceRerender] = useState(0)

  const posts = getPostsByUser(currentUser.id)

  function statusOf(post) {
    if (post.isDraft) return 'draft'
    return post.isPublic ? 'public' : 'private'
  }

  function togglePublic(post) {
    updatePost(post.id, { isPublic: !post.isPublic })
    forceRerender((n) => n + 1)
  }

  function publish(post) {
    updatePost(post.id, { isDraft: false, isPublic: true })
    forceRerender((n) => n + 1)
  }

  function confirmDelete() {
    deletePost(confirmDeleteId)
    setConfirmDeleteId(null)
    forceRerender((n) => n + 1)
  }

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">My Posts</h1>

      {posts.length === 0 ? (
        <p className="rounded-xl border bg-white p-6 text-center text-gray-500">
          You haven't created any posts yet. Create your first post!
        </p>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="rounded-xl border bg-white p-4">
              <div className="mb-2 flex items-center justify-between">
                <Badge variant={statusOf(post)} />
                <span className="text-xs text-gray-400">{formatDate(post.createdAt)}</span>
              </div>
              <p className="mb-2 line-clamp-2 text-gray-800">{post.description}</p>
              <p className="mb-3 text-xs text-gray-500">
                {getLikesForPost(post.id).length} likes · {getCommentsForPost(post.id).length} comments
              </p>
              <div className="flex flex-wrap gap-2">
                <Link to={`/dashboard/edit/${post.id}`}>
                  <Button size="sm" variant="secondary">Edit</Button>
                </Link>
                <Button size="sm" variant="danger" onClick={() => setConfirmDeleteId(post.id)}>
                  Delete
                </Button>
                {!post.isDraft && (
                  <Button size="sm" variant="ghost" onClick={() => togglePublic(post)}>
                    Make {post.isPublic ? 'Private' : 'Public'}
                  </Button>
                )}
                {post.isDraft && (
                  <Button size="sm" variant="primary" onClick={() => publish(post)}>
                    Publish
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        title="Delete this post?"
      >
        <p className="mb-4 text-sm text-gray-600">This cannot be undone.</p>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setConfirmDeleteId(null)}>Cancel</Button>
          <Button variant="danger" onClick={confirmDelete}>Delete</Button>
        </div>
      </Modal>
    </div>
  )
}