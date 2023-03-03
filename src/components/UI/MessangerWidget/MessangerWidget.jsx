import React from 'react'
import classes from './MessangerWidget.scss'
import MessangerWidgetItem from './MessangerWidgetItem/MessangerWidgetItem'

const Messanger = (props) => {
  return (
    <div className={`message-block block-widget ${props.class}`}>
            <div className="block-widget__header">
                <p className="block-widget__title text-s font-b">{props.title}</p>
            </div>
            <div className="message-block__items block-widget__items">
                <MessangerWidgetItem></MessangerWidgetItem>
                <MessangerWidgetItem></MessangerWidgetItem>
                <MessangerWidgetItem></MessangerWidgetItem>
                <MessangerWidgetItem></MessangerWidgetItem>
            </div>
        </div>
  )
}

export default Messanger