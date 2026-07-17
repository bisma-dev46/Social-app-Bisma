import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { usePosts } from '../../hooks/usePosts'
import { PostForm } from '../../components/post/PostForm'

export function CreatePost() {
  const { currentUser } = useAuth()
  const { createPost } = usePosts()
  const navigate = useNavigate()
  const [saving, setSaving] = useState(null)
  const [draftMessage, setDraftMessage] = useState('')
  const [formKey, setFormKey] = useState(0)

  function handleSave(data, { asDraft }) {
    setSaving(asDraft ? 'draft' : 'publish')

    createPost({
      authorId: currentUser.id,
      description: data.description,
      image: data.image,
      isPublic: data.isPublic,
      isDraft: asDraft,
    })

    setSaving(null)

    if (asDraft) {
      setDraftMessage('Post saved as draft')
      setFormKey((k) => k + 1)
    } else {
      navigate('/')
    }
  }

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Create Post</h1>
      {draftMessage && (
        <p className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">{draftMessage}</p>
      )}
      <div className="rounded-xl border bg-white p-5">
        <PostForm key={formKey} onSave={handleSave} saving={saving} />
      </div>
    </div>
  )
}