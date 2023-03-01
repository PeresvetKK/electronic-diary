import React from 'react'
import classes from './Ocenka.scss'

const Ocenka = ({children, ...props}) => {
  return (
    <div className="schudle-block-lesson__score">
        {props.ocenka}
    </div>
  )
}

export default Ocenka