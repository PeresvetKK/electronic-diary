import React from 'react'
import classes from './LessonWidget.scss'

import Ocenka from './Ocenka/Ocenka'
import Lesson from './Lesson/Lesson'
import NumberUrok from './NumberUrok/NumberUrok'

const LessonWidget = (props) => {
  return (
    <div className="schudle-block__item">
        <NumberUrok urokCount={props.urokCount} urokStart={props.urokStart} urokStop={props.urokStop}></NumberUrok>
        <Lesson lesson={props.lesson} lessonType={props.lessonType} lessonClass={props.lessonClass}></Lesson>
        <Ocenka ocenka={props.ocenka}></Ocenka>
    </div>
  )
}

export default LessonWidget