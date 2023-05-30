import React from 'react'
import classes from './DopZanyatiya.scss'
import DopZanyatiyaItem from './DopZanyatiyaItem/DopZanyatiyaItem'

const DopZanyatiya = ({dopZanData, title, ...props}) => {
    return (
        <div className='dopzan-block block-widget row__item'>
            <div className="block-widget__header">
                <h3 className="block-widget__title text-s font-b">{title}</h3>
            </div>
            <div className="dopzan-block__items block-widget__items">
                {dopZanData.map((item, index) => 
                    <DopZanyatiyaItem date={item.date} predmet={item.predmet} key={index}></DopZanyatiyaItem>
                )}
            </div>
        </div>
    )
}

export default DopZanyatiya