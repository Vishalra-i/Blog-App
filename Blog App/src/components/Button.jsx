import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = 'bg-green-400',
    textColor = 'text-white',
    hoverColor = 'hover:bg-blue-700',
    className = '',
    ...props
}
) {
  return (
    <button className={`px-4 py-2 rounded-lg font-semibold ${className} ${bgColor} ${textColor}`} type={type} {...props}>
        {children}
    </button>
  )
}

export default Button