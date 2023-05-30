import React from 'react'
import classes from './Messanger.scss'
import MessangerItem from './MessangerItem/MessangerItem'

const Messanger = (props) => {
  return (
    <div className={`message-block block-widget row__item`}>
            <div className="block-widget__header">
                <p className="block-widget__title text-s font-b">{props.title}</p>
            </div>
            <div className="message-block__items block-widget__items">
                <MessangerItem></MessangerItem>
                <MessangerItem></MessangerItem>
                <MessangerItem></MessangerItem>
                <MessangerItem></MessangerItem>
            </div>
        </div>
  )
}

export default Messanger