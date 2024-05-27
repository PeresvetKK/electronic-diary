import React, { useEffect, useState } from 'react';
import './Schedule.scss';
import { ScheduleService } from '../../../services/scheduleService';
import WhiteBox from '../../../components/UI/whiteBox/WhiteBox';
import PageTitle from '../../../components/UI/pageTitle/PageTitle';
import MainLoader from '../../../components/Loader/MainLoader/MainLoader';
import GoBack from '../../../components/UI/goBack/GoBack';
import { useNavigate } from 'react-router-dom';

const Schedule = () => {
    const navigate = useNavigate();
    const [schedule, setSchedule] = useState([])

    const goBack = () => navigate(-1);

    const fetchData = async () => {
        const response = await ScheduleService.getSchedule()
        setSchedule(response)
    }
    useEffect(() => {
        fetchData();
    }, [])
    console.log(schedule)
    return (
        <div className='schedule-page'>
            <GoBack onClick={() => goBack()}/>
            {schedule.length > 0
            ?<WhiteBox>
                <PageTitle>Расписание</PageTitle>
                <div className="schedule">
                    {schedule.map(day => (
                        <div className="schedule-box">
                            <div className="schedule-day__name">
                                <span>{day.day}</span>
                            </div>
                        
                            <div className='schedule-day' key={day.day}>
                                <div className="schedule-numbers">
                                    <span className="schedule-numbers__item">1</span>
                                    <span className="schedule-numbers__item">2</span>
                                    <span className="schedule-numbers__item">3</span>
                                    <span className="schedule-numbers__item">4</span>
                                    <span className="schedule-numbers__item">5</span>
                                    <span className="schedule-numbers__item">6</span>
                                    <span className="schedule-numbers__item">7</span>
                                    <span className="schedule-numbers__item">8</span>
                                </div>
                                <div className="schedule-day-classes">
                                    {day.classes.map((schoolClass, index) => (
                                        <div className='schedule-class' key={index}>
                                            <p className="schedule-class__name">{schoolClass.classNumber} {schoolClass.classLetter}</p>
                                            {schoolClass.lessons.map((lesson, key) => (
                                                <div className="schedule-lesson" key={key}>
                                                    <p className="schedule-lesson__subject">{lesson.subjectName}</p>
                                                    <p className="schedule-lesson__teacher">
                                                        {`${lesson.teacher.lastName} ${lesson.teacher.firstName} ${lesson.teacher.lastLastName}`}
                                                    </p>
                                                    <p className="schedule-lesson__classroom">кабинет: {lesson.classroomNumber}</p>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </WhiteBox>

            : <MainLoader/>
            }
        </div>
    )
}

export default Schedule