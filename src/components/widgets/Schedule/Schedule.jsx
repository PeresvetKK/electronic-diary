import React, {useState, useContext} from 'react'
import { UserContext } from '../../Loyout/Loyout'
import './Schedule.scss'
import Tabs from '../../Tabs/Tabs'
import Button from '../../UI/button/Button'
import TabContent from '../../Tabs/TabContent/TabContent'

const Schedule = ({children, title}) => {
    const userData = useContext(UserContext)
    const tabContent = userData.schedule.slice(0, 2)
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
    
    return (
        <div className={`schudle-block block-widget row__item ${userData.role === 'Учитель' ? 'schudle-block-teacher' : ''}`}>
            <Tabs 
                title={title}>
                    <div className="tabs__btns block-widget__header_right">
                        <Button>Сегодня</Button>
                        <Button>Завтра</Button>
                    </div>
                    <div className="tabs__content schudle-block__items block-widget__items">
                        <TabContent>
                            {tabContent[0].lessons.map((object, index) =>
                                addPropsToChildren(children, {'key': index, 'posts': object})
                            )}
                        </TabContent>

                        <TabContent>
                            {tabContent[1].lessons.map((object, index) =>
                                addPropsToChildren(children, {'key': index, 'posts': object})
                            )}
                        </TabContent>
                    </div>
            </Tabs>
        </div>
    )
}

export default Schedule