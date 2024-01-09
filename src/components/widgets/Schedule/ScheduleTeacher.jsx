import React, {useState, useContext, useEffect} from 'react'
import {useSelector} from 'react-redux'
import './Schedule.scss'
import Tabs from '../../Tabs/Tabs'
import Button from '../../UI/button/Button'
import TabContent from '../../Tabs/TabContent/TabContent'
import {ScheduldeService} from '../../../services/scheduleService';
import LessonTeacher from '../Lessons/LessonTeacher'
import LoaderWidtgetSchedule from '../../Loader/LoaderWidtgetSchedule';


const formatDate = (date) => {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear(); // Изменено для вывода полного года
    return `${dd}.${mm}.${yyyy}`;
}
const todayDate = formatDate(new Date())
const tomorrowDate = formatDate(new Date(new Date().setDate(new Date().getDate() + 1)));

const Schedule = ({title}) => {
    const userName = useSelector(state => state.user.userName);
    const [schedule, setSchedule] = useState([])
    
    useEffect(() => {
        const fetchData = async () => {
            // объединяю в одну строку ФИО
            let userNameArray = userName.split(' ')
            const data = await ScheduldeService.getTeacherSchedule(userNameArray[0], userNameArray[1], userNameArray[2], todayDate, tomorrowDate)
            setSchedule(data.teacherSchedule)
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
        schedule.length > 0
        ? <div className={`schudle-block block-widget row__item schudle-block-teacher`}>
            <Tabs title={title}>
                <div className="tabs__btns block-widget__header_right">
                    <Button>Сегодня</Button>
                    <Button>Завтра</Button>
                </div>
                <div className="tabs__content schudle-block__items block-widget__items">
                    <TabContent>
                        {filteredByFirstDate.length > 0
                            ? filteredByFirstDate.map((object, index) => 
                                <LessonTeacher key={index} urok={object}/>
                              )
                            : <span>уроков нет</span>
                        }
                    </TabContent>

                    <TabContent>
                        {filteredBySecondDate.length > 0 
                            ? filteredBySecondDate.map((object, index) => 
                                <LessonTeacher key={index} urok={object}/>
                              )
                            : <span>уроков нет</span>
                        }
                    </TabContent>
                </div>
            </Tabs>
          </div>
        : <LoaderWidtgetSchedule />
    )
}

export default Schedule