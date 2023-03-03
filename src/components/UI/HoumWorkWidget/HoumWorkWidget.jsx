import React from 'react'
import classes from './HoumWorkWidget.scss'
import HoumWorkItem from './HoumWorkItem/HoumWorkItem'

const HoumWork = (props) => {
  return (
    <div className={`houmwork-block block-widget ${props.class}`}>
            <div className="block-widget__header">
                <p className="block-widget__title text-s font-b">{props.title}</p>
            </div>
            <div className="houmwork-block__items block-widget__items">
                <HoumWorkItem date="5 марта" predmet='Русский язык' dz='стр. 25, упр. 48 - 52'></HoumWorkItem>
                <HoumWorkItem date="6 марта" predmet='Математика' dz='подготовка к контрольной работе'></HoumWorkItem>
                <HoumWorkItem date="7 марта" predmet='Информатика' dz='Решить пробник ЕГЭ'></HoumWorkItem>
            </div>
        </div>
  )
}

export default HoumWork