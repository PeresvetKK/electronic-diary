import React from 'react'
import classes from './LessonItem.scss'

const LessonItem = ({children , ...props}) => {
  return (
    <div className='schudle-block__lesson schudle-block-lesson' style={props.style}>
        <p className="schudle-block-lesson__title">{props.lesson}</p>
        <p className={`schudle-block-lesson__type ${props.lessonClass}`}>{props.lessonType}</p>
    </div>
  )
}

export default LessonItem