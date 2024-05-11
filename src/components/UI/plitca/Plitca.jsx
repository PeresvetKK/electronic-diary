import React from 'react'
import './Plitca.scss';
import { PlusSVG } from '../../../resources/svg';

const Plitca = ({children, ...props}) => {
  return (
    <div className="plitca">
        <p className="plitca__title">
            {children}
        </p>
        <div className="plitca__svg">
            <PlusSVG/>
        </div>
    </div>
  )
}

export default Plitca