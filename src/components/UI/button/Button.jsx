import React from 'react'
import classes from './Button.scss'

const Button = ({children, ...props}) => {
  return (
    <button className={`btn ${props.className}`} >
        {children}
    </button>
  )
}

export default Button