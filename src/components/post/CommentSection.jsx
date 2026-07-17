import { useState } from 'react'
import { Link } from 'react-router-dom'
import { storage } from '../../utils/storage'
import { useAuth } from '../../hooks/useAuth'
import { usePosts } from '../../hooks/usePosts'
import { Avatar } from '../ui/Avatar'
import { timeAgo } from '../../utils/helpers'
import { Button } from '../ui/Button'

export function CommentSection({ postId }) {
  const { currentUser } = useAuth()
  const { getCommentsForPost, addComment, deleteComment } = usePosts()
  const [text, setText] = useState('')
  const [confirmingId, setConfirmingId] = useState(null)

  const comments = getCommentsForPost(postId)
  const users = storage.getUsers()

  function handleSubmit(e) {
    e.preventDefault()
    if (!text.trim()) return
    addComment(postId, currentUser.id, text.trim())
    setText('')
  }

  function handleDelete(commentId) {
    deleteComment(commentId)
    setConfirmingId(null)
  }

  return (
    <div className="mt-4">
      <h3 className="mb-3 font-semibold">
        {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
      </h3>

      {currentUser ? (
        <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button type="submit" size="sm">Post</Button>
        </form>
      ) : (
        <p className="mb-4 text-sm text-gray-500">
          <Link to="/login" className="text-blue-600 hover:underline">Login</Link> to comment
        </p>
      )}

      <div className="space-y-3">
        {comments.map((comment) => {
          const author = users.find((u) => u.id === comment.authorId)
          if (!author) return null
          const isMine = currentUser?.id === comment.authorId

          return (
            <div key={comment.id} className="flex gap-2">
              <Avatar src={author.avatar} name={author.name} size="sm" />
              <div className="flex-1 rounded-lg bg-gray-100 px-3 py-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{author.name}</span>
                  <span className="text-xs text-gray-400">{timeAgo(comment.createdAt)}</span>
                </div>
                <p className="text-sm text-gray-800">{comment.text}</p>

                {isMine && (
                  confirmingId === comment.id ? (
                    <div className="mt-1 flex items-center gap-2 text-xs">
                      <span>Are you sure?</span>
                      <button className="font-semibold text-red-600" onClick={() => handleDelete(comment.id)}>Yes</button>
                      <button className="font-semibold text-gray-600" onClick={() => setConfirmingId(null)}>No</button>
                    </div>
                  ) : (
                    <button
                      className="mt-1 text-xs text-red-500 hover:underline"
                      onClick={() => setConfirmingId(comment.id)}
                    >
                      Delete
                    </button>
                  )
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}