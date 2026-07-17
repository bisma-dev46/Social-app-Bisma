import { useState } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { usePosts } from '../../hooks/usePosts'
import { PostForm } from '../../components/post/PostForm'

export function EditPost() {
  const { postId } = useParams()
  const { currentUser } = useAuth()
  const { getPostById, updatePost } = usePosts()
  const navigate = useNavigate()
  const [saving, setSaving] = useState(null)

  const post = getPostById(postId)

  if (!post || post.authorId !== currentUser.id) {
    return <Navigate to="/dashboard/posts" replace />
  }

  function handleSave(data, { asDraft }) {
    setSaving(asDraft ? 'draft' : 'publish')

    updatePost(post.id, {
      description: data.description,
      image: data.image,
      isPublic: data.isPublic,
      isDraft: asDraft,
    })

    setSaving(null)
    navigate('/dashboard/posts')
  }

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Edit Post</h1>
      <div className="rounded-xl border bg-white p-5">
        <PostForm initialValues={post} onSave={handleSave} saving={saving} />
      </div>
    </div>
  )
}