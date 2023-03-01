import React from 'react'
import classes from './Schedule.scss'
import Button from '../../UI/button/Button'
import LessonWidget from '../../UI/LessonWidget/LessonWidget'
import Peremena from '../../UI/LessonWidget/Peremena/Peremena'

const Schedule = (props) => {
    return (
        <div className={`schudle-block block-widget ${props.class}`}>
            <div className="block-widget__header">
                <p className="block-widget__title text-s font-b">{props.title}</p>
                <div className="block-widget__header_right">
                    <Button class="btn-orange">Сегодня</Button>
                    <Button class="btn-disabled">Завтра</Button>
                </div>
            </div>
            <div className="schudle-block__items block-widget__items">
                <LessonWidget 
                    urokCount="1" 
                    urokStart="8:30" 
                    urokStop="9:10"
                    lesson="Русский язык" 
                    lessonType="Контрольная" 
                    lessonClass="schudle-block-lesson__control"
                    ocenka="5">
                </LessonWidget>
                <Peremena peremenaLength="10"></Peremena>

                <LessonWidget 
                    urokCount="1" 
                    urokStart="8:30" 
                    urokStop="9:10"
                    lesson="Русский язык" 
                    lessonType="Контрольная" 
                    lessonClass="schudle-block-lesson__control"
                    ocenka="5">
                </LessonWidget>
                <Peremena peremenaLength="10"></Peremena>

                <LessonWidget 
                    urokCount="1" 
                    urokStart="8:30" 
                    urokStop="9:10"
                    lesson="Русский язык" 
                    lessonType="Контрольная" 
                    lessonClass="schudle-block-lesson__control"
                    ocenka="5">
                </LessonWidget>
            </div>
        </div>
    )
}

export default Schedule