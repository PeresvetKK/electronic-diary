import React from 'react'
import './Input.scss'

const Input = ({children, ...props}) => {
  return (
    <input className={`input`} {...props}/>
  )
}

export default Input