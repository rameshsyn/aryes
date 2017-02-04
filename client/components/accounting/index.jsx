import React from 'react'

const Account = ({children}) => {
  const fallBack = <h1>Hello, This is an Accounting section</h1>
  return (
    <div>
      {children ? children : fallBack}
    </div>
  )
}

export default Account
