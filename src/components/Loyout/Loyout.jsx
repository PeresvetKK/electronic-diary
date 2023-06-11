import React, {createContext, useState, useEffect} from 'react'
import axios from 'axios';
import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from '../../hooks/use-auth';
import SideBar from '../SideBar/SideBar';
import Header from '../Header/Header';
import Loader from '../Loader/Loader';
import { UserService } from '../../services/userService';

export const UserContext = createContext({})
export const NewsContext = createContext([])

const Loyout = () => {
    // получает информацию - авторизован или нет
    const { isAuth, email } = useAuth();
    // новости
    const newsDatas = [
        { date: "5 марта", title: 'Русский язык', text: "Школьники посетили выставку 2024" },
        { date: "5 марта", title: 'Русский язык', text: "Школьники посетили выставку 2024" },
        { date: "5 марта", title: 'Русский язык', text: "Школьники посетили выставку 2024" },
        { date: "5 марта", title: 'Русский язык', text: "Школьники посетили выставку 2024" },
        { date: "5 марта", title: 'Русский язык', text: "Школьники посетили выставку 2024" },
        { date: "5 марта", title: 'Русский язык', text: "Школьники посетили выставку 2024" },
    ]
    // храним данные о пользователе
    const [userData, setUserData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            // получаем с сервера пользователя и помещаем в стейт
            const data= await UserService.getAll()
            setUserData(data)
        }
        
        fetchData()
    }, [])
    return isAuth
        ? ( 
            userData.length ? (
                <UserContext.Provider value={userData[1]}>
                    <SideBar />
                    <div className="content">
                        <Header isAuth={isAuth} />
                        <div className='main'>
                            <NewsContext.Provider value={newsDatas}>
                                <Outlet />
                            </NewsContext.Provider>
                        </div>
                    </div>
                </UserContext.Provider>
            ) : (
                <Loader/>
            )
            
        )
        : (
            <Navigate to='/login' />
        )
}

export default Loyout