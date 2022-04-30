import React from 'react'

function Layout(props) {
  return (
    <div className='container text-center'>{props.children}</div>
  )
}

export default Layout