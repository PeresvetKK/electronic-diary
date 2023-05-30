import React, { useState } from 'react'
import classes from './Tabs.scss'


const Tabs = ({children, ...props}) => {
    
    return (
      <div className="tabs">
        {children}
      </div>
    );
  };
   
  export default Tabs;