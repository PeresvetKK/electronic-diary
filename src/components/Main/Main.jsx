import React from 'react';
import Button from '../UI/button/Button';
import HoumWork from './HoumWork/HoumWork';
import classes from './Main.scss';
import Messanger from './Messanger/Messanger';
import Schedule from './Schedule/Schedule';

const Main = () => {
    return (
        <main className='main'>
            <div className="row">
                <Schedule class="row__item" title="Расписание"></Schedule>
                <Messanger class="row__item" title="Диалоги"></Messanger>
                <HoumWork class="row__item" title="Домашнее задание"></HoumWork>
            </div>
        </main>
    )
}

export default Main