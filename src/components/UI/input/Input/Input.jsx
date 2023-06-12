import React from 'react'
import './Input.scss'

const Input = ({children, classNameElement, ...props}) => {
  return (
    <input className={`input ${classNameElement}`} {...props}/>

  )
}

export default Input