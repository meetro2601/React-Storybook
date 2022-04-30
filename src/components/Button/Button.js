import React from 'react'
import './Button.css'

function Button(props) {
    const {variant,children,...rest} = props
  return (
    <button className={`p-3 text-white rounded-lg ${variant}`} {...rest}>
        {children}
    </button>
  )
}

export default Button