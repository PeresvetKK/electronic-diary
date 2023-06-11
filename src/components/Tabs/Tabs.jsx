import React, { useState } from 'react';
import './Tabs.scss';
import Button from '../UI/button/Button';
import TabContent from './TabContent/TabContent';

const Tabs = ({classes, title, children}) => {
     // хук для логики табов
    const [activeTab, setActiveTab] = useState(0);
    
    return (
        <div className="tabs">
            <div className={`block-widget__header`}>
                {title != null &&
                    <p className="block-widget__title text-s font-b">{title}</p>
                }
                <div className={children[0].props.className}>
                    {children[0].props.children.map((button, index) => (
                        <Button 
                            key={index} 
                            onClick={() => setActiveTab(index)} 
                            classNameElement={activeTab === index ? "active" : ""}
                        >
                            {button.props.children}
                        </Button>
                    ))}
                </div>
            </div>
                <div className={children[1].props.className}>
                    {children[1].props.children.map((content, index) => (
                        <TabContent 
                            key={index} 
                            activeTab={activeTab}
                            id={index}
                        >
                            {content.props.children}
                        </TabContent>
                    ))}
                </div>
        </div>
    )
}

export default Tabs;
