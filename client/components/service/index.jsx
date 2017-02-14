import React from 'react'

const Service = ({children}) => {
  const fallBack = <h1>Hello, This is a Service section</h1>
  return (
    <div>
      {children ? children : fallBack}
    </div>
  )
}

export default Service
