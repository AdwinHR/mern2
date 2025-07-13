"use client"

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
}) => {
  const baseClasses = "font-medium rounded-lg transition-colors duration-200 flex items-center justify-center"

  const variants = {
    primary: "bg-purple-600 text-white hover:bg-purple-700 disabled:bg-purple-300",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100",
    outline: "border border-purple-600 text-purple-600 hover:bg-purple-50 disabled:border-purple-300",
    danger: "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300",
  }

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  }

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  )
}

export default Button
