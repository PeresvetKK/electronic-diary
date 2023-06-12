import React from 'react'
import './CellText.scss'

const CellText = ({classNameElement, children, ...props}) => {
  return (
    <div className={`cell-text ${classNameElement}`} {...props}>
        {children}
    </div>
  )
}

export default CellText