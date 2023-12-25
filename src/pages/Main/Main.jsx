import React, {useContext} from 'react';
import './Main.scss';
import {UserContext} from '../../components/Loyout/Loyout';

import HoumWork from '../../components/widgets/HoumWork/HoumWork';
import Messanger from '../../components/widgets/Messanger/Messanger';
import Schedule from '../../components/widgets/Schedule/Schedule';
import Grade from '../../components/widgets/Grade/Grade';
import DopZanyatiya from '../../components/widgets/DopZanyatiya/DopZanyatiya';
import News from '../../components/widgets/News/News';
import Lesson from '../../components/widgets/Lessons/Lesson';
import LessonTeacher from '../../components/widgets/Lessons/LessonTeacher';

const Main = () => {
    const userData = useContext(UserContext)
    return (
        <section className="section">
            {userData.role == 'Ученик'
                ? <>
                    <Schedule title="Расписание на">
                        <Lesson/>
                    </Schedule>
                    <HoumWork title="Домашнее задание"></HoumWork>
                    <DopZanyatiya title="Дополнительные задания"></DopZanyatiya>
                    <Grade gradeData={userData.gradeData}></Grade>
                    {/* s<Messanger title="Диалоги"></Messanger> */}
                </>
                : <>
                    <Schedule title="Расписание на">
                        <LessonTeacher/>
                    </Schedule>
                    <DopZanyatiya title="Дополнительные задания"></DopZanyatiya>
                </>
            }
            <News title="Новости"></News>
            
        </section>
    )
}

export default Main
