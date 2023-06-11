import React, {useContext} from 'react'
import { UserContext } from '../../Loyout/Loyout'
import './HoumWork.scss'
import HoumWorkItem from './HoumWorkItem/HoumWorkItem'

const HoumWork = ({title}) => {
    const userData = useContext(UserContext)
    return (
        <div className={`houmwork-block block-widget row__item`}>
            <div className="block-widget__header">
                <p className="block-widget__title text-s font-b">{title}</p>
            </div>
            <div className="houmwork-block__items block-widget__items">
                {userData.schedule.map((object) =>
                    object.lessons.map((element, index) =>
                        <HoumWorkItem date={element.date} lesson={element.lesson} dz={element.dz} key={index}></HoumWorkItem>
                    )
                )}
            </div>
        </div>
    )
}

export default HoumWork