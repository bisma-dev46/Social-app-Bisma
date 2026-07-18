import { useForm } from 'react-hook-form'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { useState } from 'react'

export function SignupPage() {
  const { signup, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [formError, setFormError] = useState('')

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm()

  if (isAuthenticated) {
    return <Navigate to="/dashboard/posts" replace />
  }

  function onSubmit({ name, email, password }) {
    try {
      setFormError('')
      signup({ name, email, password })
      navigate('/login')
    } catch (err) {
      setFormError(err.message)
    }
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="mb-6 text-2xl font-bold">Create account</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Full Name"
          error={errors.name?.message}
          {...register('name', {
            required: 'Name is required',
            minLength: { value: 2, message: 'Name must be at least 2 characters' },
          })}
        />
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
            minLength: { value: 8, message: 'Password must be at least 8 characters' },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*\d).+$/,
              message: 'Password must contain an uppercase letter and a number',
            },
          })}
        />
        <Input
          label="Confirm Password"
          type="password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value) => value === watch('password') || 'Passwords do not match',
          })}
        />

        {formError && <p className="mb-3 text-sm text-red-600">{formError}</p>}

        <Button type="submit" className="w-full" isLoading={isSubmitting}>
          Sign up
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-500">
        Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
      </p>
    </div>
  )
}
