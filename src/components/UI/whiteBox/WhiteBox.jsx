import React from 'react';
import './WhiteBox.scss';

const WhiteBox = ({classElement, children, ...props}) => {
  return (
    <section className={`whitebox ${classElement !== undefined ? classElement : ''}`}>
        {children}
    </section>
  )
}

export default WhiteBox