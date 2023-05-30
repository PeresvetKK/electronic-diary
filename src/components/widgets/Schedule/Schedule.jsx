import React, { useState } from 'react'
import classes from './Schedule.scss'
import Button from '../../UI/button/Button'
import Lesson from '../Lessons/Lesson'
import Tabs from '../../Tabs/Tabs'
import TabNavItem from '../../Tabs/TabNavItem/TabNavItem'
import TabContent from '../../Tabs/TabContent/TabContent'

const Schedule = ({ countTabData, objectsData, ...props }) => {
    // содержит информацию о уроках
    const schudleArray = objectsData
    
    // хук для логики табов
    const [activeTab, setActiveTab] = useState(`${schudleArray[0].id}`);

    return (
        <div className={`schudle-block block-widget row__item`}>
            <Tabs>
                <div className="block-widget__header">
                    <p className="block-widget__title text-s font-b">{props.title}</p>
                    <div className="tabs__btns block-widget__header_right">
                        {schudleArray.map((object, index) =>
                            <TabNavItem title={object.title} id={object.id} activeTab={activeTab} setActiveTab={setActiveTab} key={index}/>
                        )}
                    </div>
                </div>
                <div className="tabs__content schudle-block__items block-widget__items">
                    {schudleArray.map((object, index) =>
                        <TabContent id={object.id} activeTab={activeTab} key={index}>
                            {/* Создает элемент виджета расписания (номер урока, название, оценка) */}
                            {object.lessons.map((object, index) =>
                                <Lesson posts={object} key={index} />
                            )}
                        </TabContent>
                    )}
                </div>
            </Tabs>
        </div>
    )
}

export default Schedule