import React, { createContext, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';
import SideBar from '../SideBar/SideBar';
import Header from '../Header/Header';

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
    const userUchenick = {
        name: 'Колтырин Пересвет',
        role: 'Ученик',
        imageLink: '',
        schedule: [
            {
                date: '10.03.2023',
                title: 'Сегодня',
                id: 'tab1',
                lessons: [
                    {
                        urokCount: '1',
                        urokStart: '8:30',
                        urokStop: "9:10",
                        lesson: "Русский язык",
                        lessonType: "",
                        lessonClass: "",
                        ocenka: "5",
                        peremenaLength: "10",
                        dz: 'стр. 25, упр. 48 - 52',
                        date: '10.03.2023'
                    },
                    {
                        urokCount: "2",
                        urokStart: "9:20",
                        urokStop: "10:00",
                        lesson: "Русский язык",
                        lessonType: "Контрольная",
                        lessonClass: "schudle-block-lesson__control",
                        ocenka: "5",
                        peremenaLength: "20",
                        dz: 'стр. 25, упр. 48 - 52',
                        date: '10.03.2023'
                    },
                    {
                        urokCount: '3',
                        urokStart: '10:20',
                        urokStop: "11:00",
                        lesson: "Русский язык",
                        lessonType: "",
                        lessonClass: "",
                        ocenka: "5",
                        peremenaLength: "20",
                        dz: 'стр. 25, упр. 48 - 52',
                        date: '10.03.2023'
                    },
                    {
                        urokCount: '4',
                        urokStart: '11:20',
                        urokStop: "12:00",
                        lesson: "Русский язык",
                        lessonType: "",
                        lessonClass: "",
                        ocenka: "5",
                        peremenaLength: "20",
                        dz: '',
                        date: ''
                    },
                    {
                        urokCount: '5',
                        urokStart: '12:20',
                        urokStop: "13:00",
                        lesson: "Русский язык",
                        lessonType: "",
                        lessonClass: "",
                        ocenka: "5",
                        peremenaLength: "20",
                        dz: '',
                        date: ''
                    },
                    {
                        urokCount: '6',
                        urokStart: '13:20',
                        urokStop: "14:00",
                        lesson: "Русский язык",
                        lessonType: "",
                        lessonClass: "",
                        ocenka: "5",
                        peremenaLength: "20",
                        dz: '',
                        date: ''
                    },
                    {
                        urokCount: '7',
                        urokStart: '14:20',
                        urokStop: "15:00",
                        lesson: "Русский язык",
                        lessonType: "",
                        lessonClass: "",
                        ocenka: "5",
                        peremenaLength: "",
                        dz: '',
                        date: ''
                    },
                ]
            },
            {
                date: '11.03.2023',
                title: 'Завтра',
                id: 'tab2',
                lessons: [
                    {
                        urokCount: '1',
                        urokStart: '8:30',
                        urokStop: "9:10",
                        lesson: "Математика",
                        lessonType: "",
                        lessonClass: "",
                        ocenka: "",
                        peremenaLength: "10",
                        dz: '',
                        date: ''
                    },
                    {
                        urokCount: "2",
                        urokStart: "9:20",
                        urokStop: "10:00",
                        lesson: "Математика",
                        lessonType: "",
                        lessonClass: "",
                        ocenka: "",
                        peremenaLength: "20",
                        dz: '',
                        date: ''
                    },
                    {
                        urokCount: '3',
                        urokStart: '10:20',
                        urokStop: "11:00",
                        lesson: "Математика",
                        lessonType: "",
                        lessonClass: "",
                        ocenka: "5",
                        peremenaLength: "20",
                        dz: '',
                        date: ''
                    },
                    {
                        urokCount: '4',
                        urokStart: '11:20',
                        urokStop: "12:00",
                        lesson: "Математика",
                        lessonType: "",
                        lessonClass: "",
                        ocenka: "5",
                        peremenaLength: "20",
                        dz: '',
                        date: ''
                    },
                    {
                        urokCount: '5',
                        urokStart: '12:20',
                        urokStop: "13:00",
                        lesson: "Математика",
                        lessonType: "",
                        lessonClass: "",
                        ocenka: "5",
                        peremenaLength: "20",
                        dz: '',
                        date: ''
                    },
                    {
                        urokCount: '6',
                        urokStart: '13:20',
                        urokStop: "14:00",
                        lesson: "Математика",
                        lessonType: "",
                        lessonClass: "",
                        ocenka: "5",
                        peremenaLength: "20",
                        dz: '',
                        date: ''
                    },
                    {
                        urokCount: '7',
                        urokStart: '14:20',
                        urokStop: "15:00",
                        lesson: "математика",
                        lessonType: "",
                        lessonClass: "",
                        ocenka: "5",
                        peremenaLength: "",
                        dz: '',
                        date: ''
                    },
                ]
            },
        ],
        dopZanyatiya: [
            { date: "5 марта", predmet: 'Русский язык' },
            { date: "5 марта", predmet: 'Русский язык' },
            { date: "5 марта", predmet: 'Русский язык' },
            { date: "5 марта", predmet: 'Русский язык' },
        ],
        gradeData: [12, 19, 3, 5],
    }
    const userTeacher = {
        name: 'Колтырин Пересвет',
        role: 'Учитель',
        imageLink: '',
        schedule: [
            {
                date: '10.03.2023',
                title: 'Сегодня',
                id: 'tab1',
                lessons: [
                    {
                        urokCount: '1',
                        urokStart: '8:30',
                        urokStop: "9:10",
                        lesson: "Математика",
                        lessonType: "",
                        lessonClass: "",
                        cabinet: '210',
                        classLesson: '5 "А"',
                        peremenaLength: "10",
                        dz: 'стр. 25, упр. 48 - 52',
                        date: '10.03.2023'
                    },
                    {
                        urokCount: "2",
                        urokStart: "9:20",
                        urokStop: "10:00",
                        lesson: "Геометрия",
                        lessonType: "Контрольная",
                        lessonClass: "schudle-block-lesson__control",
                        cabinet: '400',
                        classLesson: '11 "Н"',
                        peremenaLength: "20",
                        dz: 'стр. 25, упр. 48 - 52',
                        date: '10.03.2023'
                    },
                    {
                        urokCount: '3',
                        urokStart: '10:20',
                        urokStop: "11:00",
                        lesson: "Информатика",
                        lessonType: "",
                        lessonClass: "",
                        cabinet: '400',
                        classLesson: '10 "Н"',
                        peremenaLength: "20",
                        dz: 'подготовка к кр',
                        date: '10.03.2023'
                    },
                    {
                        urokCount: '4',
                        urokStart: '11:20',
                        urokStop: "12:00",
                        lesson: "Математика",
                        lessonType: "",
                        lessonClass: "",
                        cabinet: '314',
                        classLesson: '8 "Б"',
                        peremenaLength: "20",
                        dz: 'не задано',
                        date: '10.03.2023'
                    },
                    {
                        urokCount: '5',
                        urokStart: '12:20',
                        urokStop: "13:00",
                        lesson: "Математика",
                        lessonType: "контрольная",
                        lessonClass: "schudle-block-lesson__control",
                        cabinet: '113',
                        classLesson: '8 "Н"',
                        peremenaLength: "20",
                        dz: 'не задано',
                        date: '10.03.2023'
                    },
                    {
                        urokCount: '6',
                        urokStart: '13:20',
                        urokStop: "14:00",
                        lesson: "",
                        lessonType: "",
                        lessonClass: "",
                        cabinet: '',
                        classLesson: '',
                        peremenaLength: "20",
                        dz: '',
                        date: ''
                    },
                    {
                        urokCount: '7',
                        urokStart: '14:20',
                        urokStop: "15:00",
                        lesson: "",
                        lessonType: "",
                        lessonClass: "",
                        cabinet: '',
                        classLesson: '',
                        peremenaLength: "",
                        dz: '',
                        date: ''
                    },
                ]
            },
            {
                date: '11.03.2023',
                title: 'Завтра',
                id: 'tab2',
                lessons: [
                    {
                        urokCount: '1',
                        urokStart: '8:30',
                        urokStop: "9:10",
                        lesson: "Математика",
                        lessonType: "",
                        lessonClass: "",
                        ocenka: "",
                        peremenaLength: "10",
                        dz: '',
                        date: ''
                    },
                    {
                        urokCount: "2",
                        urokStart: "9:20",
                        urokStop: "10:00",
                        lesson: "Математика",
                        lessonType: "",
                        lessonClass: "",
                        ocenka: "",
                        peremenaLength: "20",
                        dz: '',
                        date: ''
                    },
                    {
                        urokCount: '3',
                        urokStart: '10:20',
                        urokStop: "11:00",
                        lesson: "Математика",
                        lessonType: "",
                        lessonClass: "",
                        ocenka: "5",
                        peremenaLength: "20",
                        dz: '',
                        date: ''
                    },
                    {
                        urokCount: '4',
                        urokStart: '11:20',
                        urokStop: "12:00",
                        lesson: "Математика",
                        lessonType: "",
                        lessonClass: "",
                        ocenka: "5",
                        peremenaLength: "20",
                        dz: '',
                        date: ''
                    },
                    {
                        urokCount: '5',
                        urokStart: '12:20',
                        urokStop: "13:00",
                        lesson: "Математика",
                        lessonType: "",
                        lessonClass: "",
                        ocenka: "5",
                        peremenaLength: "20",
                        dz: '',
                        date: ''
                    },
                    {
                        urokCount: '6',
                        urokStart: '13:20',
                        urokStop: "14:00",
                        lesson: "Математика",
                        lessonType: "",
                        lessonClass: "",
                        ocenka: "5",
                        peremenaLength: "20",
                        dz: '',
                        date: ''
                    },
                    {
                        urokCount: '7',
                        urokStart: '14:20',
                        urokStop: "15:00",
                        lesson: "математика",
                        lessonType: "",
                        lessonClass: "",
                        ocenka: "5",
                        peremenaLength: "",
                        dz: '',
                        date: ''
                    },
                ]
            },
        ],
        dopZanyatiya: [
            { date: "5 марта", predmet: 'Русский язык' },
            { date: "5 марта", predmet: 'Русский язык' },
            { date: "5 марта", predmet: 'Русский язык' },
            { date: "5 марта", predmet: 'Русский язык' },
        ]
    }
    return isAuth
        ? (
            <UserContext.Provider value={userTeacher}>
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
        )
        : (
            <Navigate to='/login' />
        )
}

export default Loyout