import React from 'react'
import classes from './HoumWorkWidget.scss'
import HoumWorkItem from './HoumWorkItem/HoumWorkItem'

const HoumWork = ({title, houmworkData}) => {
  return (
    <div className={`houmwork-block block-widget row__item`}>
            <div className="block-widget__header">
                <p className="block-widget__title text-s font-b">{title}</p>
            </div>
            <div className="houmwork-block__items block-widget__items">
              {houmworkData.map((dataElement, index) => 
                <HoumWorkItem date={dataElement.date} predmet={dataElement.predmet} dz={dataElement.dz} key={index}></HoumWorkItem>
              )}
            </div>
        </div>
  )
}

export default HoumWork