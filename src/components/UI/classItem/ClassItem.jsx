import React from 'react';
import './ClassItem.scss';
import { Link } from 'react-router-dom';

const ClassItem = ({classInfo, children, ...props}) => {
    
    return(
        <div className='class-item'>
            <div className="class-item-header">
                <Link 
                    className="class-item-header__title"
                    to={`/admin/classes/${classInfo._id}`}
                >
                    {`${classInfo.classNumber} ${classInfo.classLetter}`}
                    </Link>
                {children}
            </div>
            <div className="class-item-main">
                <p className="class-item__item">
                    Класрук: <span>{`
                    ${classInfo.classTeacher.lastName} ${classInfo.classTeacher.firstName} ${classInfo.classTeacher.lastLastName}`}</span>
                </p>
                <p className="class-item__item">
                    Учеников в классе: <span>{classInfo.students.length}</span>
                </p>
            </div>
        </div>
    )
}


export default ClassItem