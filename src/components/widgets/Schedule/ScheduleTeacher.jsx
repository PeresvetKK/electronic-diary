import React, { useState, useEffect } from 'react';
import './Schedule.scss';
import Tabs from '../../Tabs/Tabs';
import Button from '../../UI/button/Button';
import TabContent from '../../Tabs/TabContent/TabContent';
import { ScheduleService } from '../../../services/scheduleService';
import LessonTeacher from '../Lessons/LessonTeacher';
import NoLessons from '../../Loader/NoLessons/NoLessons';
import TeacherSchedule from '../../Loader/TeacherSchedule/TeacherSchedule';
import { useSelector } from 'react-redux';

const formatDate = (date) => {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
};


const todayDate = formatDate(new Date());
const tomorrowDate = formatDate(new Date(new Date().setDate(new Date().getDate() + 1)));

const Schedule = ({ title }) => {
    const  userInfo = useSelector(state => state.user);
    const [schedule, setSchedule] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const todayLessons = await ScheduleService.getTeacherLessonsByDate(userInfo.id, todayDate);
                const tomorrowLessons = await ScheduleService.getTeacherLessonsByDate(userInfo.id, tomorrowDate);
                setSchedule([...todayLessons, ...tomorrowLessons]);
                setIsFetching(true);
            } catch (error) {
                console.error('Ошибка при получении расписания:', error);
            }
        };

        fetchData();
    }, [userInfo.id]);

    const filteredByFirstDate = schedule.filter((obj) => {
        const formattedDate = formatDate(new Date(obj.date));
        return formattedDate === todayDate;
    });

    const filteredBySecondDate = schedule.filter((obj) => {
        const formattedDate = formatDate(new Date(obj.date));
        return formattedDate === tomorrowDate;
    });

    return (
        isFetching ? (
            <div className={`schedule-block block-widget row__item schedule-block-teacher`}>
                <Tabs title={title}>
                    <div className="tabs__btns block-widget__header_right">
                        <Button>Сегодня</Button>
                        <Button>Завтра</Button>
                    </div>
                    <div className="tabs__content schedule-block__items block-widget__items">
                        <TabContent>
                            {filteredByFirstDate.length > 0 ? (
                                filteredByFirstDate.map((object, index) => (
                                    <LessonTeacher key={index} urok={object} />
                                ))
                            ) : (
                                <NoLessons title="сегодня" />
                            )}
                        </TabContent>
                        <TabContent>
                            {filteredBySecondDate.length > 0 ? (
                                filteredBySecondDate.map((object, index) => (
                                    <LessonTeacher key={index} urok={object} />
                                ))
                            ) : (
                                <NoLessons title="завтра" />
                            )}
                        </TabContent>
                    </div>
                </Tabs>
            </div>
        ) : (
            <div className={`schedule-block block-widget row__item schedule-block-teacher`}>
                <TeacherSchedule />
            </div>
        )
    );
};

export default Schedule;
