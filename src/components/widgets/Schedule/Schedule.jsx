import React, {useState, useContext} from 'react'
import { UserContext } from '../../Loyout/Loyout'
import './Schedule.scss'
import Lesson from '../Lessons/Lesson'
import Tabs from '../../Tabs/Tabs'
import TabNavItem from '../../Tabs/TabNavItem/TabNavItem'
import TabContent from '../../Tabs/TabContent/TabContent'
import LessonTeacher from '../Lessons/LessonTeacher'

function addPropsToReactElement(element, props) {
    if (React.isValidElement(element)) {
      return React.cloneElement(element, props)
    }
    return element
}
function addPropsToChildren(children, props) {
    if (!Array.isArray(children)) {
      return addPropsToReactElement(children, props)
    }
    return children.map(childElement =>
      addPropsToReactElement(childElement, props)
    )
}

const Schedule = ({countTabData, children, ...props }) => {
    const userData = useContext(UserContext)
    
    // хук для логики табов
    const [activeTab, setActiveTab] = useState(`${userData.schedule[0].id}`);

    return (
        <div className={`schudle-block block-widget row__item ${userData.role === 'Учитель' ? 'schudle-block-teacher' : ''}`}>
            <Tabs>
                <div className="block-widget__header">
                    <p className="block-widget__title text-s font-b">{props.title}</p>
                    <div className="tabs__btns block-widget__header_right">
                        {userData.schedule.map((object, index) =>
                            <TabNavItem title={object.title} id={object.id} activeTab={activeTab} setActiveTab={setActiveTab} key={index}/>
                        )}
                    </div>
                </div>
                <div className="tabs__content schudle-block__items block-widget__items">
                    {userData.schedule.map((object, index) =>
                        <TabContent id={object.id} activeTab={activeTab} key={index}>
                            {object.lessons.map((object, index) =>
                                addPropsToChildren(children, {'key': index, 'posts': object})
                            )}
                        </TabContent>
                    )}
                </div>
            </Tabs>
        </div>
    )
}

export default Schedule