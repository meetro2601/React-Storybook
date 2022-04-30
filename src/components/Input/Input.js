import React from 'react'

function Input(props) {
    const {size,...rest} = props
  return (
    <input className='border-2 border-black p-2' type='text' placeholder={`Max limit is ${size} characters`} maxLength={size} {...rest}></input>
  )
}

export default Input