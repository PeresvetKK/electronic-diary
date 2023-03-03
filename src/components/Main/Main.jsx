import React from 'react';
import Button from '../UI/button/Button';
import classes from './Main.scss';
import HoumWorkWidget from '../UI/HoumWorkWidget/HoumWorkWidget';
import MessangerWidget from '../UI/MessangerWidget/MessangerWidget';
import Schedule from './Schedule/Schedule';

const Main = () => {
    return (
        <main className='main'>
            <div className="row">
                <Schedule class="row__item" title="Расписание"></Schedule>
                <MessangerWidget class="row__item" title="Диалоги"></MessangerWidget>
                <HoumWorkWidget class="row__item" title="Домашнее задание"></HoumWorkWidget>
            </div>
        </main>
    )
}

export default Main