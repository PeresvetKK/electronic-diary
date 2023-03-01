import React from 'react'
import classes from './Lesson.scss'

const Lesson = ({children , ...props}) => {
  return (
    <div className="schudle-block__lesson schudle-block-lesson">
        <p className="schudle-block-lesson__title">{props.lesson}</p>
        <p className={`schudle-block-lesson__type ${props.lessonClass}`}>{props.lessonType}</p>
    </div>
  )
}

export default Lesson