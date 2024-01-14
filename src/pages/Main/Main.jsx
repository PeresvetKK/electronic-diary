import React, {useContext} from 'react';
import {useSelector} from 'react-redux';
import './Main.scss';
import {UserContext} from '../../components/Loyout/Loyout';

import HoumWork from '../../components/widgets/HoumWork/HoumWork';
import Messanger from '../../components/widgets/Messanger/Messanger';
import ScheduleTeacher from '../../components/widgets/Schedule/ScheduleTeacher';
import ScheduleStudent from '../../components/widgets/Schedule/ScheduleStudent';
import Grade from '../../components/widgets/Grade/Grade';
import DopZanyatiya from '../../components/widgets/DopZanyatiya/DopZanyatiya';
import News from '../../components/widgets/News/News';
import Lesson from '../../components/widgets/Lessons/Lesson';

const Main = () => {
    const userData = useContext(UserContext)
    const role = useSelector(state => state.user.userType);

    return (
        <section className="section">
            {role == 'Student'
                ? <>
                    <ScheduleStudent title="Расписание на"/>
                    <HoumWork title="Домашнее задание"></HoumWork>
                    <DopZanyatiya title="Дополнительные занятия"></DopZanyatiya>
                    <Grade gradeData={userData.gradeData}></Grade>
                    {/* s<Messanger title="Диалоги"></Messanger> */}
                </>
                : <>
                    <ScheduleTeacher role={role} title="Расписание на"/>
                    <DopZanyatiya title="Дополнительные занятия"></DopZanyatiya>
                </>
            }
            <News title="Новости"></News>
            
        </section>
    )
}

export default Main
