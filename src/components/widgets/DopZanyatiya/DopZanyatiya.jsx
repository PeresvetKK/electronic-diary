import React, { useContext } from 'react'
import classes from './DopZanyatiya.scss'
import DopZanyatiyaItem from './DopZanyatiyaItem/DopZanyatiyaItem'
import { UserContext } from '../../Loyout/Loyout'

const DopZanyatiya = ({dopZanData, title, ...props}) => {
    const userData = useContext(UserContext)
    return (
        <div className='dopzan-block block-widget row__item'>
            <div className="block-widget__header">
                <h3 className="block-widget__title text-s font-b">{title}</h3>
            </div>
            <div className="dopzan-block__items block-widget__items">
                {userData.dopZanyatiya.map((item, index) => 
                    <DopZanyatiyaItem date={item.date} predmet={item.predmet} key={index}></DopZanyatiyaItem>
                )}
            </div>
        </div>
    )
}

export default DopZanyatiya