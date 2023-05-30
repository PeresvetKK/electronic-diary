import React from 'react'
import classes from './Lesson.scss'
import Ocenka from './Ocenka/Ocenka'
import LessonItem from './LessonItem/LessonItem'
import NumberUrok from './NumberUrok/NumberUrok'
import {RunManSVG} from '../../../resources/svg'

const Lesson = (posts) => {
    return (
        // строка расписания. Получает массив объектов, в котором данные для заполнения контента
        <div className="schudle-block__item">
            <div className="schudle-block__inner_item">
                <NumberUrok urokCount={posts.posts.urokCount} urokStart={posts.posts.urokStart} urokStop={posts.posts.urokStop}></NumberUrok>
                <LessonItem lesson={posts.posts.lesson} lessonType={posts.posts.lessonType} lessonClass={posts.posts.lessonClass}></LessonItem>
                <Ocenka ocenka={posts.posts.ocenka}></Ocenka>
            </div>
            {posts.posts.peremenaLength != ''
                ? <div className="schudle-block__item_peremena">
                    <RunManSVG></RunManSVG>
                    <p className="peremena-item">Перемена {posts.posts.peremenaLength} минут</p>
                 </div>
                : false
            }
        </div>
    )
}

export default Lesson