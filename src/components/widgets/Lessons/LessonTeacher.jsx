import React, { useRef, useState } from 'react'
import s from './LessonTeacher.module.scss'
import LessonItem from './LessonItem/LessonItem'
import NumberUrok from './NumberUrok/NumberUrok'
import {BlackJournalSVG, InfoSVG, RunManSVG, ThreeDotsSVG} from '../../../resources/svg'
import {Link} from 'react-router-dom'
import { getTimesLessons } from '../../../hooks/getTimesLessons'
import { getPeremenaSize } from '../../../hooks/getPeremenaSize'

const LessonTeacher = ({urok}) => {
    console.log(urok)
    const catMenu = useRef(null)
    const [isOpen, setOpen] = useState(false);
    const closeOpenMenus = (e)=>{
        if(isOpen && !catMenu.current?.contains(e.target)){
          setOpen(false)
        }
    }
    document.addEventListener('mousedown',closeOpenMenus)
    return (
        // строка расписания. Получает массив объектов, в котором данные для заполнения контента
        <div className={s.item}>
            <div className={s.textbox}>
                <div className={s.item__cell}>
                    <NumberUrok
                        urokCount={urok.scheduleItem.lessonNumber} 
                        urokStartEnd={getTimesLessons(urok.scheduleItem.lessonNumber)}
                    />
                </div>
                <div className={s.item__cell}>
                    <LessonItem
                        lesson={urok.scheduleItem.subjectName} 
                        lessonType={urok.lessonType} 
                        lessonClass={`${urok.scheduleItem.class.classNumber} ${urok.scheduleItem.class.classLetter}`}
                    />
                </div>
                <div className={s.item__cell}>
                    <div className={s.textbox__text}>
                        Класс: <span>{`${urok.scheduleItem.class.classNumber} ${urok.scheduleItem.class.classLetter}`}</span>
                    </div> 
                </div>
                <div className={s.item__cell}>
                    {urok.scheduleItem.classroomNumber !== '' && urok.scheduleItem.classroomNumber !== null 
                        ? <div className={s.textbox__text}>
                            Кабинет: <span>{urok.scheduleItem.classroomNumber}</span>
                          </div> 
                        : null
                    }
                </div>
                <div className={[s.item__cell, s.item__drop]}>
                    <div className="dropdown" ref={catMenu}>
                        <div 
                            className="dropdown-header"
                            onClick={() => setOpen(!isOpen)}
                        >
                            <ThreeDotsSVG/>
                        </div>
                        <div className={`dropdown-content ${isOpen ? 'dropdown-active' : ''}`}>
                            <Link className='dropdown-content__item' to={`/edit-lesson/${urok.scheduleItem.class.classNumber}/${urok.scheduleItem.class.classLetter}/${urok._id}`}>
                                <InfoSVG/>
                                Страница урока
                            </Link>
                            <Link className="dropdown-content__item" to={`/journal/${urok.scheduleItem.class._id}/${urok.scheduleItem.subjectName}`}>
                                <BlackJournalSVG/>
                                Журнал класса
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className={s.peremena}>
                <RunManSVG></RunManSVG>
                <p className={s.peremena__text}>Перемена {getPeremenaSize(urok.scheduleItem.lessonNumber)} минут</p>
                </div>
        </div>
    )
}

export default LessonTeacher