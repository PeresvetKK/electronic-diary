import React from 'react'
import classes from './DopZanyatiyaWidget.scss'
import DopZanyatiyaWidgetItem from './DopZanyatiyaWidgetItem/DopZanyatiyaWidgetItem'

const DopZanyatiyaWidget = ({dopZanData, title, ...props}) => {
    return (
        <div className='dopzan-block block-widget row__item'>
            <div className="block-widget__header">
                <h3 className="block-widget__title text-s font-b">{title}</h3>
            </div>
            <div className="dopzan-block__items block-widget__items">
                {dopZanData.map((item, index) => 
                    <DopZanyatiyaWidgetItem date={item.date} predmet={item.predmet} key={index}></DopZanyatiyaWidgetItem>
                )}
            </div>
        </div>
    )
}

export default DopZanyatiyaWidget