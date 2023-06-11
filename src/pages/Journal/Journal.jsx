import React from 'react';
import Table from '../../components/Table/Table';
import s from './Journal.module.scss';
import { LeftArrowSVG, RightArrowSVG } from '../../resources/svg';

const Journal = () => {
    return (
        <section className="section">
            <div className={s["journal-header"]}>
                <h1>Дневник 22.05.2023 - 29.05.2023</h1>
                <div className='arrows-box'>
                    <LeftArrowSVG/>
                    <RightArrowSVG/>
                </div>
            </div>
            <div className={s['table-section']}>
                <Table />
                <Table />
            </div>
        </section>
    )
}

export default Journal