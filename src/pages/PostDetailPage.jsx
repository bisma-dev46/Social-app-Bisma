import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { usePosts } from '../hooks/usePosts'
import { useAuth } from '../hooks/useAuth'
import { storage } from '../utils/storage'
import { Avatar } from '../components/ui/Avatar'
import { PostActions } from '../components/post/PostActions'
import { CommentSection } from '../components/post/CommentSection'
import { formatDate } from '../utils/helpers'

export function PostDetailPage() {
  const { postId } = useParams()
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const { getPostById, getLikesForPost, isPostLikedByUser, toggleLike, getCommentsForPost } = usePosts()
  const [, forceUpdate] = useState(0)

  const post = getPostById(postId)

  if (!post) {
    return <p className="p-8 text-center text-gray-500">Post not found.</p>
  }

  const author = storage.getUsers().find((u) => u.id === post.authorId)
  const likeCount = getLikesForPost(post.id).length
  const commentCount = getCommentsForPost(post.id).length
  const liked = isPostLikedByUser(post.id, currentUser?.id)

  function handleLikeClick() {
    if (!currentUser) {
      navigate('/login', { state: { message: 'Please login to interact' } })
      return
    }
    toggleLike(post.id, currentUser.id)
    forceUpdate((n) => n + 1)
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center gap-3">
          <Link to={`/profile/${author.id}`}>
            <Avatar src={author.avatar} name={author.name} size="md" />
          </Link>
          <div>
            <Link to={`/profile/${author.id}`} className="font-semibold hover:underline">
              {author.name}
            </Link>
            <p className="text-xs text-gray-500">{formatDate(post.createdAt)}</p>
          </div>
        </div>

        <p className="mb-3 whitespace-pre-wrap text-gray-800">{post.description}</p>

        {post.image && (
          <img src={post.image} alt="post" className="mb-3 w-full rounded-lg object-cover" />
        )}

        <PostActions
          liked={liked}
          likeCount={likeCount}
          commentCount={commentCount}
          onLikeClick={handleLikeClick}
          onCommentClick={() => {}}
        />

        <CommentSection postId={post.id} />
      </div>
    </div>
  )
}