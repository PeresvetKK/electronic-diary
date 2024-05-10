import React, {useState, useEffect} from 'react'

import { useSelector } from 'react-redux';
import { HomeWorkService } from '../../../services/homeWorkService';
import HoumWorkItem from './HoumWorkItem/HoumWorkItem';
import './HoumWork.scss';

const HoumWork = ({title}) => {
    const formatDate = (date) => {
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yyyy = date.getFullYear(); // Изменено для вывода полного года
        return `${dd}.${mm}.${yyyy}`;
    }
    const todayDate = formatDate(new Date())

    const {userNumberClass, userLetterClass} = useSelector(state => state.user);
    const [homeWork, setHomeWork] = useState([])
    useEffect(( ) => {
        const fetchData = async () => {
            const data = await HomeWorkService.getHomeWork(userNumberClass, userLetterClass, todayDate, todayDate)
            setHomeWork(data.homeworkList)
        }

        fetchData()
    })

    return (
        <div className={`houmwork-block block-widget row__item`}>
            <div className="block-widget__header">
                <p className="block-widget__title text-s font-b">{title}</p>
            </div>
            <div className="houmwork-block__items block-widget__items">
                {homeWork.map((object, index) => (
                    <HoumWorkItem 
                        date={object.dueDate} 
                        lesson={object.subject.name} 
                        dz={object.homework} 
                        key={index} 
                    />)   
                )}
            </div>
        </div>
    )
}

export default HoumWork