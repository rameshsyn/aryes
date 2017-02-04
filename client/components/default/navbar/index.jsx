import React from 'react'
import { wrapper, shortcuts, search } from './navbar.scss'

const navbar = () => {
  return (
    <div className={wrapper}>
      <div className={shortcuts}>
        New
      </div>
      <div className={search}>
        search
      </div>
    </div>
  )
}

export default navbar
