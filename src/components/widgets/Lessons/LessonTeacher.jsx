import React from 'react'
import s from './LessonTeacher.module.scss'
import LessonItem from './LessonItem/LessonItem'
import NumberUrok from './NumberUrok/NumberUrok'
import {EditSVG, RunManSVG} from '../../../resources/svg'
import {Link} from 'react-router-dom'

const LessonTeacher = ({urok}) => {

    return (
        // строка расписания. Получает массив объектов, в котором данные для заполнения контента
        <div className={s.item}>
            <div className={s.textbox}>
                <div className={s.item__cell}>
                    <NumberUrok
                        urokCount={urok.lessonNumber} 
                        urokStart="8:00" 
                        urokStop="8:40"
                    />
                </div>
                <div className={s.item__cell}>
                    <LessonItem
                        lesson={urok.subject.name} 
                        lessonType={urok.lessonType} 
                        lessonClass={`${urok.classNumber} ${urok.classLetter}`}
                    />
                </div>
                <div className={s.item__cell}>
                    <div className={s.textbox__text}>
                        Класс: <span>{`${urok.classNumber} ${urok.classLetter}`}</span>
                    </div> 
                </div>
                <div className={s.item__cell}>
                    {urok.classroomNumber != '' && urok.classroomNumber !== null 
                        ? <div className={s.textbox__text}>
                            Кабинет: <span>{urok.classroomNumber}</span>
                          </div> 
                        : null
                    }
                </div>
                <div className={s.item__cell}>
                    <Link to={`/edit-lesson/${urok._id}`}>
                        <EditSVG/>
                    </Link>
                </div>
            </div>
            {urok.peremenaLength != ''
                ? <div className={s.peremena}>
                    <RunManSVG></RunManSVG>
                    <p className={s.peremena__text}>Перемена {urok.peremenaLength} минут</p>
                 </div>
                : false
            }
        </div>
    )
}

export default LessonTeacher