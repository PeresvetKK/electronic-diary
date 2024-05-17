import React from 'react';
import './GoBack.scss';

const GoBack = ({...props}) => {
  return (
    <div className='goback' {...props}>
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="36" height="36" rx="18" fill="#fff"/>
            <path d="M11 18H25" stroke="#8C0D18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 13L11 18" stroke="#8C0D18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 23L11 18" stroke="#8C0D18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Назад
    </div>
  )
}

export default GoBack