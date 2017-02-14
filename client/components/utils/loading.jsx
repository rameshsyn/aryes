import React from 'react'
import {
  ripple,
  rippleChilds,
  rippleChildOne,
  rippleChildTwo
} from './ripple.css'

const Loading = () => (
  <div className={ripple}>
    <div className={`${rippleChilds} ${rippleChildOne}`} />
    <div className={`${rippleChilds} ${rippleChildTwo}`} />
  </div>
)

export default Loading
