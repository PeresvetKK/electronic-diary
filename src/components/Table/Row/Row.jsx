import React from 'react'
import s from './Row.module.scss'

const Row = ({classNameElement, children, ...props}) => {
  return (
    <div className={`${s.row} ${classNameElement}`} {...props}>
        {children}
    </div>
  )
}

export default Row