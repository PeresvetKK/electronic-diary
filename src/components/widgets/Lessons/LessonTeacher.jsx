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
                        urokCount={urok.lessonNumber} 
                        urokStartEnd={getTimesLessons(urok.lessonNumber)}
                    />
                </div>
                <div className={s.item__cell}>
                    <LessonItem
                        lesson={urok.subjectName} 
                        lessonType={urok.lessonType} 
                        lessonClass={`${urok.class.classNumber} ${urok.class.classLetter}`}
                    />
                </div>
                <div className={s.item__cell}>
                    <div className={s.textbox__text}>
                        Класс: <span>{`${urok.class.classNumber} ${urok.class.classLetter}`}</span>
                    </div> 
                </div>
                <div className={s.item__cell}>
                    {urok.classroomNumber !== '' && urok.classroomNumber !== null 
                        ? <div className={s.textbox__text}>
                            Кабинет: <span>{urok.classroomNumber}</span>
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
                            <Link className='dropdown-content__item' state={{ urok: urok }} to={`/edit-lesson/${urok.class.classNumber}/${urok.class.classLetter}/${urok._id}`}>
                                <InfoSVG/>
                                Страница урока
                            </Link>
                            <Link className="dropdown-content__item" to={`/journal/${urok.class._id}/${urok.subjectName}`}>
                                <BlackJournalSVG/>
                                Журнал класса
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className={s.peremena}>
                <RunManSVG></RunManSVG>
                <p className={s.peremena__text}>Перемена {getPeremenaSize(urok.lessonNumber)} минут</p>
                </div>
        </div>
    )
}

export default LessonTeacher