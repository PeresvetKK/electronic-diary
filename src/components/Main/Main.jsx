import React from 'react';
import classes from './Main.scss';

import HoumWorkWidget from '../UI/HoumWorkWidget/HoumWorkWidget';
import MessangerWidget from '../UI/MessangerWidget/MessangerWidget';
import Schedule from './Schedule/Schedule';
import Grade from '../Grade/Grade';
import DopZanyatiyaWidget from '../DopZanyatiyaWidget/DopZanyatiyaWidget';
import NewsWidget from '../NewsWidget/NewsWidget';


const Main = () => {
    const schudleData = [
        {
            urokCount: '1',
            urokStart: '8:30',
            urokStop: "9:10",
            lesson: "Русский язык",
            lessonType: "",
            lessonClass: "",
            ocenka: "5",
            peremenaLength: "10"
        },
        {
            urokCount: "2", 
            urokStart: "9:20",
            urokStop: "10:00",
            lesson: "Русский язык",
            lessonType: "Контрольная", 
            lessonClass: "schudle-block-lesson__control",
            ocenka: "5",
            peremenaLength: "20"
        },
        {
            urokCount: '3',
            urokStart: '10:20',
            urokStop: "11:00",
            lesson: "Русский язык",
            lessonType: "",
            lessonClass: "",
            ocenka: "5",
            peremenaLength: "20"
        },
        {
            urokCount: '4',
            urokStart: '11:20',
            urokStop: "12:00",
            lesson: "Русский язык",
            lessonType: "",
            lessonClass: "",
            ocenka: "5",
            peremenaLength: "20"
        },
        {
            urokCount: '5',
            urokStart: '12:20',
            urokStop: "13:00",
            lesson: "Русский язык",
            lessonType: "",
            lessonClass: "",
            ocenka: "5",
            peremenaLength:"20"
        },
        {
            urokCount: '6',
            urokStart: '13:20',
            urokStop: "14:00",
            lesson: "Русский язык",
            lessonType: "",
            lessonClass: "",
            ocenka: "5",
            peremenaLength:"20"
        },
        {
            urokCount: '7',
            urokStart: '14:20',
            urokStop: "15:00",
            lesson: "Русский язык",
            lessonType: "",
            lessonClass: "",
            ocenka: "5",
            peremenaLength:""
        },
    ]
    const houmWorkDatas = [
        {date: "5 марта", predmet: 'Русский язык', dz:'стр. 25, упр. 48 - 52'},
        {date: "5 марта", predmet: 'Русский язык', dz:'стр. 25, упр. 48 - 52'},
        {date: "5 марта", predmet: 'Русский язык', dz:'стр. 25, упр. 48 - 52'},
        {date: "5 марта", predmet: 'Русский язык', dz:'стр. 25, упр. 48 - 52'},
    ]
    const dopZanDatas = [
        {date: "5 марта", predmet: 'Русский язык'},
        {date: "5 марта", predmet: 'Русский язык'},
        {date: "5 марта", predmet: 'Русский язык'},
        {date: "5 марта", predmet: 'Русский язык'},
    ]
    const grageDatas = [12, 19, 3, 5]
    const newsDatas = [
        {date: "5 марта", title: 'Русский язык', text: "Школьники посетили выставку 2024"},
        {date: "5 марта", title: 'Русский язык', text: "Школьники посетили выставку 2024"},
        {date: "5 марта", title: 'Русский язык', text: "Школьники посетили выставку 2024"},
        {date: "5 марта", title: 'Русский язык', text: "Школьники посетили выставку 2024"},
        {date: "5 марта", title: 'Русский язык', text: "Школьники посетили выставку 2024"},
        {date: "5 марта", title: 'Русский язык', text: "Школьники посетили выставку 2024"},
    ]
    return (
        <main className='main'>
            <div className="row">
                <Schedule objectsData={schudleData} title="Расписание на"></Schedule>
                <HoumWorkWidget houmworkData={houmWorkDatas} title="Домашнее задание"></HoumWorkWidget>
                <DopZanyatiyaWidget dopZanData={dopZanDatas} title="Дополнительные задания"></DopZanyatiyaWidget>
                <Grade gradeData={grageDatas}></Grade>
                <MessangerWidget title="Диалоги"></MessangerWidget>
                <NewsWidget newsData={newsDatas} title="Новости"></NewsWidget>
            </div>
        </main>
    )
}

export default Main