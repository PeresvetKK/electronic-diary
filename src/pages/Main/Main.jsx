import React, { useState } from 'react';
import classes from './Main.scss';

import HoumWork from '../../components/widgets/HoumWork/HoumWork';
import Messanger from '../../components/widgets/Messanger/Messanger';
import Schedule from '../../components/widgets/Schedule/Schedule';
import Grade from '../../components/widgets/Grade/Grade';
import DopZanyatiya from '../../components/widgets/DopZanyatiya/DopZanyatiya';
import News from '../../components/widgets/News/News';


const Main = () => {
    // уроки и их составляющие
    const schudleData = [
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

    ]
    // дополнительные занятия
    const dopZanDatas = [
        { date: "5 марта", predmet: 'Русский язык' },
        { date: "5 марта", predmet: 'Русский язык' },
        { date: "5 марта", predmet: 'Русский язык' },
        { date: "5 марта", predmet: 'Русский язык' },
    ]
    // общие оценки
    const grageDatas = [12, 19, 3, 5]
    // новости
    const newsDatas = [
        { date: "5 марта", title: 'Русский язык', text: "Школьники посетили выставку 2024" },
        { date: "5 марта", title: 'Русский язык', text: "Школьники посетили выставку 2024" },
        { date: "5 марта", title: 'Русский язык', text: "Школьники посетили выставку 2024" },
        { date: "5 марта", title: 'Русский язык', text: "Школьники посетили выставку 2024" },
        { date: "5 марта", title: 'Русский язык', text: "Школьники посетили выставку 2024" },
        { date: "5 марта", title: 'Русский язык', text: "Школьники посетили выставку 2024" },
    ]
    
    return (
        <main className='main'>
            <div className="row">
                <Schedule objectsData={schudleData} title="Расписание на"></Schedule>
                <HoumWork houmworkData={schudleData} title="Домашнее задание"></HoumWork>
                <DopZanyatiya dopZanData={dopZanDatas} title="Дополнительные задания"></DopZanyatiya>
                <Grade gradeData={grageDatas}></Grade>
                <Messanger title="Диалоги"></Messanger>
                <News newsData={newsDatas} title="Новости"></News>
            </div>
        </main>
    )
}

export default Main

// import React, { useState } from "react";
// import axios from "axios"; // импортируем библиотеку axios для выполнения AJAX-запросов

// function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault(); // отменяем стандартное поведение формы
//     axios.post("/api/login", { username, password })
//       .then(response => {
//         // обрабатываем успешный ответ от сервера
//       })
//       .catch(error => {
//         // обрабатываем ошибку от сервера
//       });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Username:
//         <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//       </label>
//       <label>
//         Password:
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       </label>
//       <button type="submit">Submit</button>
//     </form>
//   );
// }
