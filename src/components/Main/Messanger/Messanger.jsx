import React from 'react'
import classes from './Messanger.scss'

const Messanger = (props) => {
  return (
    <div className={`message-block block-widget ${props.class}`}>
            <div className="block-widget__header">
                <p className="block-widget__title text-s font-b">{props.title}</p>
            </div>
            <div className="message-block__items block-widget__items">
                
            </div>
        </div>
  )
}

export default Messanger