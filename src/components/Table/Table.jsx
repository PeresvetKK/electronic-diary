import React from 'react';
import './Table.scss';
import CellText from './CellText/CellText';
import Row from './Row/Row';
import { useState } from 'react';

const Table = ({children, ...props}) => {
    const [value, setValue] = useState('')
  return (
    <div className='table-item'>
        {props.title &&
            <div className='table-date'>
                <h2>Понедельник <span>{props.date}</span></h2>
            </div>
        }
        <div className={'table'}>
            {children}
        </div>
    </div>
  )
}

export default Table