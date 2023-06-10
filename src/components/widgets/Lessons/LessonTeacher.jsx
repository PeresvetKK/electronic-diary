import React from 'react'
import './Lesson.scss'
import Ocenka from './Ocenka/Ocenka'
import LessonItem from './LessonItem/LessonItem'
import NumberUrok from './NumberUrok/NumberUrok'
import {RunManSVG} from '../../../resources/svg'

const LessonTeacher = ({posts}) => {
    return (
        // строка расписания. Получает массив объектов, в котором данные для заполнения контента
        <div className="schudle-block__item">
            <div className="schudle-block__inner_item">
                <NumberUrok urokCount={posts.urokCount} urokStart={posts.urokStart} urokStop={posts.urokStop}></NumberUrok>
                <LessonItem lesson={posts.lesson} lessonType={posts.lessonType} lessonClass={posts.lessonClass}></LessonItem>
                {posts.cabinet != '' ? <span>Кабинет: {posts.cabinet}</span> : null}
                {posts.classLesson != '' ? <span>Класс: {posts.classLesson}</span> : null}
            </div>
            {posts.peremenaLength != ''
                ? <div className="schudle-block__item_peremena">
                    <RunManSVG></RunManSVG>
                    <p className="peremena-item">Перемена {posts.peremenaLength} минут</p>
                 </div>
                : false
            }
        </div>
    )
}

export default LessonTeacher