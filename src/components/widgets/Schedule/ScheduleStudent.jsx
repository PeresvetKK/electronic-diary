import React, {useState, useContext, useEffect} from 'react'
import {useSelector} from 'react-redux'
import './Schedule.scss'
import Tabs from '../../Tabs/Tabs'
import Button from '../../UI/button/Button'
import TabContent from '../../Tabs/TabContent/TabContent'
import {ScheduleService} from '../../../services/scheduleService';
import LessonTeacher from '../Lessons/LessonTeacher'


const formatDate = (date) => {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear(); // Изменено для вывода полного года
    return `${dd}.${mm}.${yyyy}`;
}
const todayDate = formatDate(new Date())
const tomorrowDate = formatDate(new Date(new Date().setDate(new Date().getDate() + 1)));

const Schedule = ({children, title, role}) => {
    const {userInfo} = useSelector(state => state.user);
    const [schedule, setSchedule] = useState([])
    
    useEffect(() => {
        const fetchData = async () => {
            const data = await ScheduleService.getSchedule(userInfo.class, todayDate, tomorrowDate)
            setSchedule(data.homeworkList)
        }
        fetchData()
    }, [])

    const filteredByFirstDate = schedule.filter(obj => {
        const formattedDate = formatDate(new Date(obj.date));
        return formattedDate === todayDate;
        });
        
    const filteredBySecondDate = schedule.filter(obj => {
        const objDate = new Date(obj.date);
        const formattedDate = formatDate(objDate);
        return formattedDate === tomorrowDate;
    });

    return (
        <div className={`schudle-block block-widget row__item ${role === 'Teacher' ? 'schudle-block-teacher' : ''}`}>
            <Tabs title={title}>
                <div className="tabs__btns block-widget__header_right">
                    <Button>Сегодня</Button>
                    <Button>Завтра</Button>
                </div>
                <div className="tabs__content schudle-block__items block-widget__items">
                    <TabContent>
                        {filteredByFirstDate.map((object, index) => {
                            <LessonTeacher urok={object}/>
                        })}
                    </TabContent>

                    <TabContent>
                        {filteredBySecondDate.map((object, index) => {
                            <LessonTeacher urok={object}/>
                        })}
                    </TabContent>
                </div>
            </Tabs>
        </div>
    )
}

export default Schedule