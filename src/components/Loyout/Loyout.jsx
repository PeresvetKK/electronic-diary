import React, {useState} from 'react'
import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from '../../hooks/use-auth';
import SideBar from '../SideBar/SideBar';
import Header from '../Header/Header';

const Loyout = () => {
    // получает информацию - авторизован или нет
    const { isAuth, email } = useAuth();

    const userUchenick = { 
        name: 'Колтырин Пересвет',
        role: 'Ученик',
        imageLink: '',
	}
    const userTeacher = { 
        name: 'Колтырин Пересвет',
        role: 'Учитель',
        imageLink: '',
	}

    return isAuth
    ? (
        <>
            <SideBar role={userTeacher.role} />
            <div className="content">
                <Header userData={userTeacher} />
                <div className='main'>
                    <Outlet />
                </div>
            </div>
        </>
    )
    : (
        <>
            <Navigate to ='/login'/>
            <div className='main'>
                <Outlet />
            </div>
        </>
    )
}

export default Loyout