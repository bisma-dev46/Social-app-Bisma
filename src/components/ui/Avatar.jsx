const SIZES = { sm: 32, md: 48, lg: 80 }

export function Avatar({ src, name = '', size = 'md' }) {
  const px = SIZES[size] || SIZES.md
  const initial = name.trim().charAt(0).toUpperCase() || '?'

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        style={{ width: px, height: px }}
        className="rounded-full object-cover"
      />
    )
  }

  return (
    <div
      style={{ width: px, height: px, fontSize: px / 2.2 }}
      className="flex items-center justify-center rounded-full bg-blue-500 font-semibold text-white"
    >
      {initial}
    </div>
  )
}