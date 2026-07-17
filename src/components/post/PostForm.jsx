import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { fileToBase64 } from '../../utils/helpers'
import { Button } from '../ui/Button'

export function PostForm({ initialValues = {}, onSave, saving }) {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      description: initialValues.description || '',
      isPublic: (initialValues.isPublic ?? true) ? 'true' : 'false',
    },
  })

  const [imagePreview, setImagePreview] = useState(initialValues.image || null)
  const description = watch('description') || ''
  const charCount = description.length
  const maxChars = 500

  async function handleImageChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const base64 = await fileToBase64(file)
    setImagePreview(base64)
  }

  function clearImage() {
    setImagePreview(null)
  }

  function submitAs(isDraft) {
    return handleSubmit((formValues) => {
      onSave(
        {
          description: formValues.description,
          isPublic: formValues.isPublic === 'true' || formValues.isPublic === true,
          image: imagePreview,
        },
        { asDraft: isDraft }
      )
    })
  }

  const counterColor =
    charCount >= 480 ? 'text-red-500' : charCount >= 400 ? 'text-orange-500' : 'text-gray-400'

  return (
    <form className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
        <textarea
          rows={4}
          maxLength={maxChars}
          placeholder="What's on your mind?"
          className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
          {...register('description', {
            required: 'Description is required',
            minLength: { value: 10, message: 'Description must be at least 10 characters' },
          })}
        />
        <div className="mt-1 flex items-center justify-between">
          {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
          <p className={`ml-auto text-xs ${counterColor}`}>{charCount} / {maxChars} characters</p>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Image (optional)</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview && (
          <div className="mt-2">
            <img src={imagePreview} alt="preview" className="max-h-64 rounded-lg" />
            <button
              type="button"
              onClick={clearImage}
              className="mt-1 block text-sm text-red-500 hover:underline"
            >
              Remove image
            </button>
          </div>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Visibility</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" value="true" {...register('isPublic')} /> Public
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" value="false" {...register('isPublic')} /> Private
          </label>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="secondary" isLoading={saving === 'draft'} onClick={submitAs(true)}>
          Save as Draft
        </Button>
        <Button type="button" variant="primary" isLoading={saving === 'publish'} onClick={submitAs(false)}>
          Publish
        </Button>
      </div>
    </form>
  )
}