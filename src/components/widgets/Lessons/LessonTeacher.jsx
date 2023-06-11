import React from 'react'
import s from './LessonTeacher.module.scss'
import LessonItem from './LessonItem/LessonItem'
import NumberUrok from './NumberUrok/NumberUrok'
import {EditSVG, RunManSVG} from '../../../resources/svg'
import {Link} from 'react-router-dom'

const LessonTeacher = ({posts}) => {
    return (
        // строка расписания. Получает массив объектов, в котором данные для заполнения контента
        <div className={s.item}>
            <div className={s.textbox}>
                <div className={s.item__cell}>
                    <NumberUrok
                        urokCount={posts.urokCount} 
                        urokStart={posts.urokStart} 
                        urokStop={posts.urokStop}
                    />
                </div>
                <div className={s.item__cell}>
                    <LessonItem
                        lesson={posts.lesson} 
                        lessonType={posts.lessonType} 
                        lessonClass={posts.lessonClass}
                    />
                </div>
                <div className={s.item__cell}>
                    {posts.classLesson != '' && posts.classLesson != null
                        ? <div className={s.textbox__text}>
                            Класс: <span>{posts.classLesson}</span>
                          </div> 
                        : null
                    }
                </div>
                <div className={s.item__cell}>
                    {posts.cabinet != '' && posts.cabinet !== null 
                        ? <div className={s.textbox__text}>
                            Кабинет: <span>{posts.cabinet}</span>
                          </div> 
                        : null
                    }
                </div>
                <div className={s.item__cell}>
                    {posts.lesson != '' && posts.lesson !== null
                        ?<Link to={`/edit-lesson/${15}`}>
                            <EditSVG/>
                        </Link>
                        : null
                    }
                </div>
            </div>
            {posts.peremenaLength != ''
                ? <div className={s.peremena}>
                    <RunManSVG></RunManSVG>
                    <p className={s.peremena__text}>Перемена {posts.peremenaLength} минут</p>
                 </div>
                : false
            }
        </div>
    )
}

export default LessonTeacher