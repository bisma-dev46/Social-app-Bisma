import { useForm } from 'react-hook-form'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { useState } from 'react'

export function LoginPage() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [formError, setFormError] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

  if (isAuthenticated) {
    return <Navigate to="/dashboard/posts" replace />
  }

  function onSubmit({ email, password }) {
    try {
      setFormError('')
      login(email, password)
      navigate('/dashboard/posts')
    } catch (err) {
      setFormError(err.message)
    }
  }

  const redirectMessage = location.state?.message

  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="mb-6 text-2xl font-bold">Log in</h1>

      {redirectMessage && (
        <p className="mb-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-700">{redirectMessage}</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email"
          type="email"
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
          })}
        />
        <Input
          label="Password"
          type="password"
          error={errors.password?.message}
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'Password must be at least 6 characters' },
          })}
        />

        {formError && <p className="mb-3 text-sm text-red-600">{formError}</p>}

        <Button type="submit" className="w-full" isLoading={isSubmitting}>
          Log in
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-500">
        Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
      </p>
    </div>
  )
}