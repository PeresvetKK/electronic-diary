import React from 'react'
import classes from './MessangerItem.scss'

const MessangerItem = () => {
    return (
        <div className="message-block__item">
            <a href="#" className="userbox__icon teacher__icon">
                <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="24" height="24" fill="white"></rect> <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z" fill="#F2F2F2"></path> </g></svg>
            </a>
            <p className="teacher__name">Литовченко Арина Игоревна</p>
            <p className="teacher__dolzhnost">Математика</p>
        </div>
    )
}

export default MessangerItem