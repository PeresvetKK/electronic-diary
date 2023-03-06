import React from 'react'
import classes from './NewsWidget.scss'
import NewsWidgetItem from './NewsWidgetItem/NewsWidgetItem'

const NewsWidget = ({newsData, title, ...props}) => {
    return (
        <div className='news-block block-widget row__item'>
            <div className="block-widget__header">
                <h3 className="block-widget__title text-s font-b">{title}</h3>
            </div>
            <div className="news-block__items block-widget__items">
                {newsData.map((item, index) =>
                    <NewsWidgetItem
                        date={item.date}
                        title={item.title}
                        text={item.text}
                        key={index}>
                    </NewsWidgetItem>
                )}
            </div>
        </div>
    )
}

export default NewsWidget