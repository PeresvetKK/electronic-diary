import React from 'react';
import './PageTitle.scss';

const PageTitle = ({children, ...props}) => {
  return    (
    <h1 className="pagetitle">
        {children}
    </h1>
  )
}

export default PageTitle