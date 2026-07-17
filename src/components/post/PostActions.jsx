export function PostActions({ liked, likeCount, commentCount, onLikeClick, onCommentClick }) {
  return (
    <div className="flex items-center gap-4 border-t pt-3 text-sm">
      <button
        onClick={onLikeClick}
        className={`flex items-center gap-1 rounded-lg px-2 py-1 transition hover:bg-gray-100 ${
          liked ? 'text-blue-600 font-semibold' : 'text-gray-600'
        }`}
      >
        {liked ? '💙 Liked' : '🤍 Like'} · {likeCount}
      </button>
      <button
        onClick={onCommentClick}
        className="flex items-center gap-1 rounded-lg px-2 py-1 text-gray-600 transition hover:bg-gray-100"
      >
        💬 Comment · {commentCount}
      </button>
    </div>
  )
}