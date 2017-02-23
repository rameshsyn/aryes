import React from 'react'

const Setting = ({children}) => {
  const fallBack = <h1>Hello, This is a Setting section</h1>
  return (
    <div>
      {children ? children : fallBack}
    </div>
  )
}

export default Setting
