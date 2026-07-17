import { forwardRef } from 'react'

export const Input = forwardRef(function Input(
  { label, error, type = 'text', ...rest },
  ref
) {
  return (
    <div className="mb-4">
      {label && <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>}
      <input
        ref={ref}
        type={type}
        className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        {...rest}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
})