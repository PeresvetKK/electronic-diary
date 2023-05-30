import React from 'react'
import classes from './Button.scss'

const Button = ({children, classNameElement, ...props}) => {
  return (
    <button className={`btn ${classNameElement}`} {...props} >
        {children}
    </button>
  )
}

export default Button