import React from 'react'
import { wrapper } from './main.scss'

const Main = ({children}) => {
  return (
    <div className={wrapper}>
      {children}
    </div>
  )
}

export default Main
