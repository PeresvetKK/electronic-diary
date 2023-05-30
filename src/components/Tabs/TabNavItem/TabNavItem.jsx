import React from "react";
import Button from '../../UI/button/Button'

const TabNavItem = ({ id, title, activeTab, setActiveTab }) => {

    const handleClick = () => {
        setActiveTab(id);
    };

    return (
        <Button onClick={handleClick} classNameElement={activeTab === id ? "active" : ""}>
            {title}        
        </Button>
    );
};
export default TabNavItem;