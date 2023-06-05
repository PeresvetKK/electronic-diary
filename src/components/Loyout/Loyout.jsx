import React from 'react'
import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from '../../hooks/use-auth';
import SideBar from '../SideBar/SideBar';
import Header from '../Header/Header';

const Loyout = () => {
    // получает информацию - авторизован или нет
    const { isAuth, email } = useAuth();

    return isAuth
    ? (
        <>
            <SideBar />
            <div className="content">
                <Header />
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