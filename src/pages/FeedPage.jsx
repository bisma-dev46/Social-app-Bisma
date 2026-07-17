import { usePosts } from '../hooks/usePosts'
import { PostCard } from '../components/post/PostCard'

export function FeedPage() {
  const { getPublicPosts } = usePosts()
  const posts = getPublicPosts()

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <h1 className="mb-4 text-2xl font-bold">Feed</h1>

      {posts.length === 0 ? (
        <p className="rounded-xl border bg-white p-6 text-center text-gray-500">
          No posts yet — be the first to share!
        </p>
      ) : (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  )
}