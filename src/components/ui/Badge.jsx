import clsx from 'clsx'

const VARIANTS = {
  draft: 'bg-gray-200 text-gray-700',
  public: 'bg-green-100 text-green-700',
  private: 'bg-orange-100 text-orange-700',
}

export function Badge({ variant = 'draft' }) {
  const label = variant.charAt(0).toUpperCase() + variant.slice(1)
  return (
    <span className={clsx('rounded-full px-2.5 py-0.5 text-xs font-medium', VARIANTS[variant])}>
      {label}
    </span>
  )
}