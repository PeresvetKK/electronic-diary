import React from 'react'
import classes from './LessonWidget.scss'
import Ocenka from './Ocenka/Ocenka'
import Lesson from './Lesson/Lesson'
import NumberUrok from './NumberUrok/NumberUrok'
import RunPeople from '../Icons/RunPeople'

const LessonWidget = (posts) => {
    return (
        <div className="schudle-block__item">
            <div className="schudle-block__inner_item">
                <NumberUrok urokCount={posts.posts.urokCount} urokStart={posts.posts.urokStart} urokStop={posts.posts.urokStop}></NumberUrok>
                <Lesson lesson={posts.posts.lesson} lessonType={posts.posts.lessonType} lessonClass={posts.posts.lessonClass}></Lesson>
                <Ocenka ocenka={posts.posts.ocenka}></Ocenka>
            </div>
            {posts.posts.peremenaLength != ''
                ? <div className="schudle-block__item_peremena">
                    <RunPeople></RunPeople>
                    <p className="peremena-item">Перемена {posts.posts.peremenaLength} минут</p>
                 </div>
                : false
            }
        </div>
    )
}

export default LessonWidget