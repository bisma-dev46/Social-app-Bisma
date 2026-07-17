import { Link, useNavigate } from 'react-router-dom'
import { storage } from '../../utils/storage'
import { useAuth } from '../../hooks/useAuth'
import { usePosts } from '../../hooks/usePosts'
import { Avatar } from '../ui/Avatar'
import { timeAgo } from '../../utils/helpers'
import { PostActions } from './PostActions'

export function PostCard({ post }) {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const { getLikesForPost, isPostLikedByUser, toggleLike, getCommentsForPost } = usePosts()

  const author = storage.getUsers().find((u) => u.id === post.authorId)
  const likeCount = getLikesForPost(post.id).length
  const commentCount = getCommentsForPost(post.id).length
  const liked = isPostLikedByUser(post.id, currentUser?.id)

  function goToPost() {
    navigate(`/posts/${post.id}`)
  }

  function handleLikeClick(e) {
    e.stopPropagation()
    if (!currentUser) {
      navigate('/login', { state: { message: 'Please login to interact' } })
      return
    }
    toggleLike(post.id, currentUser.id)
  }

  function handleCommentClick(e) {
    e.stopPropagation()
    if (!currentUser) {
      navigate('/login', { state: { message: 'Please login to interact' } })
      return
    }
    navigate(`/posts/${post.id}`)
  }

  if (!author) return null

  return (
    <div
      onClick={goToPost}
      className="mb-4 cursor-pointer rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md"
    >
      <div className="mb-3 flex items-center gap-3">
        <Link to={`/profile/${author.id}`} onClick={(e) => e.stopPropagation()}>
          <Avatar src={author.avatar} name={author.name} size="md" />
        </Link>
        <div>
          <Link
            to={`/profile/${author.id}`}
            onClick={(e) => e.stopPropagation()}
            className="font-semibold hover:underline"
          >
            {author.name}
          </Link>
          <p className="text-xs text-gray-500">{timeAgo(post.createdAt)}</p>
        </div>
      </div>

      <p className="mb-3 whitespace-pre-wrap text-gray-800">{post.description}</p>

      {post.image && (
        <img src={post.image} alt="post" className="mb-3 max-h-96 w-full rounded-lg object-cover" />
      )}

      <PostActions
        liked={liked}
        likeCount={likeCount}
        commentCount={commentCount}
        onLikeClick={handleLikeClick}
        onCommentClick={handleCommentClick}
      />
    </div>
  )
}