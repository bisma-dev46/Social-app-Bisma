import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../hooks/useAuth'
import { fileToBase64 } from '../../utils/helpers'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { Avatar } from '../../components/ui/Avatar'

export function ProfileSettings() {
  const { currentUser, updateCurrentUser } = useAuth()
  const [avatarPreview, setAvatarPreview] = useState(currentUser.avatar)
  const [successMessage, setSuccessMessage] = useState('')

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      name: currentUser.name,
      bio: currentUser.bio || '',
      location: currentUser.location || '',
    },
  })

  const bio = watch('bio') || ''

  async function handleAvatarChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const base64 = await fileToBase64(file)
    setAvatarPreview(base64)
  }

  function onSubmit(formValues) {
    updateCurrentUser({
      name: formValues.name,
      bio: formValues.bio,
      location: formValues.location,
      avatar: avatarPreview,
    })
    setSuccessMessage('Profile updated successfully')
  }

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Profile Settings</h1>

      {successMessage && (
        <p className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">{successMessage}</p>
      )}

      <div className="rounded-xl border bg-white p-5">
        <div className="mb-4 flex items-center gap-4">
          <Avatar src={avatarPreview} name={currentUser.name} size="lg" />
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Full Name"
            error={errors.name?.message}
            {...register('name', { required: 'Name is required' })}
          />

          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              rows={3}
              maxLength={150}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              {...register('bio', { maxLength: 150 })}
            />
            <p className="mt-1 text-right text-xs text-gray-400">{bio.length} / 150</p>
          </div>

          <Input label="Location" {...register('location')} />

          <Button type="submit" isLoading={isSubmitting}>
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  )
}