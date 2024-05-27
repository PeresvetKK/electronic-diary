import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './Schedule.scss';
import Tabs from '../../Tabs/Tabs';
import Button from '../../UI/button/Button';
import TabContent from '../../Tabs/TabContent/TabContent';
import { ScheduleService } from '../../../services/scheduleService';
import LessonTeacher from '../Lessons/LessonTeacher';

const formatDate = (date) => {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${dd}.${mm}.${yyyy}`;
};

const todayDate = formatDate(new Date());
const tomorrowDate = formatDate(new Date(new Date().setDate(new Date().getDate() + 1)));

const Schedule = ({ children, title, role }) => {
    const { userInfo } = useSelector((state) => state.user);
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await ScheduleService.getClassLessonsByDate(userInfo.classId, todayDate);
                setSchedule(data);
            } catch (error) {
                console.error('Ошибка при получении расписания:', error);
            }
        };

        fetchData();
    }, [userInfo.classId]);

    const filteredByFirstDate = schedule.filter((obj) => {
        const formattedDate = formatDate(new Date(obj.date));
        return formattedDate === todayDate;
    });

    const filteredBySecondDate = schedule.filter((obj) => {
        const formattedDate = formatDate(new Date(obj.date));
        return formattedDate === tomorrowDate;
    });

    return (
        <div className={`schedule-block block-widget row__item ${role === 'Teacher' ? 'schedule-block-teacher' : ''}`}>
            <Tabs title={title}>
                <div className="tabs__btns block-widget__header_right">
                    <Button>Сегодня</Button>
                    <Button>Завтра</Button>
                </div>
                <div className="tabs__content schedule-block__items block-widget__items">
                    <TabContent>
                        {filteredByFirstDate.map((object, index) => (
                            <LessonTeacher key={index} urok={object} />
                        ))}
                    </TabContent>
                    <TabContent>
                        {filteredBySecondDate.map((object, index) => (
                            <LessonTeacher key={index} urok={object} />
                        ))}
                    </TabContent>
                </div>
            </Tabs>
        </div>
    );
};

export default Schedule;
