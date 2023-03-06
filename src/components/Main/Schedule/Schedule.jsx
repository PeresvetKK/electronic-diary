import React from 'react'
import classes from './Schedule.scss'
import Button from '../../UI/button/Button'
import LessonWidget from '../../UI/LessonWidget/LessonWidget'

const Schedule = ({objectsData, ...props}) => {
    const schudleArray = objectsData
    return (
        <div className={`schudle-block block-widget row__item`}>
            <div className="block-widget__header">
                <p className="block-widget__title text-s font-b">{props.title}</p>
                <div className="block-widget__header_right">
                    <Button className="btn-orange">Сегодня</Button>
                    <Button className="btn-disabled">Завтра</Button>
                </div>
            </div>
            <div className="schudle-block__items block-widget__items">
                {schudleArray.map((object, index) => 
                    <LessonWidget posts={object} key={index}> </LessonWidget>
                )}                
            </div>
        </div>
    )
}

export default Schedule