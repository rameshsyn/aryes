import React from 'react'

const Management = ({children}) => {
  const fallBack = <h1>Hello, This is a Management section</h1>
  return (
    <div>
      {children ? children : fallBack}
    </div>
  )
}

export default Management
