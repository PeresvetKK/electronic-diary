import React from 'react'
import classes from './Button.scss'

const Button = ({children, ...props}) => {
  return (
    <button class={`btn ${props.class}`} >
        {children}
    </button>
  )
}

export default Button